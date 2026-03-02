# OCS.clipboard

剪贴板接口

## write

```ts
OCS.clipboard.write(text: string): Promise<void>
```

写入文本到剪贴板 由于 iframe 沙箱限制 需通过父页面代理执行

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | Y | 要复制的文本内容 |
