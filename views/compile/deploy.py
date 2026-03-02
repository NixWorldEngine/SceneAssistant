import sys
import os
import json
import glob
import uuid
import time
import re

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from curl_cffi import requests

RETRY_DELAY = 2
MAX_RETRIES = 10
IMPERSONATE = "chrome131"

BASE_HEADERS = {
    "accept": "*/*",
    "lang": "ZH",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "referer": "https://sexyai.top/",
    "origin": "https://sexyai.top",
}


def _parse_yaml(path):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    result = {}
    stack = [(result, -1)]
    entries = []
    lines = text.split("\n")
    for line in lines:
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        indent = len(line) - len(line.lstrip())
        m = re.match(r'^([\w][\w_-]*)\s*:\s*(.*)$', stripped)
        if not m:
            continue
        val = m.group(2).strip()
        if val.startswith('"') and val.endswith('"'):
            val = val[1:-1]
        elif val.startswith("'") and val.endswith("'"):
            val = val[1:-1]
        entries.append((indent, m.group(1), val))

    for idx, (indent, key, val) in enumerate(entries):
        while len(stack) > 1 and stack[-1][1] >= indent:
            stack.pop()
        parent = stack[-1][0]
        if val:
            parent[key] = val
        else:
            has_children = idx + 1 < len(entries) and entries[idx + 1][0] > indent
            if has_children:
                child = {}
                parent[key] = child
                stack.append((child, indent))
            else:
                parent[key] = ""
    return result


def _load_config():
    cfg_path = os.path.join(ROOT, "views", "compile", "config.yaml")
    if not os.path.isfile(cfg_path):
        cfg_path = os.path.join(ROOT, "views", "compile", "config.example.yaml")
    if not os.path.isfile(cfg_path):
        raise RuntimeError("no config.yaml or config.example.yaml found")
    return _parse_yaml(cfg_path)


def _build_headers(cfg):
    h = dict(BASE_HEADERS)
    if cfg.get("authorization"):
        h["authorization"] = cfg["authorization"]
    if cfg.get("rptoken"):
        h["cookie"] = "rptoken=" + cfg["rptoken"]
    return h


def _idem():
    return uuid.uuid4().hex


def _retry_post(sess, url, **kwargs):
    attempt = 0
    while True:
        try:
            return sess.post(url, **kwargs)
        except Exception as e:
            attempt += 1
            if attempt > MAX_RETRIES:
                raise RuntimeError(f"max retries ({MAX_RETRIES}) exceeded: {e}")
            print(f"  Retry #{attempt}: {e}", file=sys.stderr)
            time.sleep(RETRY_DELAY)


def api_upload(sess, headers, file_path, folder_id, base_url):
    from curl_cffi import CurlMime

    h = dict(headers)
    h["idempotency-key"] = _idem()
    if "content-type" in h:
        del h["content-type"]

    filename = os.path.basename(file_path)
    mp = CurlMime()
    mp.addpart(name="file", filename=filename, content_type="image/png", local_path=file_path)
    mp.addpart(name="folderId", data=str(folder_id))
    mp.addpart(name="suffix", data="png")

    r = _retry_post(sess, f"{base_url}/user/storage/upload", headers=h, multipart=mp)
    return r.json()


def api_regexp_save(sess, headers, role_id, regex_id, content, base_url, name="\u89c6\u56fe"):
    h = dict(headers)
    h["idempotency-key"] = _idem()
    h["content-type"] = "application/json"

    trigger = "\u3010\u8336\u58f6\u8bf4\uff1a\u201c\u8981\u6709\u5149\uff01\u201d\u3011"

    body = json.dumps([{
        "id": int(regex_id),
        "roleId": int(role_id),
        "version": 0,
        "name": name,
        "regex": trigger,
        "content": content.strip()
    }], ensure_ascii=False)

    r = _retry_post(sess, f"{base_url}/role/regexp/save", headers=h, data=body.encode("utf-8"))
    return r.json()


