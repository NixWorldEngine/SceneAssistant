# 🌸 卡哇伊风格 (Kawaii)

## 风格概述

粉粉嫩嫩、圆润可爱、充满少女心的梦幻世界。柔和的粉彩色系、圆润的形状、可爱的装饰元素、欢快的动画。灵感来源于日系少女杂志、三丽鸥、原宿风格。让人看了心情变好的治愈系设计。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 奶白粉 | `#fff5f9` |
| 背景辅色 | 浅薰衣草 | `#f3eeff` |
| 主强调色 | 元气粉 | `#ff6b9d` |
| 副强调色 | 薰衣草紫 | `#c084fc` |
| 第三强调色 | 薄荷绿 | `#6ee7b7` |
| 正文文字 | 暖灰 | `#5a5268` |
| 标题文字 | 深粉 | `#d6336c` |
| 点缀色 | 柠檬黄 | `#fbbf24` |

## 字体方案

- 标题字体：`Quicksand` 或 `Nunito`（Google Fonts）— 圆润可爱
- 正文字体：`Nunito`（Google Fonts）
- 中文回退：`"Noto Sans SC", "Microsoft YaHei", sans-serif`

## 背景设计

- 柔和的粉彩渐变底色
- 可选：飘落的星星/爱心/花瓣粒子动画
- 可选：波浪形分区装饰

```css
body {
  background: linear-gradient(135deg, #fff5f9 0%, #f3eeff 50%, #fef3f2 100%);
  color: #5a5268;
  font-family: 'Nunito', 'Noto Sans SC', sans-serif;
  line-height: 1.7;
}

/* 波浪分区 */
.wave-divider {
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.wave-divider svg {
  width: 100%;
  height: 60px;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #d6336c;
  text-align: center;
  position: relative;
  display: inline-block;
}

.hero-title::before {
  content: '✿';
  position: absolute;
  top: -15px;
  left: -25px;
  font-size: 1.2rem;
  animation: twinkle 2s ease-in-out infinite;
}

.hero-title::after {
  content: '✿';
  position: absolute;
  bottom: -15px;
  right: -25px;
  font-size: 1.2rem;
  animation: twinkle 2s ease-in-out infinite 0.5s;
}

@keyframes twinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.section-title {
  font-family: 'Quicksand', sans-serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 700;
  color: #c084fc;
  text-align: center;
}
```

## 按钮样式

### 主按钮 — 糖果风格

```css
.btn-primary {
  background: linear-gradient(135deg, #ff6b9d, #c084fc);
  color: #ffffff;
  border: none;
  padding: 12px 32px;
  font-family: 'Quicksand', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.35);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(255, 107, 157, 0.5);
}

.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```

### 次要按钮

```css
.btn-secondary {
  background: rgba(255, 107, 157, 0.1);
  color: #ff6b9d;
  border: 2px solid #ff6b9d;
  padding: 12px 32px;
  font-family: 'Quicksand', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 107, 157, 0.2);
  transform: translateY(-2px);
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
  background: rgba(90, 82, 104, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #ffffff;
  border-radius: 24px;
  padding: 40px;
  max-width: 440px;
  width: 90%;
  box-shadow: 0 20px 50px rgba(214, 51, 108, 0.12);
  position: relative;
  border: 2px solid rgba(255, 107, 157, 0.2);
}

.modal-content::before {
  content: '🌸';
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  background: #ffffff;
  padding: 0 10px;
  border-radius: 50%;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff0f5;
  border: none;
  color: #ff6b9d;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #ffe0eb;
  transform: rotate(90deg);
}
```

## 卡片样式

```css
.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 28px;
  border: 2px solid rgba(192, 132, 252, 0.15);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(255, 107, 157, 0.12);
  border-color: rgba(255, 107, 157, 0.3);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 12px 32px;
  background: rgba(255, 245, 249, 0.85);
  backdrop-filter: blur(15px);
  border-bottom: 2px solid rgba(255, 107, 157, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #d6336c;
}

.nav-link {
  color: #5a5268;
  text-decoration: none;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.3s;
  padding: 4px 12px;
  border-radius: 20px;
}

.nav-link:hover {
  color: #ff6b9d;
  background: rgba(255, 107, 157, 0.08);
}
```

## 表单输入框样式

```css
.input-field {
  background: #ffffff;
  border: 2px solid rgba(192, 132, 252, 0.25);
  color: #5a5268;
  padding: 12px 18px;
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  border-radius: 14px;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #ff6b9d;
  box-shadow: 0 0 0 4px rgba(255, 107, 157, 0.1);
}

.input-field::placeholder {
  color: #bdb4c7;
}
```

## 分隔线

```css
.divider {
  height: 3px;
  background: linear-gradient(90deg, #ff6b9d, #c084fc, #6ee7b7, #fbbf24, #ff6b9d);
  background-size: 200% 100%;
  animation: rainbow 4s linear infinite;
  margin: 50px auto;
  width: 60%;
  max-width: 300px;
  border: none;
  border-radius: 2px;
}

@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #fff5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ff6b9d, #c084fc);
  border-radius: 4px;
}
```

## 动画效果

### 弹跳出现

```css
@keyframes bounceIn {
  0% { opacity: 0; transform: scale(0.3); }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}

.bounce-in {
  animation: bounceIn 0.6s ease-out;
}
```

### 浮动效果

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.floating {
  animation: float 3s ease-in-out infinite;
}
```

### 飘落爱心/星星粒子（可选，轻量JS实现）

```javascript
function createParticle() {
  const particle = document.createElement('div');
  const symbols = ['♥', '✦', '✿', '♡', '⋆'];
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.cssText = `
    position: fixed;
    top: -20px;
    left: ${Math.random() * 100}vw;
    font-size: ${12 + Math.random() * 14}px;
    color: ${['#ff6b9d', '#c084fc', '#fbbf24', '#6ee7b7'][Math.floor(Math.random() * 4)]};
    pointer-events: none;
    z-index: 9999;
    opacity: 0.6;
    animation: particleFall ${4 + Math.random() * 4}s linear forwards;
  `;
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 8000);
}
setInterval(createParticle, 800);
```

## 设计注意事项

1. 所有形状都要圆润——大圆角是核心，最小12px，最好16-24px
2. 配色保持柔和，避免高饱和度的刺眼颜色
3. 可以大方使用可爱的emoji作为装饰图标（🌸💖✨🎀⭐🍓🌈）
4. 阴影要柔和，使用粉色系阴影而非纯黑
5. 动画偏活泼欢快——弹跳、浮动、旋转
6. 文字保持友好温暖的口吻
7. 避免尖锐的直角和深沉的色彩

## 向用户展示的风格描述

> 🌸 **卡哇伊风格**
>
> 你的页面将充满甜美可爱的少女气息！柔和的粉色与薰衣草紫交织，圆润的按钮和卡片让人想要点击，还有小爱心和星星在空中飘落，整体就像走进了一个粉嫩的梦幻世界。
>
> 🎨 默认配色：柔粉底色 + 元气粉强调 + 薰衣草紫点缀
> 🔘 按钮风格：胶囊形圆角 + 糖果渐变 + 柔软阴影
> 💫 特效：飘落爱心粒子、弹跳出现、浮动动画
