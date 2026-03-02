# 🌆 赛博朋克风格 (Cyberpunk)

## 风格概述

黑暗的底色上跳跃着刺眼的霓虹光芒，像是雨夜中东京新宿的街头。一切都笼罩在科技与颓废交织的氛围里——故障艺术(Glitch)、全息投影、数据流、赛博义体。这是一个高科技低生活(High Tech, Low Life)的世界。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 深蓝黑 | `#0a0a1a` |
| 背景辅色 | 深紫黑 | `#12061f` |
| 主强调色 | 霓虹青 | `#00f0ff` |
| 副强调色 | 霓虹粉 | `#ff00aa` |
| 第三强调色 | 霓虹紫 | `#b000ff` |
| 正文文字 | 冷灰白 | `#c0c8d8` |
| 标题文字 | 纯白带光晕 | `#ffffff`（配合text-shadow） |
| 警告/高亮 | 霓虹黄 | `#ffe600` |

## 字体方案

- 标题字体：`Orbitron`（Google Fonts）— 几何感强的未来字体
- 正文字体：`Rajdhani` 或 `Share Tech Mono`（Google Fonts）
- 中文回退：`"Noto Sans SC", "Microsoft YaHei", sans-serif`

## 背景设计

- 纯深色底加微弱的网格线（用CSS渐变实现），模拟电路板/矩阵效果
- 可选：缓慢飘落的数据雨动画（纯CSS或轻量JS）
- 可选：背景微弱的渐变呼吸效果，在深蓝和深紫之间缓慢变化

```css
background-color: #0a0a1a;
background-image:
  linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
background-size: 50px 50px;
```

## 标题样式

- 大标题使用霓虹发光效果
- 可选带 glitch 抖动动画

```css
.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 900;
  color: #ffffff;
  text-shadow:
    0 0 10px #00f0ff,
    0 0 20px #00f0ff,
    0 0 40px #00f0ff,
    0 0 80px #00f0ff55;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

### Glitch动画

```css
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
}

.glitch-text {
  animation: glitch 3s infinite;
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #ff00aa;
  clip-path: inset(0 0 60% 0);
  animation: glitch 2s infinite reverse;
}

.glitch-text::after {
  color: #00f0ff;
  clip-path: inset(60% 0 0 0);
  animation: glitch 2.5s infinite;
}
```

## 按钮样式

### 主按钮
- 透明背景 + 霓虹青边框
- Hover时边框发光增强，内部填充半透明霓虹青
- 文字为霓虹青色，hover时变白

```css
.btn-primary {
  background: transparent;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  padding: 12px 32px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
}

.btn-primary:hover {
  background: rgba(0, 240, 255, 0.15);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5), inset 0 0 15px rgba(0, 240, 255, 0.1);
  color: #ffffff;
}
```

### 次要按钮
- 与主按钮结构相同但使用霓虹粉配色

```css
.btn-secondary {
  background: transparent;
  border: 2px solid #ff00aa;
  color: #ff00aa;
  padding: 12px 32px;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
}

.btn-secondary:hover {
  background: rgba(255, 0, 170, 0.15);
  box-shadow: 0 0 15px rgba(255, 0, 170, 0.5);
  color: #ffffff;
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
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: linear-gradient(135deg, #0d0d2b, #1a0a2e);
  border: 1px solid #00f0ff;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2), inset 0 0 30px rgba(0, 240, 255, 0.05);
  padding: 40px;
  max-width: 500px;
  width: 90%;
  position: relative;
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 20px;
  color: #ff00aa;
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  transition: text-shadow 0.3s;
}

.modal-close:hover {
  text-shadow: 0 0 10px #ff00aa;
}
```

## 卡片样式

```css
.card {
  background: linear-gradient(135deg, rgba(13, 13, 43, 0.9), rgba(26, 10, 46, 0.9));
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 24px;
  position: relative;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));
}

.card:hover {
  border-color: #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
  transform: translateY(-3px);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f0ff, transparent);
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 40px;
  background: rgba(10, 10, 26, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 240, 255, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-link {
  color: #c0c8d8;
  text-decoration: none;
  font-family: 'Rajdhani', sans-serif;
  font-size: 0.95rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #00f0ff;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: #00f0ff;
  box-shadow: 0 0 5px #00f0ff;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}
```

## 表单输入框样式

```css
.input-field {
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: #c0c8d8;
  padding: 12px 16px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  background: rgba(0, 240, 255, 0.08);
}

.input-field::placeholder {
  color: rgba(192, 200, 216, 0.4);
}
```

## 分隔线

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #00f0ff, #ff00aa, transparent);
  margin: 40px 0;
  border: none;
}
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0a0a1a;
}

::-webkit-scrollbar-thumb {
  background: #00f0ff;
  box-shadow: 0 0 6px #00f0ff;
}
```

## 动画效果

### 扫描线效果（可选，叠加在页面上）

```css
.scanlines::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
```

### 霓虹闪烁

```css
@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    text-shadow: 0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff;
  }
  20%, 24%, 55% {
    text-shadow: none;
  }
}
```

## 设计注意事项

1. 切角(clip-path)是赛博朋克风格的重要视觉元素，卡片、按钮、容器都应使用
2. 所有发光效果不要过于密集，保持"暗中有光"的克制感
3. 避免大面积使用亮色，霓虹色只用于强调元素
4. 文字间距适当加大，增强科技感
5. 可适当使用等宽字体显示"数据"类内容
6. 布局倾向于不对称、错位感，但不影响可读性

## 向用户展示的风格描述

> 🌆 **赛博朋克风格**
>
> 你的页面会是这样的感觉：深邃的暗色背景上跳动着青色和粉色的霓虹光芒，像是科幻电影里的未来都市。标题会带有发光效果，按钮有着切角的科技造型，整体充满未来感和神秘感。
>
> 🎨 默认配色：深蓝黑底 + 霓虹青强调 + 霓虹粉点缀
> 🔘 按钮风格：透明底 + 发光边框 + 科幻切角造型
> 💫 特效：霓虹发光、故障艺术文字抖动、电路网格背景