def _download_injector(source_url):
    dl_url = source_url.rstrip("/") + "/download/injector.html"
    print(f"  Download: {dl_url}")
    r = requests.get(dl_url, impersonate=IMPERSONATE, allow_redirects=True)
    if r.status_code != 200:
        raise RuntimeError(f"failed to download injector: HTTP {r.status_code}")
    return r.text


def main():
    cfg = _load_config()
    headers = _build_headers(cfg)

    cdn = cfg.get("cdn", {})
    base_url = cdn.get("upload_url", "https://sexyai.top/api") if isinstance(cdn, dict) else "https://sexyai.top/api"
    cdn_url = cdn.get("url", "") if isinstance(cdn, dict) else ""

    folder_id = cfg.get("folderId", "")
    role_id = cfg.get("roleId", "")
    regex_id = cfg.get("regexId", "0")
    version = cfg.get("version", "1.0.0")

    injector_cfg = cfg.get("injector", {})
    injector_source = injector_cfg.get("source", "") if isinstance(injector_cfg, dict) else ""

    view_name = None
    png_path = None

    args = sys.argv[1:]
    i = 0
    while i < len(args):
        if args[i] == "--view" and i + 1 < len(args):
            view_name = args[i + 1]
            i += 2
        elif args[i] == "--png" and i + 1 < len(args):
            png_path = args[i + 1]
            if not os.path.isabs(png_path):
                png_path = os.path.join(ROOT, png_path)
            i += 2
        else:
            i += 1

    sess = requests.Session(impersonate=IMPERSONATE)
    dist_dir = os.path.join(ROOT, "views", "dist")

    if png_path:
        if not os.path.isfile(png_path):
            print(f"PNG not found: {png_path}")
            sys.exit(1)
        targets = [png_path]
    elif view_name:
        pattern = os.path.join(dist_dir, f"view-{view_name}-v*.png")
        targets = sorted(glob.glob(pattern))
        if not targets:
            print(f"No PNG found for view: {view_name}")
            sys.exit(1)
    else:
        pattern = os.path.join(dist_dir, "view-*-v*.png")
        targets = sorted(glob.glob(pattern))
        if not targets:
            print("No view PNGs found in dist/")
            sys.exit(1)

    result = {"uploaded": [], "saved": False}

    print("--- Upload View PNGs ---")
    uploaded_urls = []
    for fp in targets:
        up_resp = api_upload(sess, headers, fp, folder_id, base_url)
        if up_resp.get("code") == 200:
            url = up_resp.get("data", "")
            print(f"  Uploaded: {os.path.basename(fp)} -> {url}")
            result["uploaded"].append({"name": os.path.basename(fp), "url": url})
            uploaded_urls.append(url)
        else:
            print(f"  Upload failed: {up_resp.get('message', '')}")
            sys.exit(1)

    if injector_source and role_id and regex_id and regex_id != "0":
        print("\n--- Download Injector ---")
        injector_html = _download_injector(injector_source)

        if uploaded_urls:
            view_url = uploaded_urls[0]
            injector_html = re.sub(
                r'data-view="[^"]*"',
                f'data-view="{view_url}"',
                injector_html
            )
            if 'data-view="' not in injector_html:
                injector_html = injector_html.replace(
                    'class="iEdt"',
                    f'class="iEdt" data-view="{view_url}"',
                    1
                )

        m = re.match(r"view-(\w+)-v(.+)\.png", os.path.basename(targets[0]))
        regex_name = f"\u89c6\u56fe-v{m.group(2)}" if m else f"\u89c6\u56fe-v{version}"

        print("\n--- Save Injector ---")
        save_resp = api_regexp_save(sess, headers, role_id, regex_id, injector_html, base_url, name=regex_name)
        if save_resp.get("code") == 200:
            result["saved"] = True
            print(f"  Saved injector as '{regex_name}' (id={regex_id})")
        else:
            result["saved"] = False
            print(f"  Save failed: {save_resp.get('message', '')}")

    print("\n---JSON---")
    print(json.dumps(result))


if __name__ == "__main__":
    main()
