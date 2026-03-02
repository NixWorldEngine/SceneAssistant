# ⚙️ 蒸汽朋克风格 (Steampunk)

## 风格概述

维多利亚时代的优雅与工业革命的粗犷机械完美融合。黄铜齿轮、蒸汽管道、皮革铆钉、古老的仪表盘——这是一个蒸汽动力驱动想象力的复古未来世界。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 暗褐 | `#1a1209` |
| 背景辅色 | 深棕 | `#2a1f0e` |
| 主强调色 | 黄铜金 | `#c8a032` |
| 副强调色 | 铜橙 | `#b87333` |
| 第三强调色 | 蒸汽白 | `#e8dcc8` |
| 正文文字 | 羊皮纸色 | `#d4c5a0` |
| 标题文字 | 亮铜金 | `#dbb850` |
| 链接/高亮 | 锈红 | `#8b3a2a` |

## 字体方案

- 标题字体：`Cinzel Decorative` 或 `Playfair Display`（Google Fonts）— 维多利亚衬线体
- 正文字体：`Crimson Text` 或 `EB Garamond`（Google Fonts）
- 装饰/数字字体：`Special Elite`（打字机风格）
- 中文回退：`"Noto Serif SC", "SimSun", serif`

## 背景设计

- 仿旧羊皮纸/做旧纸张纹理（CSS渐变模拟）
- 可选：缓慢旋转的齿轮装饰（CSS动画）
- 边缘做旧暗角效果

```css
body {
  background-color: #1a1209;
  background-image:
    radial-gradient(ellipse at center, #2a1f0e 0%, #1a1209 70%),
    url("data:image/svg+xml,..."); /* 内联齿轮SVG纹理 */
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
  pointer-events: none;
  z-index: 0;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Cinzel Decorative', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: #dbb850;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.6), 0 0 15px rgba(200,160,50,0.2);
  letter-spacing: 0.05em;
  text-align: center;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  color: #c8a032;
  border-bottom: 2px solid #b87333;
  padding-bottom: 8px;
  display: inline-block;
}
```

## 装饰分隔线

使用齿轮图案或维多利亚花饰作为分隔：

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  gap: 15px;
  color: #b87333;
  font-size: 1.2rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #b87333, transparent);
}

/* 中间放齿轮符号 ⚙ */
.divider-icon {
  font-size: 1.5rem;
  color: #c8a032;
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## 按钮样式

### 主按钮 — 铜铆钉风格

```css
.btn-primary {
  background: linear-gradient(180deg, #c8a032 0%, #8b6914 100%);
  border: 2px solid #dbb850;
  color: #1a1209;
  padding: 12px 32px;
  font-family: 'Cinzel Decorative', serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}

.btn-primary::before,
.btn-primary::after {
  content: '●';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 6px;
  color: #dbb850;
}

.btn-primary::before { left: 8px; }
.btn-primary::after { right: 8px; }

.btn-primary:hover {
  background: linear-gradient(180deg, #dbb850 0%, #a07818 100%);
  box-shadow: 0 6px 12px rgba(0,0,0,0.5), 0 0 15px rgba(200,160,50,0.3);
  transform: translateY(-1px);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  border: 2px solid #b87333;
  color: #d4c5a0;
  padding: 12px 32px;
  font-family: 'Cinzel Decorative', serif;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(184, 115, 51, 0.15);
  border-color: #c8a032;
  color: #c8a032;
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
  background: rgba(10, 8, 3, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: linear-gradient(135deg, #2a1f0e, #1a1209);
  border: 3px double #c8a032;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 0 40px rgba(200,160,50,0.1), inset 0 0 60px rgba(0,0,0,0.3);
  border-radius: 6px;
}

.modal-content::before {
  content: '⚙';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.8rem;
  color: #c8a032;
  background: #1a1209;
  padding: 0 12px;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  color: #b87333;
  font-size: 1.3rem;
  cursor: pointer;
  background: none;
  border: none;
  font-family: 'Cinzel Decorative', serif;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #c8a032;
}
```

## 卡片样式

```css
.card {
  background: linear-gradient(135deg, rgba(42, 31, 14, 0.95), rgba(26, 18, 9, 0.95));
  border: 1px solid rgba(200, 160, 50, 0.3);
  border-radius: 6px;
  padding: 28px;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.card:hover {
  border-color: #c8a032;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 15px rgba(200,160,50,0.1);
  transform: translateY(-2px);
}

.card::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  border: 1px solid rgba(184, 115, 51, 0.15);
  border-radius: 3px;
  pointer-events: none;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 12px 40px;
  background: rgba(26, 18, 9, 0.95);
  border-bottom: 2px solid #b87333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Cinzel Decorative', serif;
  color: #dbb850;
  font-size: 1.3rem;
}

.nav-link {
  color: #d4c5a0;
  text-decoration: none;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #c8a032;
}
```

## 表单输入框样式

```css
.input-field {
  background: rgba(42, 31, 14, 0.6);
  border: 1px solid #b87333;
  color: #d4c5a0;
  padding: 12px 16px;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  width: 100%;
  border-radius: 4px;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #c8a032;
  box-shadow: 0 0 10px rgba(200, 160, 50, 0.15);
}
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1209;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #c8a032, #8b6914);
  border-radius: 4px;
}
```

## 动画效果

### 齿轮旋转装饰

```css
.gear {
  display: inline-block;
  animation: spin 15s linear infinite;
  color: #b87333;
  font-size: 2rem;
}

.gear:nth-child(even) {
  animation-direction: reverse;
  animation-duration: 12s;
}
```

### 蒸汽飘散效果（可选）

```css
@keyframes steam {
  0% { opacity: 0; transform: translateY(0) scale(1); }
  50% { opacity: 0.4; }
  100% { opacity: 0; transform: translateY(-80px) scale(2); }
}

.steam-particle {
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(232,220,200,0.3), transparent);
  border-radius: 50%;
  animation: steam 3s ease-out infinite;
}
```

## 设计注意事项

1. 多使用装饰性边框（double border）增强维多利亚时代感
2. 字体选择偏向衬线体，体现古典印刷质感
3. 金属质感通过渐变实现，避免纯色平铺
4. 铆钉、齿轮等装饰元素用CSS伪元素或Unicode符号实现
5. 整体色调偏暖偏暗，营造煤油灯下的氛围
6. 可使用⚙️🔧⚡等符号作为装饰元素

## 向用户展示的风格描述

> ⚙️ **蒸汽朋克风格**
>
> 你的页面会呈现出维多利亚时代的精致与工业革命的力量感。深褐色的背景像古老的羊皮纸，黄铜金色的标题和装饰散发着金属光泽，缓慢旋转的齿轮图案点缀其间。
>
> 🎨 默认配色：暗褐底色 + 黄铜金强调 + 铜橙点缀
> 🔘 按钮风格：金属渐变 + 铆钉装饰 + 立体感
> 💫 特效：齿轮旋转、蒸汽飘散、金属质感光泽
