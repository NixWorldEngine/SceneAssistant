# OCS.session

会话初始化接口

## init

```ts
OCS.session.init(prompt?: string): Promise<{ models: Model[], role: Role, context: object }>
```

初始化会话 获取模型列表和角色信息 视图加载时应首先调用此接口

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| prompt | string | N | 可选的系统提示词 |

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| models | Model[] | 可用模型列表 |
| role | Role | 当前角色信息 |
| context | object | 会话上下文 |

## get

```ts
OCS.session.get(): { roleId: number, convId: number, modelId: number, device: string }
```

同步获取当前会话状态 不返回 Promise

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| roleId | number | 当前角色ID |
| convId | number | 当前对话ID |
| modelId | number | 当前模型ID |
| device | string | 设备类型 "mobile" / "desktop" |
