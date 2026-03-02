const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3939;
let specs = [];
try {
  specs = JSON.parse(fs.readFileSync(path.join(__dirname, "api-specs.json"), "utf8"));
} catch (e) {
  console.error("Failed to load api-specs.json: " + e.message);
  process.exit(1);
}

const routeMap = new Map();
const sseRoutes = new Set();

for (const spec of specs) {
  if (!spec.path) continue;
  routeMap.set(spec.path, spec.response);
  if (spec.method === "SSE" || spec.sseEvents) sseRoutes.add(spec.path);
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Token"
  };
}

function sendJSON(res, data) {
  const body = JSON.stringify(data);
  res.writeHead(200, {
    ...corsHeaders(),
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function sendSSE(res, events) {
  res.writeHead(200, {
    ...corsHeaders(),
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  if (!Array.isArray(events) || !events.length) {
    events = [
      { event: "message", data: { content: "Mock", id: 1 } },
      { event: "message", data: { content: " response", id: 1 } },
      { event: "done", data: { content: "", id: 1 } }
    ];
  }

  let i = 0;
  const timer = setInterval(() => {
    if (i >= events.length) {
      clearInterval(timer);
      res.end();
      return;
    }
    const evt = events[i];
    const dataStr = typeof evt.data === "string" ? evt.data : JSON.stringify(evt.data);
    res.write("event: " + (evt.event || "message") + "\n");
    res.write("data: " + dataStr + "\n\n");
    i++;
  }, 80);

  res.on("close", () => clearInterval(timer));
}

function matchRoute(url) {
  const pathname = url.split("?")[0];
  if (routeMap.has(pathname)) return pathname;
  for (const [rPath] of routeMap) {
    if (pathname.endsWith(rPath) || rPath.endsWith(pathname)) return rPath;
  }
  return null;
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders());
    res.end();
    return;
  }

  const matched = matchRoute(req.url);

  if (!matched) {
    res.writeHead(404, { ...corsHeaders(), "Content-Type": "application/json" });
    res.end(JSON.stringify({ code: 404, message: "not found", data: null }));
    return;
  }

  const body = [];
  req.on("data", (chunk) => body.push(chunk));
  req.on("end", () => {
    const response = routeMap.get(matched);

    if (sseRoutes.has(matched)) {
      sendSSE(res, response);
      return;
    }

    sendJSON(res, response);
  });
});

server.listen(PORT, () => {
  console.log("Mock server running on http://localhost:" + PORT);
  console.log("Routes: " + routeMap.size + " (" + sseRoutes.size + " SSE)");
});
