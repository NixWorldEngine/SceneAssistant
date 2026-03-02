# OCS.prompt

提示词管理接口 分为下一条消息注入 (next) 和系统级 (sys) 两类

---

# OCS.prompt.next

下一条消息注入的临时提示词 发送后自动消费

## add

```ts
OCS.prompt.next.add(key: string, value: string): void
```

添加下一消息的注入提示词 同步调用

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | string | Y | 提示词标识键 |
| value | string | Y | 提示词内容 |

## get

```ts
OCS.prompt.next.get(): Record<string, string>
```

获取所有待注入提示词 同步调用

**返回值** `{ key: value }` 键值对象

## remove

```ts
OCS.prompt.next.remove(key: string): void
```

移除指定提示词 同步调用

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | string | Y | 提示词标识键 |

---

# OCS.prompt.sys

系统级提示词 持久存在直到手动移除

## add

```ts
OCS.prompt.sys.add(key: string, value: string): Promise<void>
```

添加系统提示词

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | string | Y | 提示词标识键 |
| value | string | Y | 提示词内容 |

## remove

```ts
OCS.prompt.sys.remove(key: string): Promise<void>
```

移除系统提示词

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| key | string | Y | 提示词标识键 |

## get

```ts
OCS.prompt.sys.get(): Promise<Record<string, string>>
```

获取所有系统提示词

**返回值** `{ key: value }` 键值对象
