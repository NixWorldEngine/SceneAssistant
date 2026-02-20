# ⚔️ 武侠风格 (Wuxia)

## 风格概述

水墨山水间，侠客仗剑行。中国传统水墨画的写意美学与江湖武侠的豪迈气概相融合。大面积留白如宣纸铺展，墨色浓淡勾勒意境，朱红点缀画龙点睛。恍如翻开一卷古老的武林秘笈。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 宣纸白 | `#f5f0e8` |
| 背景辅色 | 淡墨灰 | `#e8e0d4` |
| 主强调色 | 朱砂红 | `#c0392b` |
| 副强调色 | 浓墨黑 | `#1a1a1a` |
| 第三强调色 | 古铜棕 | `#8b6914` |
| 正文文字 | 墨灰 | `#3a3a3a` |
| 标题文字 | 浓墨 | `#1a1a1a` |
| 点缀色 | 黛青 | `#2c5f6e` |

## 字体方案

- 标题字体：`"ZCOOL XiaoWei"` 或 `"Ma Shan Zheng"`（Google Fonts）— 毛笔书法风
- 正文字体：`"Noto Serif SC"`（Google Fonts）— 宋体风格
- 英文/数字：`"Noto Serif", serif`
- 备用：`"SimSun", "STSong", serif`

## 背景设计

- 宣纸纹理底色（CSS模拟）
- 可选：水墨山水意境背景（CSS渐变模拟远山）
- 页面边缘可加卷轴/装裱效果

```css
body {
  background-color: #f5f0e8;
  background-image:
    radial-gradient(ellipse at 20% 80%, rgba(200,190,170,0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(180,170,150,0.15) 0%, transparent 50%);
  color: #3a3a3a;
  font-family: 'Noto Serif SC', 'SimSun', serif;
  line-height: 1.9;
}

/* 远山意境 — 页面顶部装饰 */
.mountain-bg {
  position: relative;
  overflow: hidden;
}

.mountain-bg::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background:
    /* 远山 */
    radial-gradient(ellipse at 30% 100%, rgba(100,100,90,0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 100%, rgba(80,80,70,0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 50% 100%, rgba(60,60,55,0.08) 0%, transparent 70%);
  pointer-events: none;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Ma Shan Zheng', 'ZCOOL XiaoWei', cursive;
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 400;
  color: #1a1a1a;
  text-align: center;
  letter-spacing: 0.15em;
  position: relative;
}

/* 朱砂印章装饰 */
.seal {
  display: inline-block;
  border: 2px solid #c0392b;
  color: #c0392b;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-family: 'Ma Shan Zheng', cursive;
  transform: rotate(-5deg);
  line-height: 1.2;
  letter-spacing: 0.1em;
}

.section-title {
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: clamp(1.3rem, 3vw, 2rem);
  color: #1a1a1a;
  text-align: center;
  letter-spacing: 0.1em;
  position: relative;
  display: inline-block;
}

.section-title::before,
.section-title::after {
  content: '——';
  color: #c0392b;
  margin: 0 12px;
  font-weight: 300;
}
```

## 按钮样式

### 主按钮 — 朱砂卷轴风格

```css
.btn-primary {
  background: #c0392b;
  color: #f5f0e8;
  border: none;
  padding: 12px 36px;
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.btn-primary::before,
.btn-primary::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 120%;
  background: #a02e22;
  border-radius: 3px;
}

.btn-primary::before { left: -3px; }
.btn-primary::after { right: -3px; }

.btn-primary:hover {
  background: #a02e22;
  box-shadow: 0 4px 15px rgba(192, 57, 43, 0.3);
  transform: translateY(-1px);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #3a3a3a;
  border: 1px solid #3a3a3a;
  padding: 12px 36px;
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  color: #c0392b;
  border-color: #c0392b;
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
  background: rgba(26, 26, 26, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #f5f0e8;
  border: 1px solid #c0b090;
  padding: 48px 40px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 8px 8px 0 rgba(0,0,0,0.06);
}

/* 四角装饰 */
.modal-content::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  border: 1px solid rgba(192, 57, 43, 0.2);
  pointer-events: none;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  color: #3a3a3a;
  font-size: 1.2rem;
  cursor: pointer;
  background: none;
  border: none;
  font-family: 'Noto Serif SC', serif;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #c0392b;
}
```

