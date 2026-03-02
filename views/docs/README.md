# OCS 接口文档

iframe 视图通过 `window.OCS` 全局对象访问所有框架接口

## 接口索引

### 会话与初始化

| 文档 | 接口 | 说明 |
|------|------|------|
| [session](api/session.md) | OCS.session | 会话初始化与状态获取 |
| [meta](api/meta.md) | OCS._meta / OCS.decode / OCS.flush | 框架元数据 PNG解码 作用域刷新 |

### 对话与消息

| 文档 | 接口 | 说明 |
|------|------|------|
| [conversation](api/conversation.md) | OCS.conversation | 对话的增删改查和分支 |
| [message](api/message.md) | OCS.message | 消息发送 编辑 删除 重新生成 历史 |

### 角色与模型

| 文档 | 接口 | 说明 |
|------|------|------|
| [role](api/role.md) | OCS.role / OCS.role.comment | 角色信息 点赞 收藏 评论系统 |
| [model](api/model.md) | OCS.model | 模型列表与选择 |

### 提示词与上下文

| 文档 | 接口 | 说明 |
|------|------|------|
| [prompt](api/prompt.md) | OCS.prompt.next / OCS.prompt.sys | 临时提示词和系统级提示词 |
| [extra](api/extra.md) | OCS.extra / OCS.author | 额外上下文和作者人设 |

### 知识图谱

| 文档 | 接口 | 说明 |
|------|------|------|
| [kag](api/kag.md) | OCS.kag | 知识增强生成 实体/关系/事件/场景 |

### 存储系统

| 文档 | 接口 | 说明 |
|------|------|------|
| [storage](api/storage.md) | OCS.storage.localStorage / sessionStorage / idb / opfs | 四种存储方式 支持作用域隔离 |
| [cache](api/cache.md) | OCS.cache | 缓存管理与清除 |

### 文件与媒体

| 文档 | 接口 | 说明 |
|------|------|------|
| [hosting](api/hosting.md) | OCS.hosting / OCS.save | 图片上传和存档管理 |

### UI 交互

| 文档 | 接口 | 说明 |
|------|------|------|
| [setting](api/setting.md) | OCS.setting / OCS.page | 设置面板和页面导航 |
| [clipboard](api/clipboard.md) | OCS.clipboard | 剪贴板操作 |
| [notification](api/notification.md) | OCS.notification | 通知推送 |

### 并发

| 文档 | 接口 | 说明 |
|------|------|------|
| [worker](api/worker.md) | OCS.worker | Web Worker 创建与管理 |

## 通信机制

视图运行在 iframe 沙箱中 通过 postMessage 与父页面通信
OCS 对象是对 Bridge 消息协议的封装 所有异步操作返回 Promise
流式接口 (如 message.send) 通过 SSE 事件序列返回
