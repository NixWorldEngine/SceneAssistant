# OCS.kag

知识增强生成 (Knowledge Augmented Generation) 接口

## get

```ts
OCS.kag.get(query: KagQuery): Promise<any>
```

查询知识图谱数据

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | KagQuery | Y | 查询对象 |

**KagQuery 对象**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | Y | 查询类型 见下方枚举 |
| entity_id | string | N | 实体ID 按类型需要 |
| page | number | N | 分页页码 |
| size | number | N | 分页大小 |

**type 枚举值**

| 值 | 说明 |
|------|------|
| entities | 所有实体 |
| relations | 关系列表 |
| events | 事件列表 |
| export | 导出全部数据 |
| stats | 统计信息 |
| config | KAG 配置 |
| graph | 关系图谱 |
| scene | 场景信息 |
| worldinfo | 世界观信息 |
| summary | 摘要 |
| objectives | 目标 |
| characters | 角色列表 |
| unified_stats | 统一统计 |
| memories | 记忆列表 |
| community_members | 社群成员 |
| tool_schemas | 工具定义 |
| mutex_groups | 互斥组 |
| chat_messages | 聊天消息 |

## save

```ts
OCS.kag.save(): Promise<void>
```

保存知识图谱到数据库

## delete

```ts
OCS.kag.delete(target: object): Promise<void>
```

删除知识图谱数据

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| target | object | Y | 删除目标 包含 type 和 id 字段 |

## change

```ts
OCS.kag.change(data: object): Promise<void>
```

更新知识图谱数据

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | object | Y | 变化数据 格式取决于操作类型 |

## getMergedIds

```ts
OCS.kag.getMergedIds(): Promise<number[]>
```

获取已合并到知识图谱的消息ID列表

## backfillMsg

```ts
OCS.kag.backfillMsg(msgId: number, raw: string): Promise<void>
```

回填消息到知识图谱

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| msgId | number | Y | 消息ID |
| raw | string | Y | 原始响应字符串 |

## _call

```ts
OCS.kag._call(fn: string, args: any[]): Promise<any>
```

直接调用 Wasm 函数 (底层接口 谨慎使用)

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| fn | string | Y | Wasm 函数名 |
| args | any[] | Y | 参数数组 |
