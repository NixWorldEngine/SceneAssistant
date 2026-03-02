# 🎪 孟菲斯风格 (Memphis Design)

## 风格概述

1980年代意大利孟菲斯设计运动的数字化复兴。大胆的几何色块、不对称的排列、撞色搭配、波浪线与锯齿纹。拒绝一切"好品味"的规则，用最张扬的方式表达快乐与活力。灵感来源于Ettore Sottsass、Keith Haring、以及所有90年代的活力设计。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 奶白 | `#fef9ef` |
| 背景辅色 | 浅粉 | `#ffe4e1` |
| 主强调色 | 大红 | `#ff3366` |
| 副强调色 | 电蓝 | `#3366ff` |
| 第三强调色 | 明黄 | `#ffcc00` |
| 正文文字 | 深蓝黑 | `#1a1a2e` |
| 标题文字 | 纯黑 | `#111111` |
| 点缀色1 | 嫩绿 | `#00cc88` |
| 点缀色2 | 亮紫 | `#9933ff` |

## 字体方案

- 标题字体：`Fredoka One` 或 `Lilita One`（Google Fonts）— 粗圆标题体
- 正文字体：`DM Sans` 或 `Poppins`（Google Fonts）
- 装饰大字：`Bungee` 或 `Rubik Mono One`（Google Fonts）
- 中文回退：`"Noto Sans SC", "Microsoft YaHei", sans-serif`

## 背景设计

```css
body {
  background-color: #fef9ef;
  color: #1a1a2e;
  font-family: 'DM Sans', 'Noto Sans SC', sans-serif;
  line-height: 1.7;
  overflow-x: hidden;
}

/* 散落的几何装饰 */
body::before {
  content: '';
  position: fixed;
  top: 10%;
  right: -30px;
  width: 120px;
  height: 120px;
  background: #ffcc00;
  border-radius: 50%;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
}

body::after {
  content: '';
  position: fixed;
  bottom: 15%;
  left: -40px;
  width: 150px;
  height: 150px;
  background: #ff3366;
  opacity: 0.1;
  z-index: 0;
  pointer-events: none;
  transform: rotate(45deg);
}
```

## 几何装饰元素（核心）

用CSS生成散落的几何图形：

```css
.geo-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #ff3366;
  position: absolute;
}

.geo-triangle {
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid #3366ff;
  position: absolute;
}

.geo-zigzag {
  background: repeating-linear-gradient(
    -45deg,
    #ffcc00,
    #ffcc00 10px,
    transparent 10px,
    transparent 20px
  );
  height: 20px;
  width: 200px;
  position: absolute;
}

.geo-dots {
  background-image: radial-gradient(#ff3366 3px, transparent 3px);
  background-size: 15px 15px;
  position: absolute;
}

.geo-wave {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10 Q20 0 40 10 Q60 20 80 10' fill='none' stroke='%233366ff' stroke-width='3'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  height: 20px;
  position: absolute;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Fredoka One', sans-serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  color: #111111;
  text-align: center;
  position: relative;
  line-height: 1.2;
}

/* 标题文字描边效果 */
.title-outline {
  -webkit-text-stroke: 3px #111111;
  color: transparent;
}

/* 标题下方波浪下划线 */
.hero-title::after {
  content: '';
  display: block;
  margin: 15px auto 0;
  width: 60%;
  height: 8px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='8'%3E%3Cpath d='M0 4 Q10 0 20 4 Q30 8 40 4' fill='none' stroke='%23ff3366' stroke-width='3'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
}

.section-title {
  font-family: 'Fredoka One', sans-serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  color: #3366ff;
  display: inline-block;
  padding: 4px 16px;
  background: #ffcc00;
  transform: rotate(-2deg);
}
```

## 按钮样式

### 主按钮 — 粗边框+偏移阴影

```css
.btn-primary {
  background: #ff3366;
  color: #ffffff;
  border: 3px solid #111111;
  padding: 14px 32px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  transition: transform 0.15s ease;
  box-shadow: 5px 5px 0 #111111;
  border-radius: 0;
}

.btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #111111;
}

.btn-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #111111;
}
```

### 次要按钮

```css
.btn-secondary {
  background: #ffffff;
  color: #3366ff;
  border: 3px solid #3366ff;
  padding: 14px 32px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 5px 5px 0 #3366ff;
  transition: transform 0.15s ease;
}

.btn-secondary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #3366ff;
}

.btn-secondary:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 #3366ff;
}
```

