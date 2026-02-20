# 🌿 自然森系风格 (Nature Forest)

## 风格概述

清晨的阳光穿过树叶缝隙洒落斑驳光影，溪水潺潺、鸟鸣啾啾。大地色系的温暖拥抱、手工纸张的质朴触感、植物插画的自然装点。这是一个让人深呼吸、感受大自然治愈力量的宁静空间。灵感来源于北欧自然美学、植物图鉴、手作杂货铺。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 亚麻白 | `#faf6f0` |
| 背景辅色 | 浅苔绿 | `#eef2e9` |
| 主强调色 | 森林绿 | `#2d6a4f` |
| 副强调色 | 泥土棕 | `#8b6f47` |
| 第三强调色 | 浆果红 | `#a44a3f` |
| 正文文字 | 树干棕 | `#4a3f35` |
| 标题文字 | 深林绿 | `#1b4332` |
| 点缀色 | 暖阳黄 | `#d4a843` |

## 字体方案

- 标题字体：`Playfair Display` 或 `Lora`（Google Fonts）— 优雅衬线体
- 正文字体：`Source Sans 3` 或 `Nunito`（Google Fonts）
- 手写装饰：`Caveat` 或 `Kalam`（Google Fonts）
- 中文回退：`"Noto Serif SC", "Noto Sans SC", sans-serif`

## 背景设计

```css
body {
  background-color: #faf6f0;
  color: #4a3f35;
  font-family: 'Source Sans 3', 'Noto Sans SC', sans-serif;
  line-height: 1.8;
}

/* 纸张纹理效果 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

section:nth-child(even) {
  background: #eef2e9;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #1b4332;
  text-align: center;
  position: relative;
}

/* 叶子装饰 */
.hero-title::before {
  content: '🌿';
  display: block;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 600;
  color: #2d6a4f;
}

/* 手写注释风格小标题 */
.handwritten {
  font-family: 'Caveat', cursive;
  font-size: 1.3rem;
  color: #8b6f47;
  transform: rotate(-2deg);
  display: inline-block;
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: #2d6a4f;
  color: #faf6f0;
  border: none;
  padding: 12px 32px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #1b4332;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(45,106,79,0.25);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #2d6a4f;
  border: 1.5px solid #2d6a4f;
  padding: 12px 32px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(45,106,79,0.08);
}
```

### 叶形按钮（特殊装饰按钮）

```css
.btn-leaf {
  background: #2d6a4f;
  color: #faf6f0;
  border: none;
  padding: 12px 36px;
  font-family: 'Source Sans 3', sans-serif;
  border-radius: 30px 8px 30px 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-leaf:hover {
  border-radius: 8px 30px 8px 30px;
  background: #1b4332;
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
  background: rgba(74,63,53,0.4);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #faf6f0;
  border-radius: 12px;
  padding: 40px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(74,63,53,0.15);
  position: relative;
  border: 1px solid rgba(139,111,71,0.15);
}

.modal-content::before {
  content: '🍃';
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.8rem;
  background: #faf6f0;
  padding: 0 8px;
  border-radius: 50%;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 16px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eef2e9;
  border: none;
  color: #4a3f35;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #dde4d5;
}
```

## 卡片样式

```css
.card {
  background: #ffffff;
  border: 1px solid rgba(139,111,71,0.12);
  border-radius: 10px;
  padding: 28px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(74,63,53,0.06);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(74,63,53,0.1);
  border-color: rgba(45,106,79,0.2);
}

/* 植物图标 */
.card-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 14px 36px;
  background: rgba(250,246,240,0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139,111,71,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #1b4332;
}

.nav-link {
  color: #4a3f35;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #2d6a4f;
}
```

## 表单输入框

```css
.input-field {
  background: #ffffff;
  border: 1.5px solid rgba(139,111,71,0.2);
  color: #4a3f35;
  padding: 12px 16px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  border-radius: 8px;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #2d6a4f;
  box-shadow: 0 0 0 3px rgba(45,106,79,0.1);
}
```

## 分隔线

```css
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  gap: 15px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  max-width: 150px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c0b090, transparent);
}

/* 中间小叶子 🌿 */
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #faf6f0; }
::-webkit-scrollbar-thumb { background: #b5c4a8; border-radius: 3px; }
```

## 动画效果

### 树叶飘落（可选）

```javascript
function createLeaf() {
  const leaf = document.createElement('div');
  const leaves = ['🍃', '🌿', '🍂', '🍀'];
  leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
  leaf.style.cssText = `
    position: fixed;
    top: -30px;
    left: ${Math.random() * 100}vw;
    font-size: ${14 + Math.random() * 12}px;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.5;
    animation: leafFall ${6 + Math.random() * 6}s linear forwards;
  `;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 12000);
}
setInterval(createLeaf, 2000);
```

```css
@keyframes leafFall {
  0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 0.5; }
  25% { transform: translateY(25vh) rotate(90deg) translateX(30px); }
  50% { transform: translateY(50vh) rotate(180deg) translateX(-20px); }
  75% { transform: translateY(75vh) rotate(270deg) translateX(25px); }
  100% { transform: translateY(100vh) rotate(360deg) translateX(-10px); opacity: 0; }
}
```

### 光斑闪烁

```css
@keyframes sunspot {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}
```

## 设计注意事项

1. 整体色调温暖自然，避免任何冰冷的科技色彩
2. 大地色系为主（棕、绿、米白），浆果红仅用于少量强调
3. 植物emoji是很好的装饰元素：🌿🍃🍂🌱🌸🍀🌾
4. 手写字体可以用于小标签/注释，增添手作感
5. 圆角适中（6-12px），不过于圆润也不完全方正
6. 整体节奏要舒缓，留白充足，给人"深呼吸"的感觉
7. 图片可加暖色滤镜增强自然感

## 向用户展示的风格描述

> 🌿 **自然森系风格**
>
> 你的页面会像清晨的森林小径一样令人放松。温暖的亚麻色背景如同手工纸张的触感，森林绿的标题和按钮带来自然的生命力，偶尔飘落的树叶动画让整个页面充满生气。一切都很舒适、自然、治愈。
>
> 🎨 默认配色：亚麻白底 + 森林绿强调 + 大地棕点缀
> 🔘 按钮风格：柔和圆角 + 自然绿 + 叶形特殊按钮
> 💫 特效：树叶飘落、光斑闪烁、手写注释装饰
