# OCS.cache

缓存管理接口

## clear

```ts
OCS.cache.clear(scopes?: string[], refresh?: boolean): Promise<void>
```

清除指定作用域的缓存

**参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| scopes | string[] | N | 要清除的作用域数组 不传则清除全部 |
| refresh | boolean | N | 清除后是否刷新页面 默认 false |

**scopes 枚举值**

| 值 | 说明 |
|------|------|
| code | OCS 框架代码缓存 |
| models | 模型列表缓存 |
| autosave | 自动保存数据 |
| views | 视图缓存 |
| data | 用户数据缓存 |
| ocs_view | OCS 视图数据 |
| logs | 日志缓存 |
| models_chunk | 模型分块缓存 |
| onnx | ONNX 模型缓存 |
| parent | 父级页面缓存 |
| force_refresh | 强制刷新标记 |
