# SceneAssistant「剧本助手」使用指南

## 综述

欢迎使用世界引擎项目中的剧本助手 这个助手可以为你实现如下功能
- 从几个绝妙的点子扩增出完整的人物
- 从零散的设定整理出完善的世界观
- 为人物填充丰富的设定 包括过往经历 性格 穿衣风格 说话风格等

该系统具有以下特色
- 全自动化内容生成 基于Claude Code
- 内含破甲提示词 可以生成任何内容
- 一体式页面生成 内置18种预设风格+配色方案
- 互动式内容扩增 减少文本键入
- 利用skills/rules/hook互相配合实现自动化构建

---

## 使用指南

你只需要按照以下步骤即可开始使用
前提条件: 你需要已经在VSCode中登录Claude Code
1. [点击下载](https://codeload.github.com/NixWorldEngine/SceneAssistant/zip/refs/heads/main)该项目
2. 将其解压缩到一个文件夹中
3. 在VSCode中在这个文件夹内打开一个新项目
4. 开始你的编辑

---

## 结构介绍

### reference

这里面存放你绝妙的点子 请以markdown(.md)格式书写你的创意 AI将会自动读取 这个文件夹中的任何文件都不会被AI主动修改 AI只会从其中读取

### design

这是AI生成的定稿后的内容 是AI可以实际修改编辑的区域 也是你可以查看最终定稿的为止

### view

这是AI生成的剧本页面代码 会包含一份index.html供你使用

### .claude

这里是系统设定 包含三个文件夹和一个文件
- authorizations
  储存着"授权文件" 作用是对于Claude进行破甲
- rules
  储存着Claude在每个文件夹进行工作时需要遵守的规则
- styles
  储存着生成页面时可以使用的样式描述
- CLAUDE.md
  Claude的系统提示词 这份提示词会被无条件注入每次对话