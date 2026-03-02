# OCS.model

模型选择接口

## list

```ts
OCS.model.list(): Promise<Model[]>
```

获取可用模型列表

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 模型ID |
| name | string | 模型名称 |
| maxToken | number | 最大令牌数 |
| stream | boolean | 是否支持流式 |
| provider | string | 提供商 |

## select

```ts
OCS.model.select(id: number, token?: number, stream?: boolean): Promise<void>
```

选择模型

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 模型ID |
| token | number | N | 最大令牌数 |
| stream | boolean | N | 是否启用流式 |
