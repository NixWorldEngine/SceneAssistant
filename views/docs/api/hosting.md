# OCS.hosting

图片托管接口

## upload

```ts
OCS.hosting.upload(data: ArrayBuffer | string, name: string, folderId?: string): Promise<{ url: string, name: string }>
```

上传图片到图床

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | ArrayBuffer / string | Y | 图片数据 (二进制或 base64) |
| name | string | Y | 文件名 |
| folderId | string | N | 目标文件夹ID |

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| url | string | 图片 CDN URL |
| name | string | 文件名 |

## list

```ts
OCS.hosting.list(folderId?: string): Promise<ImageEntry[]>
```

列出图片

**返回值**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | number | 图片ID |
| url | string | 图片URL |
| name | string | 文件名 |

## delete

```ts
OCS.hosting.delete(ids: number[]): Promise<void>
```

删除图片

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | number[] | Y | 图片ID数组 |

---

# OCS.save

存档文件接口 用于保存/加载游戏数据

## upload

```ts
OCS.save.upload(data: ArrayBuffer, roleId: number, convId: number, folderId?: string): Promise<void>
```

上传存档数据

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| data | ArrayBuffer | Y | 存档数据 |
| roleId | number | Y | 角色ID |
| convId | number | Y | 对话ID |
| folderId | string | N | 文件夹ID |

## download

```ts
OCS.save.download(roleId: number, convId: number, folderId?: string): Promise<ArrayBuffer>
```

下载存档数据

**返回值** ArrayBuffer 存档二进制数据

## list

```ts
OCS.save.list(folderId?: string): Promise<SaveEntry[]>
```

列出存档文件
