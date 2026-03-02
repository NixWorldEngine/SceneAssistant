---
name: compile-view
description: 编译视图为 PNG 并可选部署
allowed-tools:
  - Bash(node views/compile/build.js*)
  - Bash(python views/compile/deploy.py*)
  - Bash(ls)
  - Read
  - AskUserQuestion
---

# 编译并部署视图

## 第一步 选择视图

使用 Bash 工具执行 `ls views/pages/` 列出所有可用视图
将列表展示给用户 询问要编译哪个视图

## 第二步 编译

使用 Bash 工具执行编译命令

```
node views/compile/build.js --view {用户选择的视图名}
```

如果编译失败 向用户报告错误信息并停止
如果编译成功 报告输出文件路径和文件大小

## 第三步 检查部署配置

使用 Read 工具读取 `views/compile/config.yaml`
如果文件不存在 告知用户需要从 `views/compile/config.example.yaml` 复制并填写配置 然后停止

检查以下字段是否已填写

| 字段 | 用途 | 是否必需 |
|------|------|----------|
| authorization | API认证 | 上传必需 |
| rptoken | RP Token | 上传必需 |
| roleId | 角色ID | 注入器更新必需 |
| regexId | 正则ID | 注入器更新必需 |
| cdn.url | CDN地址 | 上传必需 |
| cdn.upload_url | 上传接口 | 上传必需 |

## 第四步 上传到CDN

如果 authorization 和 rptoken 已填写 执行上传

```
python views/compile/deploy.py --png {编译输出路径}
```

报告上传结果和CDN URL

## 第五步 更新注入器 (可选)

如果 roleId 和 regexId 也已填写
先向用户确认是否要更新注入器中的 data-view 指向

用户确认后 deploy.py 会自动完成以下操作
- 下载当前注入器
- 修改 data-view 为新的CDN URL
- 上传更新后的注入器

## 第六步 完成报告

输出最终状态摘要

```
编译: OK
文件: {路径} ({大小})
CDN: {URL 或 "未上传"}
注入器: {已更新 / 未更新 / 跳过}
```
