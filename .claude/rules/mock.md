---
paths:
  - views/mock/**
---

# Mock SDK 环境

## 目录职责

`views/mock/` 提供无需 OCS 源码的模拟 SDK 环境 用于视图离线开发和调试

| 文件 | 职责 |
|------|------|
| api-specs.json | 151 个 API 接口规格 从主项目文档解析生成 |
| mock-server.js | 零依赖 Node.js HTTP 服务器 端口 3939 根据 api-specs 路由 |
| ocs-bridge.js | 模拟 window.OCS 桥接层 实现视图中使用的所有 OCS 接口 |
| index.html | 测试面板 12 个测试按钮 + 实时日志区 |

## 工作规范

- mock-server.js 不依赖任何 npm 包 直接 `node views/mock/mock-server.js` 启动
- api-specs.json 是数据驱动的核心 新增接口只需添加 JSON 条目
- ocs-bridge.js 使用 ES5 语法 (var + function) 兼容 IIFE 视图环境
- SSE 接口模拟流式输出 80ms 间隔

## 禁止操作

- 不要在 mock 中引入真实的 OCS 源码
- 不要在 ocs-bridge.js 中使用真实的 CDN 域名
- 不要修改 api-specs.json 的结构 保持与 views/docs/ 一一对应
