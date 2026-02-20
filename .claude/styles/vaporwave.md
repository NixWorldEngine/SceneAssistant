# 🌊 蒸汽波风格 (Vaporwave)

## 风格概述

A E S T H E T I C S。90年代互联网怀旧、希腊雕塑、日落渐变、故障电视、Windows 95弹窗、日文片假名。粉紫色的黄昏天空下，棕榈树的剪影在无限网格上延伸。这是一场关于消费主义废墟的赛博梦境。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 深紫夜 | `#0d0221` |
| 背景辅色 | 暮光紫 | `#1a0533` |
| 主强调色 | 蒸汽粉 | `#ff71ce` |
| 副强调色 | 蒸汽蓝 | `#01cdfe` |
| 第三强调色 | 蒸汽紫 | `#b967ff` |
| 正文文字 | 浅紫白 | `#d0c0e8` |
| 标题文字 | 热粉 | `#ff71ce` |
| 点缀色1 | 日落橙 | `#ff8b3a` |
| 点缀色2 | 薄荷绿 | `#05ffa1` |

## 字体方案

- 标题字体：`Monoton` 或 `Bungee Shade`（Google Fonts）— 霓虹招牌感
- 副标题/正文：`Space Mono` 或 `IBM Plex Mono`（Google Fonts）
- 装饰文字（日文片假名）：`"Noto Sans JP"` 或直接使用Unicode文字
- 中文回退：`"Noto Sans SC", sans-serif`

## 背景设计

- 粉紫渐变天空 + 无限透视网格地面（核心视觉元素）
- 可选：棕榈树/希腊柱剪影

```css
body {
  background: linear-gradient(180deg, #0d0221 0%, #1a0533 30%, #2d1b69 60%, #ff71ce 100%);
  background-attachment: fixed;
  color: #d0c0e8;
  font-family: 'Space Mono', 'Noto Sans SC', monospace;
  line-height: 1.7;
  min-height: 100vh;
}

/* 透视网格地面 */
.grid-floor {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45vh;
  background:
    linear-gradient(rgba(1,205,254,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(1,205,254,0.3) 1px, transparent 1px);
  background-size: 60px 40px;
  transform: perspective(400px) rotateX(60deg);
  transform-origin: bottom center;
  pointer-events: none;
  z-index: 0;
  mask-image: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}

/* 太阳/日落圆 */
.sunset-sun {
  position: fixed;
  bottom: 25vh;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ff8b3a 0%, #ff71ce 50%, #b967ff 100%);
  z-index: 0;
  opacity: 0.5;
  /* 扫描线切割太阳 */
  mask-image: repeating-linear-gradient(
    0deg,
    #000 0px, #000 4px,
    transparent 4px, transparent 8px
  );
  -webkit-mask-image: repeating-linear-gradient(
    0deg,
    #000 0px, #000 4px,
    transparent 4px, transparent 8px
  );
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Monoton', cursive;
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 400;
  color: #ff71ce;
  text-align: center;
  text-shadow:
    0 0 10px #ff71ce,
    0 0 30px #ff71ce,
    0 0 60px rgba(255,113,206,0.4);
  letter-spacing: 0.08em;
}

/* 全角空格标题效果：Ｖ Ａ Ｐ Ｏ Ｒ */
.vapor-text {
  letter-spacing: 0.5em;
  text-transform: uppercase;
}

.section-title {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #01cdfe;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  text-shadow: 0 0 10px rgba(1,205,254,0.4);
}

/* 日文装饰文字 */
.deco-jp {
  font-family: 'Noto Sans JP', sans-serif;
  color: rgba(185,103,255,0.3);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: linear-gradient(135deg, #ff71ce, #b967ff);
  color: #ffffff;
  border: none;
  padding: 14px 36px;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255,113,206,0.3);
}

.btn-primary:hover {
  box-shadow: 0 0 30px rgba(255,113,206,0.5), 0 0 60px rgba(185,103,255,0.3);
  transform: translateY(-2px);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  border: 2px solid #01cdfe;
  color: #01cdfe;
  padding: 14px 36px;
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(1,205,254,0.1);
  box-shadow: 0 0 20px rgba(1,205,254,0.3);
}
```

