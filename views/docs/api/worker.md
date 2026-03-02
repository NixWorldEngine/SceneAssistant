# OCS.worker

Web Worker 接口 允许 iframe 内创建 Worker 并通过父级代理访问存储

## create

```ts
OCS.worker.create(code: string): Promise<OCSWorker>
```

创建 Worker 实例

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| code | string | Y | Worker 代码字符串 |

**返回值 OCSWorker 对象**

| 属性/方法 | 类型 | 说明 |
|----------|------|------|
| id | number | Worker ID |
| postMessage(data) | Promise | 发送消息给 Worker |
| terminate() | Promise | 终止 Worker |
| onmessage | Function / null | 消息回调 设置后接收 Worker 发来的消息 |
| onerror | Function / null | 错误回调 |

**Worker 内可用的 API**

Worker 创建后自动获得 OCS.storage 代理 可在 Worker 内使用
- `OCS.storage.localStorage.*`
- `OCS.storage.idb.*`
- `OCS.storage.opfs.*`

**示例**

```js
var w = await OCS.worker.create(`
  self.onmessage = function(e) {
    self.postMessage({ result: e.data.value * 2 })
  }
`)
w.onmessage = function(e) { console.log(e.data.result) }
w.postMessage({ value: 21 })
```
