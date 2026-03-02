---
paths:
  - views/compile/**
---

# 编译与部署工具

## 目录职责

`views/compile/` 包含视图编译和部署的全套工具

| 文件 | 职责 |
|------|------|
| build.js | 发现 views/pages/ 下的 Vue 项目 执行 vite build 打包为单文件 HTML 编码为 ACv5 PNG |
| deploy.py | 上传 PNG 到 CDN 下载 injector 修改 data-view 属性 上传到 regex |
| png-encode.js | ACv5 隐写编码 将 HTML 嵌入 PNG 像素 RGB 值 |
| yaml-parser.js | 轻量 YAML 解析器 无外部依赖 |
| config.yaml | 用户凭证和部署配置 不入库 |
| config.example.yaml | 配置模板 |

## 工作规范

- config.yaml 包含敏感凭证 已在 .gitignore 中排除 不要提交
- build.js 输出到 views/dist/ 文件名格式 `view-{name}-v{version}.png`
- deploy.py 依赖 curl_cffi 库 用户需自行安装
- 修改编译工具后 用 `/compile-view` 命令验证完整流程

## 禁止操作

- 不要修改 png-encode.js 的编码格式 它与主项目 OCS 解码器配对
- 不要在 config.yaml 中硬编码真实凭证