## Modal / 弹窗样式 — Windows 95风格

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 2, 33, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #1a0533;
  border: 2px solid #b967ff;
  padding: 0;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 0 40px rgba(185,103,255,0.2);
}

.modal-titlebar {
  background: linear-gradient(90deg, #b967ff, #01cdfe);
  padding: 6px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  color: #ffffff;
  letter-spacing: 0.05em;
}

.modal-body {
  padding: 32px;
}

.modal-close {
  background: #1a0533;
  border: 1px solid #ffffff;
  color: #ffffff;
  width: 18px;
  height: 18px;
  font-size: 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
```

## 卡片样式

```css
.card {
  background: rgba(26, 5, 51, 0.8);
  border: 1px solid rgba(185,103,255,0.3);
  padding: 28px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #ff71ce;
  box-shadow: 0 0 25px rgba(255,113,206,0.15);
  transform: translateY(-3px);
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 14px 32px;
  background: rgba(13, 2, 33, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(185,103,255,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Monoton', cursive;
  color: #ff71ce;
  font-size: 1.1rem;
  text-shadow: 0 0 10px rgba(255,113,206,0.5);
}

.nav-link {
  color: #d0c0e8;
  text-decoration: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #01cdfe;
  text-shadow: 0 0 8px rgba(1,205,254,0.5);
}
```

## 表单输入框样式

```css
.input-field {
  background: rgba(13,2,33,0.6);
  border: 1px solid rgba(185,103,255,0.4);
  color: #d0c0e8;
  padding: 12px 16px;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  width: 100%;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #01cdfe;
  box-shadow: 0 0 15px rgba(1,205,254,0.2);
}
```

## 分隔线

```css
.divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff71ce, #01cdfe, #b967ff, transparent);
  margin: 50px 0;
  border: none;
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0d0221; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff71ce, #b967ff);
}
```

## 动画效果

### 扫描线 + CRT效果

```css
.crt::after {
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
    rgba(0,0,0,0.1) 2px,
    rgba(0,0,0,0.1) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
```

### 色彩位移闪烁

```css
@keyframes chromaShift {
  0%, 100% { text-shadow: 0 0 10px #ff71ce; }
  33% { text-shadow: -2px 0 #01cdfe, 2px 0 #ff71ce; }
  66% { text-shadow: 2px 0 #05ffa1, -2px 0 #b967ff; }
}
```

### 无限网格滚动

```css
@keyframes gridScroll {
  from { background-position: 0 0; }
  to { background-position: 0 40px; }
}

.grid-floor {
  animation: gridScroll 2s linear infinite;
}
```

## 设计注意事项

1. 全角字母间距是蒸汽波核心美学元素（Ｖ Ａ Ｐ Ｏ Ｒ Ｗ Ａ Ｖ Ｅ）
2. 适当使用日文片假名作为装饰文字，如「ヴェイパーウェイヴ」
3. 粉紫色渐变天空 + 透视网格是标志性视觉组合
4. Windows 95风格的弹窗是加分元素
5. 可使用古希腊雕塑/棕榈树的emoji或SVG剪影作为装饰
6. 色彩可以比赛博朋克更饱和、更梦幻
7. 整体氛围是"梦幻怀旧"而非"黑暗未来"

## 向用户展示的风格描述

> 🌊 **蒸汽波风格**
>
> 你的页面将沉浸在一场粉紫色的电子梦境中。日落色的天空渐变、无限延伸的霓虹网格地面、复古Windows弹窗风格的对话框。标题散发着粉色霓虹光晕，空气中弥漫着90年代互联网的怀旧气息。Ａ Ｅ Ｓ Ｔ Ｈ Ｅ Ｔ Ｉ Ｃ。
>
> 🎨 默认配色：深紫夜底 + 蒸汽粉/蓝/紫 + 日落橙
> 🔘 按钮风格：渐变胶囊 + 霓虹光晕 + Win95弹窗
> 💫 特效：透视网格滚动、CRT扫描线、色彩位移
