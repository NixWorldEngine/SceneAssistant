# OCS.extra

额外上下文接口 用于在对话中注入额外信息

## set

```ts
OCS.extra.set(text: string): Promise<void>
```

设置额外上下文内容 会追加到每次请求的上下文中

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | Y | 额外上下文文本 |

## clear

```ts
OCS.extra.clear(): Promise<void>
```

清除额外上下文

---

# OCS.author

作者人设接口 用于注入作者视角的提示词

## set

```ts
OCS.author.set(text: string): Promise<void>
```

设置作者人设提示词

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| text | string | Y | 作者人设文本 |

## clear

```ts
OCS.author.clear(): Promise<void>
```

清除作者人设
