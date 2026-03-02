# SceneAssistant

世界引擎项目中的剧本助手 基于 Claude Code 的全自动化角色/世界观创作工具

功能
- 从灵感碎片扩增出完整角色设定
- 从零散设定整理出系统化世界观
- 一体式页面生成 内置 18 种预设风格
- 自动化编译/部署到角色卡平台

---

## 目录结构

| 目录 | 用途 |
|------|------|
| reference/ | 灵感碎片 创意笔记 AI 只读不写 |
| profile/ | 格式化的角色/世界观设定 |
| output/ | 最终定稿 英文版本 token 优化后 |
| views/pages/ | 视图页面项目 (chat 等) |
| views/pages/template/ | 项目模板 只读 创建新项目时拷贝 |
| views/shared/ | 共享 Vite 配置 |
| views/compile/ | 编译和部署工具 |
| views/docs/ | OCS 接口文档 (68 个函数 17 个命名空间) |
| views/mock/ | 无 OCS 源码的模拟 SDK 环境 |

---

## 使用指南

### 前提条件

- 已安装 Node.js 和 Python
- 已在 VSCode 中登录 Claude Code

### 快速开始

1. 下载本项目
2. 在 VSCode 中打开
3. 使用以下命令开始创作

### CC 命令

| 命令 | 用途 |
|------|------|
| /check-profile | 检查 profile 和 reference 中的设定冲突 |
| /create-profile | 从 reference 生成格式化设定到 profile |
| /create-npc | 快速生成边缘角色 |
| /create-person | 详细创建主角团成员 |
| /compile-profile | 翻译设定为英文 优化 token 到 output |
| /compile-view | 编译视图为 PNG 并可选部署 |

### 视图开发

```bash
cd views/pages/chat
npm install
npm run dev
```

启动后自动运行 mock 服务器 提供全部 OCS API 模拟
接口文档见 `views/docs/`

### 创建新视图项目

1. 拷贝 `views/pages/template/ide/` 到 `views/pages/{项目名}/`
2. 修改 package.json 和 vite.config.ts
3. `npm run dev` 开始开发

### 编译和部署

1. 复制 `views/compile/config.example.yaml` 为 `views/compile/config.yaml`
2. 填写你的凭证 (authorization / rptoken)
3. 填写部署目标 (roleId / folderId / regexId)
4. 运行 `/compile-view` 或手动执行:

```bash
node views/compile/build.js --view chat
python views/compile/deploy.py --png views/dist/view-chat-v1.0.0.png
```

### Mock 环境

用于离线开发和调试视图 无需 OCS 源码

```bash
node views/mock/mock-server.js
```

打开 `views/mock/index.html` 即可测试
