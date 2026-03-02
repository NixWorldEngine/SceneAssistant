# OCS View 开发环境

你正在为 OpenChatSDK (OCS) 创建一个在 iframe 中运行的视图页面
该页面将被编译为单个 JS+CSS (IIFE) 再打包为 PNG 图片

## 技术栈

- Vue 3 + TypeScript + Vite
- 编译为 IIFE 格式 不使用 ESM
- 样式全部在 src/style.css 中 不使用 scoped style

## OCS SDK 接口

通过 `window.OCS` 访问 SDK 绝对不要直接 import ocs/ 下的代码

### 会话初始化

```typescript
const ocs = window.OCS
const { models, role, context } = await ocs.session.init()
const info = ocs.session.get() // { roleId, convId, modelId, device }
```

### 发送消息 (流式)

```typescript
const cb = ocs.message.send(text) as StreamCallback
cb.onmsg = (chunk) => { /* 流式内容 */ }
cb.ondone = (content, msgId) => { /* 完成 */ }
cb.onerr = (err) => { /* 错误 */ }
```

### 会话管理

```typescript
await ocs.conversation.list()
await ocs.conversation.open(id?)
await ocs.conversation.rename(id, name)
await ocs.conversation.delete(id)
await ocs.message.history(page?)
await ocs.message.delete(id)
await ocs.message.regenerate(id)
```

### 模型选择

```typescript
const models = await ocs.model.list()
ocs.model.select(id, token, stream)
```

### 角色信息

```typescript
const role = await ocs.role.query() // { id, name, avatar, beginning, ... }
```

### 持久化存储

```typescript
// localStorage (支持 scope: "role" | "conv")
await ocs.storage.localStorage.setItem(key, value, scope?)
await ocs.storage.localStorage.getItem(key, scope?)

// IndexedDB
await ocs.storage.idb.put(db, key, value)
await ocs.storage.idb.get(db, key)
await ocs.storage.idb.getAll(db, store?, count?, scope?)

// OPFS 文件系统
await ocs.storage.opfs.write(path, data, encoding)
await ocs.storage.opfs.read(path, encoding)
await ocs.storage.opfs.list(path?)

// sessionStorage
await ocs.storage.sessionStorage.setItem(key, value)
await ocs.storage.sessionStorage.getItem(key)
```

### 其他接口

```typescript
ocs.prompt.next.add(key, value)    // 注入下一条消息的提示词
ocs.clipboard.write(text)          // 写入剪贴板
ocs.setting.open()                 // 打开设置面板
ocs.flush()                        // 刷新数据到存储
ocs.close()                        // 关闭页面

// Web Worker
const w = await ocs.worker.create(code)
w.postMessage(data)
w.onmessage = (d) => { ... }
w.terminate()

// 图片托管
await ocs.hosting.upload(file)
await ocs.hosting.list()

// 元信息
ocs._meta // { version, hash, time, cdnPrefix }
```

## 类型定义

在 `src/bridge.ts` 中定义 OCS SDK 的类型接口 参考以下结构:

```typescript
interface OCSBridge {
  session: { init(prompt?): Promise<...>; get(): SessionInfo }
  conversation: { list(); open(id?); rename(id, name); delete(id); fork(msgId) }
  message: { send(text, model?, convId?); edit(id, text, regen?); delete(id); regenerate(id); history(page?) }
  model: { list(); select(id, token, stream) }
  role: { query() }
  prompt: { next: { add(k,v); get(); remove(k) } }
  storage: { localStorage; sessionStorage; idb; opfs }
  worker: { create(code) }
  clipboard: { write(text) }
  setting: { open() }
  flush(); close()
  _meta?: { version; cdnPrefix; hash; time }
}
```

## 文件结构

```
src/
├── main.ts          入口 挂载 Vue
├── App.vue          根组件
├── bridge.ts        OCS SDK 类型 + getBridge()
├── store.ts         状态管理 (如需)
├── style.css        全局样式
├── types.ts         数据类型
└── components/      UI 组件
```

## 编译

运行 `./build.ps1` 执行 vite build 并打包为 PNG 到 `build/` 目录

## 设计规范

- 适配移动端优先 支持 PC
- 通过 `ocs.session.get().device` 获取设备信息
- 深色模式通过 `device.darkMode` 判断
- 页面嵌入在 iframe 中 注意尺寸约束
- 性能优先 尤其是低端设备和移动端