### 圆形按钮

```css
.btn-circle {
  background: #ffcc00;
  color: #111111;
  border: 3px solid #111111;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 4px 4px 0 #111111;
  transition: transform 0.15s;
}

.btn-circle:hover {
  transform: rotate(10deg) scale(1.05);
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
  background: rgba(26, 26, 46, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fef9ef;
  border: 4px solid #111111;
  padding: 40px;
  max-width: 480px;
  width: 90%;
  position: relative;
  box-shadow: 8px 8px 0 #ff3366;
  transform: rotate(-1deg);
}

.modal-close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3366ff;
  border: 3px solid #111111;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 0 #111111;
}

.modal-close:hover {
  background: #ff3366;
}
```

## 卡片样式

```css
.card {
  background: #ffffff;
  border: 3px solid #111111;
  padding: 28px;
  box-shadow: 6px 6px 0 #111111;
  transition: transform 0.2s ease;
  position: relative;
}

.card:nth-child(odd) { transform: rotate(-1deg); }
.card:nth-child(even) { transform: rotate(1deg); }

.card:hover {
  transform: rotate(0deg) translateY(-4px);
  box-shadow: 8px 8px 0 #111111;
}

/* 卡片顶部彩色条 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
}

.card:nth-child(1)::before { background: #ff3366; }
.card:nth-child(2)::before { background: #3366ff; }
.card:nth-child(3)::before { background: #ffcc00; }
.card:nth-child(4)::before { background: #00cc88; }
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 12px 32px;
  background: #ffcc00;
  border-bottom: 4px solid #111111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Fredoka One', sans-serif;
  color: #111111;
  font-size: 1.3rem;
}

.nav-link {
  color: #111111;
  text-decoration: none;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 4px 10px;
  transition: all 0.15s;
}

.nav-link:hover {
  background: #ff3366;
  color: #ffffff;
}
```

## 表单输入框

```css
.input-field {
  background: #ffffff;
  border: 3px solid #111111;
  color: #1a1a2e;
  padding: 12px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  outline: none;
  box-shadow: 4px 4px 0 #111111;
  transition: box-shadow 0.15s;
}

.input-field:focus {
  box-shadow: 4px 4px 0 #3366ff;
  border-color: #3366ff;
}
```

## 分隔线

```css
.divider {
  height: 8px;
  margin: 50px 0;
  border: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='8'%3E%3Cpath d='M0 0 L10 8 L20 0 L30 8 L40 0' fill='none' stroke='%23111' stroke-width='2'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #fef9ef; border-left: 3px solid #111; }
::-webkit-scrollbar-thumb { background: #ff3366; border: 2px solid #111; }
```

## 动画效果

### 弹跳进入

```css
@keyframes bounceRotateIn {
  0% { opacity: 0; transform: scale(0) rotate(-20deg); }
  60% { transform: scale(1.1) rotate(3deg); }
  80% { transform: scale(0.95) rotate(-1deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}

.bounce-in {
  animation: bounceRotateIn 0.5s ease-out;
}
```

### 持续旋转装饰

```css
@keyframes slowSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin-deco {
  animation: slowSpin 20s linear infinite;
}
```

### 抖动效果（hover）

```css
@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
}

.wiggle:hover {
  animation: wiggle 0.3s ease-in-out;
}
```

## 设计注意事项

1. **不对称是美**——元素可以歪斜（rotate ±1~3deg），打破网格对齐
2. **粗黑边框 + 偏移阴影**是核心视觉语言
3. 配色大胆撞色，不同区域可以用完全不同的色块背景
4. 几何装饰（圆、三角、波浪、锯齿、波点）随处散落
5. 字重要大胆——标题用极粗字体，形成强烈视觉冲击
6. 一切都要看起来"好玩"，避免任何严肃、端正的排版
7. 非常适合用于：活动页、创意作品集、个性展示

## 向用户展示的风格描述

> 🎪 **孟菲斯风格**
>
> 你的页面将像一场色彩派对！大胆的红蓝黄撞色、粗黑边框配上偏移的色块阴影、歪歪扭扭的几何装饰元素到处散落。一切都充满活力和叛逆精神——这里没有"规矩"，只有快乐和创造力。
>
> 🎨 默认配色：奶白底 + 大红/电蓝/明黄撞色
> 🔘 按钮风格：粗黑边框 + 偏移阴影 + 按压回弹
> 💫 特效：弹跳旋转、抖动、几何装饰散落
