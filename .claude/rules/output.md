---
paths:
  - output/**
---

# 编译输出目录

## 目录职责

`output/` 存放由 `/compile-profile` 命令生成的编译后设定文件

## 文件特征

- 英文版本 从 profile/ 中的中文定稿翻译而来
- 针对 Gemini tokenizer 优化 token 用量
- 散文转键值对 删除冗余修饰 使用缩写
- 与 profile/ 保持相同的文件名和目录结构

## 工作规范

- output/ 中的文件由命令自动生成 不要手动编辑
- 需要修改内容时 应修改 profile/ 中的源文件 然后重新运行 /compile-profile
- output/ 已在 .gitignore 中排除

## 禁止操作

- 不要手动创建或修改 output/ 中的文件
- 不要将 output/ 中的文件作为设定的权威来源 权威来源是 profile/
