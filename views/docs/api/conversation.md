# OCS.conversation

对话管理接口

## list

```ts
OCS.conversation.list(): Promise<Conversation[]>
```

获取当前角色的所有对话列表

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 对话ID |
| name | string | 对话名称 |
| createTime | string | 创建时间 |

## open

```ts
OCS.conversation.open(id?: number): Promise<{ convId: number, msgIdsMap: object }>
```

打开指定对话 若 id 为空则创建新对话

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | N | 对话ID 为空时创建新对话 |

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| convId | number | 对话ID |
| msgIdsMap | object | 消息ID映射 |

## rename

```ts
OCS.conversation.rename(id: number, name: string): Promise<void>
```

重命名对话

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 对话ID |
| name | string | Y | 新名称 |

## delete

```ts
OCS.conversation.delete(id: number): Promise<void>
```

删除对话

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 对话ID |

## fork

```ts
OCS.conversation.fork(messageId: number): Promise<{ id: number }>
```

从指定消息分支出新对话

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| messageId | number | Y | 消息ID |

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 新对话ID |
