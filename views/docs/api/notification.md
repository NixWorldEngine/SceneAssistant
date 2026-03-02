# OCS.notification

通知接口

## push

```ts
OCS.notification.push(content: string, duration?: number, action?: Function, style?: object): Promise<{ nid: number }>
```

推送通知到父页面

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | Y | 通知内容 |
| duration | number | N | 显示时长(ms) 默认 3000 |
| action | Function | N | 点击通知的回调函数 |
| style | object | N | 自定义样式对象 |

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| nid | number | 通知ID |
