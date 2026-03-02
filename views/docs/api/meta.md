# OCS._meta

框架元数据 只读属性 同步访问

```ts
OCS._meta: { version: string, hash: string, time: number, cdnPrefix: string }
```

**属性**

| 字段 | 类型 | 说明 |
|------|------|------|
| version | string | 框架版本号 如 "2.34.1" |
| hash | string | 构建哈希 |
| time | number | 构建时间戳 |
| cdnPrefix | string | CDN 前缀 URL |

---

# OCS.decode

PNG 解码接口

```ts
OCS.decode(urls: string[]): Promise<ArrayBuffer>
```

解码 ACv5 PNG 编码的数据

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| urls | string[] | Y | PNG 图片 URL 数组 |

**返回值** ArrayBuffer 解码后的原始数据

---

# OCS.flush

作用域刷新接口

```ts
OCS.flush(all?: boolean, scope?: string): Promise<void>
```

刷新指定作用域

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| all | boolean | N | 是否全量清除 默认 false |
| scope | string | N | 作用域标识 |
