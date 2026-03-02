# OCS.storage

存储接口 提供 localStorage / sessionStorage / IndexedDB / OPFS 四种存储方式
所有操作支持 scope 参数实现多角色/多对话数据隔离

---

# OCS.storage.localStorage

## getItem

```ts
OCS.storage.localStorage.getItem(k: string, scope?: string): Promise<string | null>
```

获取本地存储值

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| k | string | Y | 键名 |
| scope | string | N | 作用域 默认 "default" |

## setItem

```ts
OCS.storage.localStorage.setItem(k: string, v: string, scope?: string): Promise<void>
```

设置本地存储

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| k | string | Y | 键名 |
| v | string | Y | 值 |
| scope | string | N | 作用域 |

## removeItem

```ts
OCS.storage.localStorage.removeItem(k: string, scope?: string): Promise<void>
```

删除本地存储项

## clear

```ts
OCS.storage.localStorage.clear(scope?: string): Promise<void>
```

清空指定作用域的本地存储

## key

```ts
OCS.storage.localStorage.key(i: number, scope?: string): Promise<string | null>
```

获取指定索引的键名

## length

```ts
OCS.storage.localStorage.length(scope?: string): Promise<number>
```

获取存储项数量

---

# OCS.storage.sessionStorage

与 localStorage 接口完全相同 使用会话级存储 页面关闭后清除

---

# OCS.storage.idb

IndexedDB 操作接口

## get

```ts
OCS.storage.idb.get(db: string, key: string, store?: string, scope?: string): Promise<any>
```

读取值

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| db | string | Y | 数据库名 |
| key | string | Y | 键 |
| store | string | N | 对象仓库名 默认 "default" |
| scope | string | N | 作用域 |

## put

```ts
OCS.storage.idb.put(db: string, key: string, value: any, store?: string, scope?: string): Promise<void>
```

写入值

## remove

```ts
OCS.storage.idb.remove(db: string, key: string, store?: string, scope?: string): Promise<void>
```

删除值

## getAll

```ts
OCS.storage.idb.getAll(db: string, store?: string, count?: number, scope?: string): Promise<any[]>
```

读取所有值

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| db | string | Y | 数据库名 |
| store | string | N | 对象仓库名 |
| count | number | N | 数量限制 |
| scope | string | N | 作用域 |

## clear

```ts
OCS.storage.idb.clear(db: string, store?: string, scope?: string): Promise<void>
```

清空对象仓库

## count

```ts
OCS.storage.idb.count(db: string, store?: string, scope?: string): Promise<number>
```

统计项数

## keys

```ts
OCS.storage.idb.keys(db: string, store?: string, scope?: string): Promise<string[]>
```

获取所有键

## deleteDb

```ts
OCS.storage.idb.deleteDb(db: string, scope?: string): Promise<void>
```

删除整个数据库

---

# OCS.storage.opfs

Origin Private File System 文件系统操作接口

## list

```ts
OCS.storage.opfs.list(path: string, scope?: string): Promise<FileEntry[]>
```

列出目录下的文件

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 文件名 |
| kind | string | "file" / "directory" |

## mkdir

```ts
OCS.storage.opfs.mkdir(path: string, scope?: string): Promise<void>
```

创建目录

## read

```ts
OCS.storage.opfs.read(path: string, encoding?: string, scope?: string): Promise<string | ArrayBuffer>
```

读取文件

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| path | string | Y | 文件路径 |
| encoding | string | N | "text" 返回字符串 / "binary" 返回 ArrayBuffer 默认 "text" |
| scope | string | N | 作用域 |

## write

```ts
OCS.storage.opfs.write(path: string, data: string | ArrayBuffer, encoding?: string, scope?: string): Promise<void>
```

写入文件

## delete

```ts
OCS.storage.opfs.delete(path: string, recursive?: boolean, scope?: string): Promise<void>
```

删除文件或目录

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| path | string | Y | 路径 |
| recursive | boolean | N | 目录时是否递归删除 默认 false |
| scope | string | N | 作用域 |

## stat

```ts
OCS.storage.opfs.stat(path: string, scope?: string): Promise<FileStat>
```

获取文件元信息

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| name | string | 文件名 |
| size | number | 文件大小 (bytes) |
| lastModified | number | 最后修改时间戳 |

## openWritable

```ts
OCS.storage.opfs.openWritable(path: string, scope?: string): Promise<{ write: Function, close: Function }>
```

打开可写文件句柄 用于大文件分块写入

**返回值**

| 方法 | 说明 |
|------|------|
| write(data) | 写入数据块 |
| close() | 关闭句柄 |
