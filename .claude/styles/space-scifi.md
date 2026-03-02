# 🚀 太空科幻风格 (Space Sci-Fi)

## 风格概述

浩瀚星海、行星环绕、太空站的控制台、全息投影的星图。这不是赛博朋克的地下城，而是仰望星空的壮阔与敬畏。灵感来源于《星际穿越》《质量效应》《太空歌剧》。冷色调的宇宙深空中，温暖的星光和引擎橙光成为点缀。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 深空黑 | `#05080f` |
| 背景辅色 | 星云蓝 | `#0a1628` |
| 主强调色 | 引擎橙 | `#e8762a` |
| 副强调色 | 全息蓝 | `#4aa8d8` |
| 第三强调色 | 星光白 | `#e0e8f0` |
| 正文文字 | 冷灰 | `#9aa8b8` |
| 标题文字 | 亮银 | `#d8e0e8` |
| 点缀色 | 星云紫 | `#6a4dbd` |

## 字体方案

- 标题字体：`Exo 2` 或 `Chakra Petch`（Google Fonts）
- 正文字体：`Inter` 或 `Source Sans 3`（Google Fonts）
- 数据/HUD字体：`JetBrains Mono` 或 `Space Mono`
- 中文回退：`"Noto Sans SC", sans-serif`

## 背景设计

```css
body {
  background-color: #05080f;
  color: #9aa8b8;
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
  line-height: 1.7;
}

/* 星空背景 */
.starfield {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* 星云渐变 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(106,77,189,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 30%, rgba(74,168,216,0.06) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 80%, rgba(232,118,42,0.04) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
```

### 星星生成（JS）

```javascript
function createStars() {
  const container = document.querySelector('.starfield');
  for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    const size = Math.random() < 0.9 ? 1 : 2;
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: #ffffff;
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${0.3 + Math.random() * 0.7};
      animation: twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s;
    `;
    container.appendChild(star);
  }
}

window.addEventListener('DOMContentLoaded', createStars);
```

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Exo 2', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  color: #d8e0e8;
  text-align: center;
  letter-spacing: -0.02em;
  text-shadow: 0 0 40px rgba(74,168,216,0.15);
}

.section-title {
  font-family: 'Exo 2', sans-serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 700;
  color: #d8e0e8;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* HUD标签样式 */
.hud-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #4aa8d8;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0.7;
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: linear-gradient(135deg, #e8762a, #c45d1a);
  color: #ffffff;
  border: none;
  padding: 14px 36px;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(232,118,42,0.3);
}

.btn-primary:hover {
  box-shadow: 0 6px 25px rgba(232,118,42,0.45);
  transform: translateY(-2px);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #4aa8d8;
  border: 1.5px solid #4aa8d8;
  padding: 14px 36px;
  font-family: 'Exo 2', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(74,168,216,0.1);
  box-shadow: 0 0 15px rgba(74,168,216,0.15);
}
```

## Modal / 弹窗样式 — 太空站控制台

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 8, 15, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: linear-gradient(135deg, #0d1520, #0a1628);
  border: 1px solid rgba(74,168,216,0.25);
  border-radius: 12px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 0 50px rgba(74,168,216,0.08);
}

/* HUD角标 */
.modal-content::before {
  content: 'COMM LINK';
  position: absolute;
  top: -10px;
  left: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #4aa8d8;
  background: #0a1628;
  padding: 2px 10px;
  letter-spacing: 0.15em;
  border: 1px solid rgba(74,168,216,0.3);
  border-radius: 3px;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(232,118,42,0.15);
  border: 1px solid rgba(232,118,42,0.3);
  color: #e8762a;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(232,118,42,0.25);
}
```

## 卡片样式

```css
.card {
  background: rgba(10, 22, 40, 0.6);
  border: 1px solid rgba(74,168,216,0.15);
  border-radius: 10px;
  padding: 28px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(74,168,216,0.35);
  box-shadow: 0 8px 30px rgba(74,168,216,0.08);
  transform: translateY(-3px);
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 14px 36px;
  background: rgba(5, 8, 15, 0.85);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(74,168,216,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Exo 2', sans-serif;
  font-weight: 800;
  color: #d8e0e8;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
}

.nav-link {
  color: #9aa8b8;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #e8762a;
}
```

## 表单输入框

```css
.input-field {
  background: rgba(10,22,40,0.5);
  border: 1px solid rgba(74,168,216,0.2);
  color: #d8e0e8;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  border-radius: 8px;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #4aa8d8;
  box-shadow: 0 0 0 3px rgba(74,168,216,0.1);
}
```

## 特殊组件

### HUD数据面板

```css
.hud-panel {
  background: rgba(10,22,40,0.7);
  border: 1px solid rgba(74,168,216,0.2);
  border-radius: 8px;
  padding: 20px;
  font-family: 'JetBrains Mono', monospace;
}

.hud-stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(74,168,216,0.08);
}

.hud-stat-label {
  color: #4aa8d8;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hud-stat-value {
  color: #d8e0e8;
  font-size: 0.9rem;
}
```

## 分隔线

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(74,168,216,0.3), transparent);
  margin: 50px 0;
  border: none;
}
```

## 滚动条

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #05080f; }
::-webkit-scrollbar-thumb { background: #264e70; border-radius: 3px; }
```

## 动画效果

### 流星划过（可选）

```css
@keyframes shootingStar {
  0% { transform: translateX(0) translateY(0); opacity: 1; }
  100% { transform: translateX(300px) translateY(200px); opacity: 0; }
}

.shooting-star {
  position: fixed;
  width: 2px;
  height: 2px;
  background: #ffffff;
  box-shadow: 0 0 4px #ffffff, -20px -10px 0 transparent;
  animation: shootingStar 1s ease-out forwards;
}
```

### 脉冲呼吸环

```css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74,168,216,0.3); }
  50% { box-shadow: 0 0 0 15px rgba(74,168,216,0); }
}

.pulse-ring {
  animation: pulse 2s ease-in-out infinite;
}
```

### 轨道旋转

```css
@keyframes orbit {
  from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
}

.orbiting {
  animation: orbit 20s linear infinite;
}
```

## 设计注意事项

1. 背景是核心——星空必须有层次感（远处暗淡小点、近处明亮大点）
2. 星云渐变要非常微弱，不要让背景太花
3. 区别于赛博朋克：太空是壮阔而非颓废，色调偏冷但有温暖点缀（引擎橙）
4. HUD元素（数据面板、标签）可以增强科幻感
5. 适当使用等宽字体显示数据、坐标等信息
6. 动画要缓慢、庄严——像行星轨道而非快闪
7. 适合用于：科技公司、个人作品集、数据展示

## 向用户展示的风格描述

> 🚀 **太空科幻风格**
>
> 你的页面将带你遨游星际！深邃的宇宙黑底上布满闪烁的星星，微弱的星云光芒在远处浮动。温暖的引擎橙色标记着重要的操作入口，全息蓝的数据面板展示着飞船般的科技感。偶尔一颗流星划过——壮阔而宁静。
>
> 🎨 默认配色：深空黑底 + 引擎橙强调 + 全息蓝数据
> 🔘 按钮风格：橙色渐变 + 柔和圆角 + 光晕阴影
> 💫 特效：闪烁星空、流星划过、脉冲呼吸环
