# OCS.message

消息操作接口

## send

```ts
OCS.message.send(text: string, model?: object, convId?: number): Promise<object>
```

发送消息 支持流式返回

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | Y | 用户消息内容 |
| model | object | N | 模型配置 包含 id/maxToken/stream 等 |
| convId | number | N | 对话ID 不传则使用当前对话 |

**model 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 模型ID |
| maxToken | number | 最大令牌数 |
| stream | boolean | 是否流式返回 |

**返回值** 流式模式下返回 SSE 事件序列 非流式返回完整消息对象

## edit

```ts
OCS.message.edit(id: number, text: string, regenerate?: boolean): Promise<void>
```

编辑已有消息

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 消息ID |
| text | string | Y | 新内容 |
| regenerate | boolean | N | 是否触发重新生成 默认 false |

## delete

```ts
OCS.message.delete(id: number): Promise<void>
```

删除消息

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 消息ID |

## regenerate

```ts
OCS.message.regenerate(id: number, stream?: boolean): Promise<void>
```

重新生成 AI 回复

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 消息ID |
| stream | boolean | N | 是否流式 默认 true |

## history

```ts
OCS.message.history(page?: number): Promise<{ list: Message[], total: number }>
```

获取对话历史消息

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | N | 页码 默认 1 |

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| list | Message[] | 消息列表 |
| total | number | 消息总数 |

**Message 对象**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 消息ID |
| content | string | 消息内容 |
| role | string | 角色 "user" / "assistant" |
| createTime | string | 创建时间 |
