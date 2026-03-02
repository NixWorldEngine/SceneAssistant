# 🖤 暗黑哥特风格 (Dark Gothic)

## 风格概述

哥特式大教堂的尖拱穹顶、彩色玻璃花窗的微光、蔷薇与荆棘的缠绕。黑色天鹅绒般的深沉底色上，血红与暗金的点缀如同烛火在暗夜中摇曳。维多利亚哥特的阴郁浪漫与中世纪黑暗美学的完美融合。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 深渊黑 | `#0a0a0a` |
| 背景辅色 | 暗红黑 | `#120808` |
| 主强调色 | 鲜血红 | `#8b0000` |
| 副强调色 | 暗金 | `#8b7335` |
| 第三强调色 | 枯玫瑰 | `#6b3a4a` |
| 正文文字 | 灰白 | `#b0a8a0` |
| 标题文字 | 骨白 | `#e8e0d4` |
| 点缀色 | 暗紫 | `#4a2040` |

## 字体方案

- 标题字体：`UnifrakturMaguntia` 或 `IM Fell English SC`（Google Fonts）— 哥特黑体/古英语
- 正文字体：`EB Garamond` 或 `Cormorant Garamond`（Google Fonts）
- 装饰字体：`Cinzel`（Google Fonts）— 大写罗马碑文风
- 中文回退：`"Noto Serif SC", "SimSun", serif`

## 背景设计

```css
body {
  background-color: #0a0a0a;
  background-image:
    radial-gradient(ellipse at 50% 0%, rgba(139,0,0,0.05) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 100%, rgba(74,32,64,0.05) 0%, transparent 60%);
  color: #b0a8a0;
  font-family: 'EB Garamond', 'Noto Serif SC', serif;
  line-height: 1.8;
}

/* 暗角效果 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%);
  pointer-events: none;
  z-index: 0;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'UnifrakturMaguntia', cursive;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 400;
  color: #e8e0d4;
  text-align: center;
  text-shadow: 0 2px 10px rgba(139,0,0,0.3);
  letter-spacing: 0.03em;
}

.section-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  color: #8b7335;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-align: center;
}

/* 装饰横线标题 */
.section-title::before,
.section-title::after {
  content: '✦';
  margin: 0 15px;
  font-size: 0.6em;
  vertical-align: middle;
  color: #8b0000;
}
```

## 装饰元素 — 哥特花纹分隔

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  gap: 12px;
  color: #8b7335;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  max-width: 180px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #8b7335, transparent);
}

/* 中间蔷薇符号 ✠ ❧ ♰ */
.divider-icon {
  font-size: 1.2rem;
  color: #8b0000;
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: linear-gradient(180deg, #8b0000, #5c0000);
  color: #e8e0d4;
  border: 1px solid #a01010;
  padding: 14px 36px;
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.btn-primary:hover {
  background: linear-gradient(180deg, #a01010, #6c0000);
  box-shadow: 0 0 20px rgba(139,0,0,0.3), inset 0 0 20px rgba(139,0,0,0.1);
}

/* 角饰 */
.btn-primary::before,
.btn-primary::after {
  content: '✦';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 6px;
  color: #8b7335;
}

.btn-primary::before { left: 10px; }
.btn-primary::after { right: 10px; }
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  border: 1px solid #8b7335;
  color: #8b7335;
  padding: 14px 36px;
  font-family: 'Cinzel', serif;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #e8e0d4;
  color: #e8e0d4;
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
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: linear-gradient(135deg, #120808, #0a0a0a);
  border: 1px solid #8b7335;
  padding: 44px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 0 60px rgba(139,0,0,0.1);
}

/* 哥特尖拱顶部装饰 */
.modal-content::before {
  content: '♰';
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  color: #8b0000;
  background: #0a0a0a;
  padding: 0 15px;
}

/* 内框装饰 */
.modal-content::after {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(139,115,53,0.2);
  pointer-events: none;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 18px;
  color: #8b0000;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  font-family: 'Cinzel', serif;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #e8e0d4;
}
```

## 卡片样式

```css
.card {
  background: rgba(18, 8, 8, 0.8);
  border: 1px solid rgba(139,115,53,0.2);
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
}

.card:hover {
  border-color: rgba(139,0,0,0.4);
  box-shadow: 0 0 30px rgba(139,0,0,0.08);
}

/* 角落蔷薇 */
.card::before {
  content: '❧';
  position: absolute;
  top: 8px;
  right: 12px;
  color: rgba(139,0,0,0.3);
  font-size: 1rem;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 14px 40px;
  background: rgba(10, 10, 10, 0.95);
  border-bottom: 1px solid rgba(139,115,53,0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'UnifrakturMaguntia', cursive;
  color: #e8e0d4;
  font-size: 1.4rem;
}

.nav-link {
  color: #b0a8a0;
  text-decoration: none;
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #8b0000;
}
```

## 表单输入框

```css
.input-field {
  background: rgba(10,10,10,0.8);
  border: 1px solid rgba(139,115,53,0.3);
  color: #b0a8a0;
  padding: 12px 16px;
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #8b0000;
  box-shadow: 0 0 10px rgba(139,0,0,0.15);
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #8b0000; }
```

## 动画效果

### 蜡烛摇曳

```css
@keyframes candleFlicker {
  0%, 100% { opacity: 0.9; filter: brightness(1); }
  25% { opacity: 0.85; filter: brightness(0.95); }
  50% { opacity: 1; filter: brightness(1.05); }
  75% { opacity: 0.88; filter: brightness(0.98); }
}
```

### 缓慢浮现

```css
@keyframes fadeRise {
  from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.reveal {
  animation: fadeRise 1.5s ease-out;
}
```

### 血滴粒子（极少量，不要过度）

```css
@keyframes bloodDrip {
  0% { top: -10px; opacity: 1; }
  100% { top: 100vh; opacity: 0; }
}
```

## 设计注意事项

1. 色调极度克制，大面积使用深黑，血红仅用于极少量关键点缀
2. 哥特黑体字母 (Fraktur) 只用于大标题，正文必须用高可读性衬线体
3. 装饰符号选用 ✦ ♰ ❧ ✠ ☽ 等哥特/宗教相关符号
4. 避免任何"可爱"或"活泼"的元素——一切都要沉稳、庄严、略带阴郁
5. 动画要极其缓慢和微妙，像烛火而非烟花
6. 可适当使用花体/手抄本风格的装饰线
7. 如果使用图片，加上暗色滤镜和暗角处理

## 向用户展示的风格描述

> 🖤 **暗黑哥特风格**
>
> 你的页面将笼罩在哥特式大教堂般的庄严阴郁之中。深不见底的黑色背景上，血红与暗金的装饰如同烛光下的古老手抄本。哥特花体的标题、蔷薇纹饰的分隔、十字架符号的点缀——一切都散发着暗黑浪漫的气息。
>
> 🎨 默认配色：深渊黑底 + 血红点缀 + 暗金装饰
> 🔘 按钮风格：深红渐变 + 金色角饰 + 罗马碑文字
> 💫 特效：蜡烛摇曳光影、缓慢浮现、哥特花纹装饰
