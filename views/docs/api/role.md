# OCS.role

角色信息接口

## query

```ts
OCS.role.query(): Promise<Role>
```

获取当前角色详情

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 角色ID |
| name | string | 角色名 |
| avatar | string | 头像URL |
| description | string | 角色描述 |
| greeting | string | 开场白 |
| authorId | number | 作者ID |
| authorName | string | 作者名 |

## like

```ts
OCS.role.like(): Promise<void>
```

给当前角色点赞

## favourite

```ts
OCS.role.favourite(): Promise<void>
```

将当前角色加入收藏

## pointTop

```ts
OCS.role.pointTop(page?: number, size?: number): Promise<{ list: object[], total: number }>
```

获取点赞排行榜

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | N | 页码 默认 1 |
| size | number | N | 每页数量 默认 20 |

---

# OCS.role.comment

角色评论子接口

## page

```ts
OCS.role.comment.page(page?: number, size?: number): Promise<{ list: Comment[], total: number }>
```

获取角色评论分页

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | N | 页码 默认 1 |
| size | number | N | 每页数量 默认 20 |

## create

```ts
OCS.role.comment.create(content: string, parentId?: number): Promise<void>
```

发布评论

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| content | string | Y | 评论内容 |
| parentId | number | N | 父评论ID 用于回复 |

## delete

```ts
OCS.role.comment.delete(id: number): Promise<void>
```

删除评论

## like

```ts
OCS.role.comment.like(id: number): Promise<void>
```

赞评论

## top

```ts
OCS.role.comment.top(id: number): Promise<void>
```

置顶评论

## cancelTop

```ts
OCS.role.comment.cancelTop(id: number): Promise<void>
```

取消置顶评论

## report

```ts
OCS.role.comment.report(id: number, reason: string): Promise<void>
```

举报评论

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | number | Y | 评论ID |
| reason | string | Y | 举报原因 |

## switch

```ts
OCS.role.comment.switch(enabled: boolean): Promise<void>
```

切换评论功能开关

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| enabled | boolean | Y | true 启用 / false 禁用 |
