# 📰 报纸排版风格 (Editorial / Newspaper)

## 风格概述

回到纸媒黄金时代的经典排版美学。多栏布局、衬线大标题、精致的首字下沉、黑白为主的克制配色。灵感来源于《纽约时报》《The New Yorker》以及经典平面设计。用排版本身作为设计语言——字体即风格，网格即美感。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 新闻纸白 | `#faf8f5` |
| 背景辅色 | 米灰 | `#f0ece4` |
| 主强调色 | 油墨黑 | `#111111` |
| 副强调色 | 编辑红 | `#c41e3a` |
| 第三强调色 | 暖灰 | `#666666` |
| 正文文字 | 深灰 | `#2a2a2a` |
| 标题文字 | 纯黑 | `#000000` |
| 线条/边框 | 中灰 | `#cccccc` |

## 字体方案

- 大标题：`"Playfair Display"` 或 `"DM Serif Display"`（Google Fonts）— 经典衬线
- 副标题/引言：`"Libre Baskerville"` 或 `"Cormorant Garamond"`（Google Fonts）
- 正文字体：`"Source Serif 4"` 或 `"Merriweather"`（Google Fonts）
- 标签/分类：`"Inter"` 或 `"DM Sans"`（无衬线小字）
- 中文回退：`"Noto Serif SC", "SimSun", serif`

## 背景设计

```css
body {
  background: #faf8f5;
  color: #2a2a2a;
  font-family: 'Source Serif 4', 'Noto Serif SC', serif;
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 900;
  color: #000000;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-align: center;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  color: #111111;
  line-height: 1.15;
}

/* 标签/分类 — 无衬线小号 */
.category-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #c41e3a;
}

/* 作者署名线 */
.byline {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* 首字下沉 */
.drop-cap::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 4.5em;
  float: left;
  line-height: 0.8;
  padding-right: 10px;
  padding-top: 4px;
  color: #000000;
  font-weight: 900;
}
```

## 多栏布局

```css
/* 双栏正文 */
.two-column {
  column-count: 2;
  column-gap: 40px;
  column-rule: 1px solid #cccccc;
}

/* 三栏布局 */
.three-column {
  column-count: 3;
  column-gap: 30px;
  column-rule: 1px solid #cccccc;
}

@media (max-width: 768px) {
  .two-column,
  .three-column {
    column-count: 1;
  }
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: #111111;
  color: #faf8f5;
  border: none;
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #333333;
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #111111;
  border: 1.5px solid #111111;
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #111111;
  color: #faf8f5;
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
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #faf8f5;
  padding: 48px 40px;
  max-width: 520px;
  width: 90%;
  position: relative;
  border-top: 4px solid #111111;
  box-shadow: 0 20px 50px rgba(0,0,0,0.12);
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
}

.modal-close:hover {
  color: #111;
}
```

## 卡片样式

```css
.card {
  padding: 24px 0;
  border-bottom: 1px solid #cccccc;
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 24px;
  align-items: start;
}

.card:first-child {
  border-top: 3px solid #111111;
  padding-top: 20px;
}

@media (max-width: 768px) {
  .card {
    grid-template-columns: 1fr;
  }
}

.card-headline {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #111;
  line-height: 1.3;
  margin-bottom: 6px;
}

.card-excerpt {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}
```

## 导航栏样式

```css
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background: #faf8f5;
  z-index: 100;
}

.nav-top {
  text-align: center;
  padding: 20px 0 12px;
  border-bottom: 1px solid #cccccc;
}

.nav-masthead {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #000;
  letter-spacing: -0.01em;
}

.nav-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 4px;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 10px 0;
  border-bottom: 2px solid #111;
}

.nav-link {
  color: #2a2a2a;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #c41e3a;
}
```

## 表单输入框

```css
.input-field {
  background: #ffffff;
  border: 1px solid #cccccc;
  color: #2a2a2a;
  padding: 10px 14px;
  font-family: 'Source Serif 4', serif;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;
  outline: none;
}

.input-field:focus {
  border-color: #111111;
}
```

## 分隔线

```css
/* 细线 */
.divider-thin {
  height: 1px;
  background: #cccccc;
  margin: 30px 0;
  border: none;
}

/* 粗线 */
.divider-thick {
  height: 3px;
  background: #111111;
  margin: 30px 0;
  border: none;
}

/* 双线 */
.divider-double {
  height: 0;
  border: none;
  border-top: 3px double #111111;
  margin: 30px 0;
}
```

## 引用块

```css
.pullquote {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-style: italic;
  color: #111;
  text-align: center;
  padding: 30px 40px;
  margin: 40px 0;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  line-height: 1.4;
}

.pullquote-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-style: normal;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 12px;
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #faf8f5; }
::-webkit-scrollbar-thumb { background: #ccc; }
```

## 动画效果

此风格几乎不使用动画，保持印刷品的静态质感。仅有：

### 滚动淡入

```css
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

## 设计注意事项

1. **排版即设计**——字体选择、字号层级、行距是一切的基础
2. 颜色极度克制，几乎只有黑白灰 + 一抹红色
3. 多栏布局是报纸的灵魂，但移动端要回退到单栏
4. 首字下沉(Drop Cap)是标志性元素，文章开头必须使用
5. 分隔线有严格等级：细线分隔小节，粗线分隔大区域，双线用于最重要的分隔
6. 所有装饰性元素（包括圆角、阴影）降到最低
7. 适合用于：博客、文章页、个人简历、知识类页面

## 向用户展示的风格描述

> 📰 **报纸排版风格**
>
> 你的页面将拥有经典报纸和杂志的排版美感。大气的衬线标题、精致的首字下沉、优雅的多栏布局——就像一份精心排版的纸质刊物。黑白为主的配色中只有一抹编辑红作为点缀，每一个细节都透着专业与品位。
>
> 🎨 默认配色：新闻纸白底 + 油墨黑文字 + 编辑红点缀
> 🔘 按钮风格：方正无衬线 + 黑白色块 + 无多余装饰
> 💫 特效：几乎无动画——用字体和排版本身说话
