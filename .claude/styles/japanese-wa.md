# 🏯 和风日式风格 (Japanese Wa-style)

## 风格概述

侘寂之美——在不完美中发现完美，在朴素中感受深远。日式庭院的枯山水、和纸的温润质感、浮世绘的优雅配色。大量留白是无声的表达，一笔一划都蕴含着禅意。灵感来源于京都寺院、和纸工艺、日式料理的摆盘美学。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 和纸白 | `#f7f3ed` |
| 背景辅色 | 淡鼠色 | `#e8e3db` |
| 主强调色 | 朱色 | `#c73e3a` |
| 副强调色 | 藍色 | `#264e70` |
| 第三强调色 | 鶯茶色 | `#928c36` |
| 正文文字 | 墨色 | `#333333` |
| 标题文字 | 漆黒 | `#1a1a1a` |
| 点缀色 | 桜色 | `#e8a0b4` |

> 配色参考日本传统色名

## 字体方案

- 标题字体：`"Noto Serif JP"` 或 `"Zen Old Mincho"`（Google Fonts）— 明朝体
- 正文字体：`"Noto Sans JP"` 或 `"Zen Maru Gothic"`（Google Fonts）
- 中文回退：`"Noto Serif SC", "SimSun", serif`
- 英数字：`"Cormorant Garamond", serif`

## 背景设计

```css
body {
  background-color: #f7f3ed;
  color: #333333;
  font-family: 'Noto Sans JP', 'Noto Sans SC', sans-serif;
  line-height: 1.9;
}

/* 和纸纹理 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Zen Old Mincho', 'Noto Serif JP', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  color: #1a1a1a;
  text-align: center;
  letter-spacing: 0.15em;
}

.section-title {
  font-family: 'Zen Old Mincho', 'Noto Serif JP', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  color: #1a1a1a;
  letter-spacing: 0.12em;
  text-align: center;
  position: relative;
}

/* 标题前的朱色圆点 */
.section-title::before {
  content: '●';
  color: #c73e3a;
  font-size: 0.5em;
  margin-right: 12px;
  vertical-align: middle;
}

/* 副标题 — 小字注释风 */
.subtitle {
  font-size: 0.85rem;
  color: #888;
  letter-spacing: 0.2em;
  text-align: center;
}
```

## 按钮样式

### 主按钮 — 朱色和風

```css
.btn-primary {
  background: #c73e3a;
  color: #f7f3ed;
  border: none;
  padding: 12px 40px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.btn-primary:hover {
  background: #a83230;
  box-shadow: 0 4px 12px rgba(199,62,58,0.2);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #333333;
  border: 1px solid #333333;
  padding: 12px 40px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.btn-secondary:hover {
  background: rgba(0,0,0,0.04);
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
  background: rgba(51,51,51,0.3);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #f7f3ed;
  padding: 48px 40px;
  max-width: 460px;
  width: 90%;
  position: relative;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  border-top: 3px solid #c73e3a;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #c73e3a;
}
```

## 卡片样式

```css
.card {
  background: #ffffff;
  padding: 32px;
  border-left: 3px solid #c73e3a;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 16px 40px;
  background: rgba(247,243,237,0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Zen Old Mincho', serif;
  font-size: 1.2rem;
  color: #1a1a1a;
  letter-spacing: 0.1em;
}

.nav-link {
  color: #555;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #c73e3a;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background: #c73e3a;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}
```

## 表单输入框

```css
.input-field {
  background: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #333;
  padding: 10px 4px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  transition: border-color 0.3s;
  outline: none;
}

.input-field:focus {
  border-bottom-color: #c73e3a;
  border-bottom-width: 2px;
}

label {
  font-size: 0.8rem;
  color: #888;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
  display: block;
}
```

## 分隔线

```css
.divider {
  margin: 60px auto;
  text-align: center;
  border: none;
}

/* 枯山水砂纹分隔 */
.divider::before {
  content: '';
  display: block;
  width: 80%;
  max-width: 300px;
  height: 12px;
  margin: 0 auto;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0,0,0,0.06) 3px,
    rgba(0,0,0,0.06) 4px
  );
  border-radius: 50%;
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #f7f3ed; }
::-webkit-scrollbar-thumb { background: #c0b8a8; }
```

## 特殊组件

### 縦書き（竖排文字）

```css
.tategaki {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 0.3em;
  line-height: 2.5;
  font-family: 'Zen Old Mincho', serif;
}
```

### 和風引用块

```css
.quote-jp {
  position: relative;
  padding: 24px 32px;
  font-family: 'Zen Old Mincho', serif;
  font-size: 1.1rem;
  color: #555;
  line-height: 2;
  letter-spacing: 0.05em;
}

.quote-jp::before {
  content: '「';
  position: absolute;
  top: 0;
  left: 8px;
  font-size: 2rem;
  color: #c73e3a;
  line-height: 1;
}

.quote-jp::after {
  content: '」';
  font-size: 2rem;
  color: #c73e3a;
  line-height: 1;
}
```

### 番号標籤（带圆圈的数字）

```css
.number-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid #c73e3a;
  border-radius: 50%;
  color: #c73e3a;
  font-size: 0.8rem;
  font-weight: 500;
}
```

## 动画效果

### 缓慢渐现

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}
```

### 樱花飘落（可选，非常克制地使用）

```css
@keyframes sakuraFall {
  0% { transform: translateY(-10px) rotate(0deg) translateX(0); opacity: 0.6; }
  50% { transform: translateY(50vh) rotate(180deg) translateX(40px); }
  100% { transform: translateY(100vh) rotate(360deg) translateX(-20px); opacity: 0; }
}
```

## 设计注意事项

1. **留白即是设计**——日式美学的核心是"间"(Ma)，大量留白
2. 配色极度克制——白底+墨色为主，朱色仅用于点睛（如标题前的圆点、边线）
3. 边框几乎不使用，区分区域靠留白和微弱的阴影
4. 直角或极小圆角（2px），避免大圆角的可爱感
5. 字间距加大（letter-spacing: 0.1-0.2em），体现印刷美感
6. 可使用日式符号装饰：「」 ● ○ ◆ 等
7. 整体氛围：静谧、克制、精致、有呼吸感
8. 适合用于：个人博客、作品集、美食/旅行相关、文化类页面

## 向用户展示的风格描述

> 🏯 **和风日式风格**
>
> 你的页面将呈现日式庭院般的宁静美感。和纸般温润的白底上，精炼的墨色文字配上一抹朱红点缀，大量的留白让每个元素都有呼吸的空间。没有多余的装饰，只有恰到好处的简与美——这就是侘寂(わびさび)之美。
>
> 🎨 默认配色：和纸白底 + 墨色文字 + 朱色点缀
> 🔘 按钮风格：直角朱色 + 极简线框 + 细腻过渡
> 💫 特效：缓慢渐现、竖排文字、日式引号装饰