## 卡片样式

```css
.card {
  background: rgba(245, 240, 232, 0.8);
  border: 1px solid #d4c9b5;
  padding: 32px;
  position: relative;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 4px 4px 0 rgba(0,0,0,0.05);
  transform: translate(-2px, -2px);
}

/* 角落装饰纹 */
.card::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  width: 20px;
  height: 20px;
  border-top: 2px solid #c0392b;
  border-left: 2px solid #c0392b;
}

.card::after {
  content: '';
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-bottom: 2px solid #c0392b;
  border-right: 2px solid #c0392b;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 16px 40px;
  background: rgba(245, 240, 232, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #d4c9b5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.nav-link {
  color: #3a3a3a;
  text-decoration: none;
  font-family: 'ZCOOL XiaoWei', serif;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #c0392b;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #c0392b;
  border-radius: 50%;
  transform: translateX(-50%) scale(0);
  transition: transform 0.3s;
}

.nav-link:hover::after {
  transform: translateX(-50%) scale(1);
}
```

## 表单输入框样式

```css
.input-field {
  background: rgba(255,255,255,0.5);
  border: none;
  border-bottom: 1px solid #c0b090;
  color: #3a3a3a;
  padding: 12px 8px;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-bottom-color: #c0392b;
  border-bottom-width: 2px;
}
```

## 分隔线

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  gap: 20px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  max-width: 200px;
  background: linear-gradient(90deg, transparent, #c0b090, transparent);
}

/* 中间可放置古风符号如 ❖ 或 ◆ */
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f5f0e8;
}

::-webkit-scrollbar-thumb {
  background: #c0b090;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #c0392b;
}
```

## 动画效果

### 水墨晕染效果

```css
@keyframes inkSpread {
  0% { opacity: 0; filter: blur(20px); transform: scale(0.8); }
  100% { opacity: 1; filter: blur(0); transform: scale(1); }
}

.ink-reveal {
  animation: inkSpread 1.2s ease-out;
}
```

### 云雾飘动

```css
@keyframes cloudDrift {
  0%, 100% { transform: translateX(0); opacity: 0.3; }
  50% { transform: translateX(30px); opacity: 0.15; }
}

.cloud {
  position: absolute;
  width: 200px;
  height: 60px;
  background: radial-gradient(ellipse, rgba(200,190,170,0.3), transparent);
  border-radius: 50%;
  animation: cloudDrift 15s ease-in-out infinite;
}
```

## 特殊元素

### 竖排文字（可选）

```css
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 0.3em;
  font-family: 'Ma Shan Zheng', cursive;
  color: #1a1a1a;
}
```

### 印章组件

```css
.stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 2px solid #c0392b;
  color: #c0392b;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1rem;
  transform: rotate(-8deg);
  line-height: 1.2;
  text-align: center;
  border-radius: 4px;
}
```

## 设计注意事项

1. 留白是水墨美学的灵魂，不要填满页面
2. 避免使用过于现代的UI元素（大圆角、毛玻璃等），保持古朴感
3. 装饰线条要有毛笔运笔的感觉（粗细变化）
4. 朱砂红只用于点睛之笔，不要大面积使用
5. 中文字体必须优先使用书法或宋体风格
6. 布局可以适当打破常规网格，模仿传统卷轴的错落美
7. 如果需要图片，使用CSS滤镜（grayscale + sepia）模拟水墨效果

## 向用户展示的风格描述

> ⚔️ **武侠风格**
>
> 你的页面会像一幅展开的水墨画卷。宣纸白的底色上，浓淡相宜的墨色文字讲述你的故事，朱砂红的点缀如同印章般画龙点睛。远山隐约、云雾缭绕，整个页面透着一股"大漠孤烟直，长河落日圆"的江湖气韵。
>
> 🎨 默认配色：宣纸白底 + 浓墨黑字 + 朱砂红点缀
> 🔘 按钮风格：卷轴造型 + 朱砂底色 + 古朴方正
> 💫 特效：水墨晕染、云雾飘动、竖排书法文字
