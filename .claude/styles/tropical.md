# 🏖️ 热带度假风格 (Tropical Paradise)

## 风格概述

椰林树影、碧海蓝天、鸡尾酒与沙滩、火烈鸟与棕榈叶。浓烈的热带色彩在阳光下肆意绽放，每一帧画面都像是巴厘岛或夏威夷明信片上的风景。这是一个永远处于黄金时刻(Golden Hour)的度假天堂。灵感来源于热带旅行海报、Tiki文化、冲浪品牌。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 沙滩白 | `#fdf8f0` |
| 背景辅色 | 浅海蓝 | `#e0f4f4` |
| 主强调色 | 珊瑚橙 | `#ff6b4a` |
| 副强调色 | 海洋蓝 | `#0ea5e9` |
| 第三强调色 | 棕榈绿 | `#16a34a` |
| 正文文字 | 深棕 | `#3d2c1e` |
| 标题文字 | 深热带绿 | `#0d4730` |
| 点缀色1 | 火烈鸟粉 | `#f472b6` |
| 点缀色2 | 芒果黄 | `#facc15` |

## 字体方案

- 标题字体：`Pacifico` 或 `Leckerli One`（Google Fonts）— 手写冲浪风
- 副标题：`Josefin Sans`（Google Fonts）
- 正文字体：`Nunito` 或 `Poppins`（Google Fonts）
- 中文回退：`"Noto Sans SC", sans-serif`

## 背景设计

```css
body {
  background: linear-gradient(180deg, #e0f4f4 0%, #fdf8f0 30%, #fdf8f0 100%);
  color: #3d2c1e;
  font-family: 'Nunito', 'Noto Sans SC', sans-serif;
  line-height: 1.7;
}

/* 波浪底部装饰 */
.wave-bottom {
  position: relative;
}

.wave-bottom::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60'%3E%3Cpath fill='%23fdf8f0' d='M0,30 C360,60 720,0 1080,30 C1260,45 1350,20 1440,30 L1440,60 L0,60Z'/%3E%3C/svg%3E");
  background-size: cover;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Pacifico', cursive;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  color: #0d4730;
  text-align: center;
  text-shadow: 2px 3px 0 rgba(0,0,0,0.06);
}

.section-title {
  font-family: 'Josefin Sans', sans-serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 700;
  color: #0ea5e9;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
}

/* 小装饰标签 */
.tag-label {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #ff6b4a;
  background: rgba(255,107,74,0.1);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: linear-gradient(135deg, #ff6b4a, #f472b6);
  color: #ffffff;
  border: none;
  padding: 14px 36px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255,107,74,0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255,107,74,0.4);
}
```

### 次要按钮

```css
.btn-secondary {
  background: rgba(14,165,233,0.1);
  color: #0ea5e9;
  border: 2px solid #0ea5e9;
  padding: 14px 36px;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #0ea5e9;
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
  background: rgba(61,44,30,0.35);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fdf8f0;
  border-radius: 20px;
  padding: 40px;
  max-width: 460px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(61,44,30,0.12);
  position: relative;
  border-top: 4px solid #0ea5e9;
}

.modal-content::before {
  content: '🌴';
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  background: #fdf8f0;
  padding: 0 8px;
  border-radius: 50%;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0f4f4;
  border: none;
  color: #0ea5e9;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #b8e8e8;
}
```

## 卡片样式

```css
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 15px rgba(61,44,30,0.06);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(61,44,30,0.1);
}

/* 卡片顶部装饰波浪 */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #ff6b4a, #facc15, #0ea5e9, #16a34a);
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 12px 32px;
  background: rgba(253,248,240,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(61,44,30,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Pacifico', cursive;
  color: #0d4730;
  font-size: 1.3rem;
}

.nav-link {
  color: #3d2c1e;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #ff6b4a;
}
```

## 表单输入框

```css
.input-field {
  background: #ffffff;
  border: 2px solid #e0f4f4;
  color: #3d2c1e;
  padding: 12px 18px;
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  border-radius: 12px;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14,165,233,0.12);
}
```

## 分隔线

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  gap: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  max-width: 120px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
}

/* 中间🌊或🌺 */
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #fdf8f0; }
::-webkit-scrollbar-thumb { background: #0ea5e9; border-radius: 3px; }
```

## 动画效果

### 波浪轻摇

```css
@keyframes waveFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(1deg); }
  75% { transform: translateY(4px) rotate(-1deg); }
}

.wave-float {
  animation: waveFloat 4s ease-in-out infinite;
}
```

### 日出渐现

```css
@keyframes sunriseIn {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: brightness(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: brightness(1);
  }
}

.sunrise-in {
  animation: sunriseIn 0.8s ease-out;
}
```

### 棕榈叶摇摆（SVG装饰可选）

```css
@keyframes palmSway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}

.palm-leaf {
  transform-origin: bottom center;
  animation: palmSway 5s ease-in-out infinite;
}
```

## 设计注意事项

1. 色彩可以大胆鲜艳——热带就是要饱和度高！
2. 圆角要大（12-20px），营造柔和友好的感觉
3. 波浪曲线是核心装饰元素（分区、卡片底部、按钮形状）
4. 热带emoji是绝佳装饰：🌴🌺🍹🦩🌊🥥🏄‍♂️🌈☀️🐚
5. 渐变要温暖——从海到天、从日出到黄昏
6. 字体要活泼——手写体标题 + 圆润无衬线正文
7. 适合用于：旅行博客、活动页面、餐饮/饮品展示、夏日促销

## 向用户展示的风格描述

> 🏖️ **热带度假风格**
>
> 你的页面将带来阳光沙滩的度假气息！清爽的海蓝色天空渐变到温暖的沙滩白，珊瑚橙和火烈鸟粉的按钮像热带鸡尾酒一样鲜艳，波浪形的装饰线条让整个页面都在轻轻摇曳。让人看了就想订机票！
>
> 🎨 默认配色：沙滩白底 + 珊瑚橙/海洋蓝/棕榈绿
> 🔘 按钮风格：胶囊圆角 + 热带渐变 + 柔和阴影
> 💫 特效：波浪轻摇、日出渐现、棕榈摇摆
