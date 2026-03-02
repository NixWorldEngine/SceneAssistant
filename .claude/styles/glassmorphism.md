# 💎 玻璃拟态风格 (Glassmorphism)

## 风格概述

磨砂玻璃般的半透明层叠、柔和的模糊背景、微妙的边框光泽、渐变色的流动底色。像是透过雨后车窗看到的霓虹世界——一切都在朦胧中闪着光。灵感来源于Apple macOS/iOS设计语言、Windows Fluent Design、现代Dashboard界面。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景渐变1 | 深靛蓝 | `#0f0c29` |
| 背景渐变2 | 深紫 | `#302b63` |
| 背景渐变3 | 钴蓝 | `#24243e` |
| 玻璃填充 | 白色半透明 | `rgba(255,255,255,0.08)` |
| 玻璃边框 | 白色微透明 | `rgba(255,255,255,0.15)` |
| 主强调色 | 活力蓝 | `#60a5fa` |
| 副强调色 | 浅紫 | `#a78bfa` |
| 正文文字 | 纯白微透 | `rgba(255,255,255,0.85)` |
| 标题文字 | 纯白 | `#ffffff` |
| 弱化文字 | 白色半透 | `rgba(255,255,255,0.5)` |

> 注意：也可切换为**亮色模式**（白底+彩色渐变装饰球）

## 字体方案

- 标题字体：`Inter` 或 `Plus Jakarta Sans`（Google Fonts）
- 正文字体：`Inter`（Google Fonts）
- 中文回退：`"Noto Sans SC", "PingFang SC", sans-serif`

## 背景设计

核心：流动渐变底 + 彩色光球装饰

```css
body {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: rgba(255,255,255,0.85);
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
  line-height: 1.7;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 装饰光球 */
.blob-1 {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(96,165,250,0.35), transparent 70%);
  top: -100px;
  right: -100px;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  animation: blobFloat 15s ease-in-out infinite;
}

.blob-2 {
  position: fixed;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(167,139,250,0.3), transparent 70%);
  bottom: -80px;
  left: -80px;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  animation: blobFloat 18s ease-in-out infinite reverse;
}

.blob-3 {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(244,114,182,0.2), transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
  animation: blobFloat 20s ease-in-out infinite 3s;
}

@keyframes blobFloat {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(30px, -20px); }
  50% { transform: translate(-20px, 30px); }
  75% { transform: translate(15px, 15px); }
}
```

## 核心：玻璃效果类

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}

/* 高亮玻璃（更亮） */
.glass-bright {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

/* 深色玻璃 */
.glass-dark {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #ffffff;
  text-align: center;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

/* 渐变文字 */
.gradient-text {
  background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title {
  font-size: clamp(1.3rem, 3vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.subtitle {
  color: rgba(255,255,255,0.5);
  font-size: 1rem;
  font-weight: 400;
}
```

## 按钮样式

### 主按钮 — 玻璃渐变

```css
.btn-primary {
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
  color: #ffffff;
  border: none;
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(96,165,250,0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(96,165,250,0.4);
}
```

### 次要按钮 — 玻璃边框

```css
.btn-secondary {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.3);
}
```

## Modal / 弹窗样式

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 20px;
  padding: 40px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(255,255,255,0.2);
  color: #ffffff;
}
```

## 卡片样式

```css
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s ease;
}

.card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px);
  max-width: 1200px;
  padding: 12px 24px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-weight: 700;
  color: #ffffff;
  font-size: 1rem;
}

.nav-link {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color 0.3s;
  padding: 6px 14px;
  border-radius: 8px;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(255,255,255,0.08);
}
```

## 表单输入框

```css
.input-field {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  color: #ffffff;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  border-radius: 12px;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96,165,250,0.15);
  background: rgba(255,255,255,0.1);
}

.input-field::placeholder {
  color: rgba(255,255,255,0.3);
}
```

## 分隔线

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  margin: 50px 0;
  border: none;
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.25);
}
```

## 特殊组件

### 状态徽章

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-success {
  background: rgba(34,197,94,0.15);
  color: #4ade80;
  border: 1px solid rgba(34,197,94,0.2);
}

.badge-warning {
  background: rgba(250,204,21,0.15);
  color: #facc15;
  border: 1px solid rgba(250,204,21,0.2);
}
```

### 头像组

```css
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  background: linear-gradient(135deg, #60a5fa, #a78bfa);
}
```

## 动画效果

### 光球漂浮（已在背景中定义）

### 玻璃浮现

```css
@keyframes glassIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    backdrop-filter: blur(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    backdrop-filter: blur(20px);
  }
}

.glass-in {
  animation: glassIn 0.5s ease-out;
}
```

### 渐变流动

```css
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animated-gradient {
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}
```

## 亮色模式变体

如果用户偏好亮色，可切换为：

```css
body.light-mode {
  background: #f0f2f5;
  color: #1a1a2e;
}

body.light-mode .glass {
  background: rgba(255,255,255,0.6);
  border: 1px solid rgba(255,255,255,0.8);
}

body.light-mode .blob-1 {
  background: radial-gradient(circle, rgba(96,165,250,0.25), transparent 70%);
}
```

## 设计注意事项

1. **backdrop-filter: blur()是核心**——所有容器都要有模糊玻璃效果
2. 背景必须有渐变色或彩色光球，否则玻璃效果无法体现
3. 边框使用 `rgba(255,255,255,0.1~0.2)` 的微透明白色
4. 圆角统一使用12-20px
5. 阴影不要太重，保持轻盈漂浮感
6. 文字层级通过白色透明度区分（100% / 85% / 60% / 40%）
7. 渐变文字可以作为标题的亮点效果
8. 浮动导航栏（不顶边）是很好的设计细节

## 向用户展示的风格描述

> 💎 **玻璃拟态风格**
>
> 你的页面将呈现出磨砂玻璃般的精致质感。深色渐变背景中漂浮着柔和的彩色光球，所有的卡片和面板都像透明的磨砂玻璃一样——半透明、带模糊、有微妙的光泽边框。整体效果现代、精致、充满层次感，像极了最新的苹果和微软UI设计。
>
> 🎨 默认配色：深蓝紫渐变底 + 白色半透明玻璃层 + 蓝紫渐变强调
> 🔘 按钮风格：渐变填充/玻璃边框 + 柔和圆角 + 光晕阴影
> 💫 特效：彩色光球漂浮、玻璃浮现动画、渐变流动
