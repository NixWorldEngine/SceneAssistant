# 👾 8-Bit 像素风格 (8-Bit Pixel)

## 风格概述

回到FC红白机和GameBoy的黄金时代。有限的调色板、锯齿状的像素边缘、8-bit电子音乐的回响。一切都由方块构成——没有圆角、没有渐变、只有纯粹的像素之美。致敬《超级马里奥》《塞尔达》《洛克人》的经典时代。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 暗夜蓝 | `#1a1c2c` |
| 背景辅色 | 深靛 | `#262b44` |
| 主强调色 | 像素绿 | `#38b764` |
| 副强调色 | 像素蓝 | `#3b5dc9` |
| 第三强调色 | 像素红 | `#b13e53` |
| 正文文字 | 亮灰 | `#a7a8bd` |
| 标题文字 | 像素白 | `#f4f4f4` |
| 点缀色1 | 像素黄 | `#f7d15c` |
| 点缀色2 | 像素橙 | `#ef7d57` |

> 此配色参考经典的 PICO-8 调色板，极具复古游戏感

## 字体方案

- 全局字体：`"Press Start 2P"`（Google Fonts）— 经典像素字体
- 中文回退：`"Noto Sans SC", sans-serif`（中文没有像素字体，但可以用小字号+粗体模拟方块感）
- 备用像素字体：`"VT323"`（Google Fonts）— 更易读的像素风格

**重要**：`Press Start 2P` 字号偏小且行高大，正文建议用 `VT323`，标题用 `Press Start 2P`

## 背景设计

- 纯色或简单像素图案（使用CSS重复渐变模拟像素网格）
- 可选：星空效果（像素风闪烁的星星）

```css
body {
  background-color: #1a1c2c;
  /* 像素网格纹理 */
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 4px 4px;
  color: #a7a8bd;
  font-family: 'VT323', 'Noto Sans SC', monospace;
  font-size: 18px;
  line-height: 1.6;
  image-rendering: pixelated;
}
```

## 核心设计原则 —— 像素感

所有元素都不使用圆角、不使用阴影渐变。使用 `box-shadow` 模拟像素边框：

```css
/* 像素边框基础样式 */
.pixel-border {
  border: 4px solid;
  box-shadow:
    /* 外部像素角 */
    -4px -4px 0 0 currentColor,
    4px -4px 0 0 currentColor,
    -4px 4px 0 0 currentColor,
    4px 4px 0 0 currentColor;
}

/* 通用像素投影 */
.pixel-shadow {
  box-shadow: 4px 4px 0 #0d0f1a;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(1.2rem, 3.5vw, 2.5rem);
  color: #f4f4f4;
  text-align: center;
  text-shadow: 4px 4px 0 #0d0f1a;
  line-height: 1.6;
}

.section-title {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  color: #f7d15c;
  text-shadow: 2px 2px 0 #0d0f1a;
  text-align: center;
  line-height: 1.6;
}

/* 像素下划线 */
.section-title::after {
  content: '';
  display: block;
  margin: 12px auto 0;
  width: 60%;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    #f7d15c 0px, #f7d15c 8px,
    transparent 8px, transparent 12px
  );
}
```

## 按钮样式

### 主按钮 — RPG菜单按钮

```css
.btn-primary {
  background: #3b5dc9;
  color: #f4f4f4;
  border: 4px solid #f4f4f4;
  padding: 12px 24px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  position: relative;
  transition: none;
  box-shadow:
    -4px -4px 0 0 #f4f4f4,
    4px -4px 0 0 #f4f4f4,
    -4px 4px 0 0 #f4f4f4,
    4px 4px 0 0 #f4f4f4,
    8px 8px 0 0 #0d0f1a;
  image-rendering: pixelated;
  line-height: 1.5;
}

.btn-primary:hover {
  background: #38b764;
}

.btn-primary:active {
  box-shadow:
    -4px -4px 0 0 #f4f4f4,
    4px -4px 0 0 #f4f4f4,
    -4px 4px 0 0 #f4f4f4,
    4px 4px 0 0 #f4f4f4;
  transform: translate(4px, 4px);
}

/* 选择光标 — RPG菜单箭头 */
.btn-primary::before {
  content: '▶';
  margin-right: 8px;
  font-size: 0.6rem;
  opacity: 0;
  transition: none;
}

.btn-primary:hover::before {
  opacity: 1;
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #a7a8bd;
  border: 4px solid #a7a8bd;
  padding: 12px 24px;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  box-shadow:
    -4px -4px 0 0 #a7a8bd,
    4px -4px 0 0 #a7a8bd,
    -4px 4px 0 0 #a7a8bd,
    4px 4px 0 0 #a7a8bd;
  line-height: 1.5;
}

.btn-secondary:hover {
  color: #f7d15c;
  border-color: #f7d15c;
  box-shadow:
    -4px -4px 0 0 #f7d15c,
    4px -4px 0 0 #f7d15c,
    -4px 4px 0 0 #f7d15c,
    4px 4px 0 0 #f7d15c;
}
```

## Modal / 弹窗样式 — RPG对话框

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 15, 26, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #262b44;
  border: 4px solid #f4f4f4;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow:
    -4px -4px 0 0 #f4f4f4,
    4px -4px 0 0 #f4f4f4,
    -4px 4px 0 0 #f4f4f4,
    4px 4px 0 0 #f4f4f4,
    8px 8px 0 0 #0d0f1a;
}

.modal-content .modal-text {
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #f4f4f4;
}

/* 打字机效果文字（可选JS实现） */
.typewriter {
  overflow: hidden;
  border-right: 4px solid #f4f4f4;
  white-space: nowrap;
  animation: typing 2s steps(30) forwards, blink 0.8s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

.modal-close {
  position: absolute;
  top: 8px;
  right: 12px;
  color: #b13e53;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  background: none;
  border: none;
}
```

## 卡片样式

```css
.card {
  background: #262b44;
  border: 4px solid #5d5f7a;
  padding: 24px;
  position: relative;
  box-shadow:
    -4px -4px 0 0 #5d5f7a,
    4px -4px 0 0 #5d5f7a,
    -4px 4px 0 0 #5d5f7a,
    4px 4px 0 0 #5d5f7a,
    8px 8px 0 0 #0d0f1a;
}

.card:hover {
  border-color: #38b764;
  box-shadow:
    -4px -4px 0 0 #38b764,
    4px -4px 0 0 #38b764,
    -4px 4px 0 0 #38b764,
    4px 4px 0 0 #38b764,
    8px 8px 0 0 #0d0f1a;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 12px 24px;
  background: #1a1c2c;
  border-bottom: 4px solid #5d5f7a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'Press Start 2P', monospace;
  color: #38b764;
  font-size: 0.8rem;
}

.nav-link {
  color: #a7a8bd;
  text-decoration: none;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6rem;
  transition: none;
  line-height: 1.5;
}

.nav-link:hover {
  color: #f7d15c;
}

/* hover时显示RPG选择箭头 */
.nav-link:hover::before {
  content: '▶ ';
  color: #f7d15c;
}
```

## 表单输入框样式

```css
.input-field {
  background: #0d0f1a;
  border: 4px solid #5d5f7a;
  color: #f4f4f4;
  padding: 10px 12px;
  font-family: 'VT323', monospace;
  font-size: 1.1rem;
  width: 100%;
  outline: none;
}

.input-field:focus {
  border-color: #38b764;
  box-shadow:
    -4px -4px 0 0 #38b764,
    4px -4px 0 0 #38b764,
    -4px 4px 0 0 #38b764,
    4px 4px 0 0 #38b764;
}
```

## 分隔线

```css
.divider {
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    #5d5f7a 0px, #5d5f7a 8px,
    transparent 8px, transparent 16px
  );
  margin: 40px 0;
  border: none;
}
```

## 血条 / 进度条

```css
.health-bar {
  background: #0d0f1a;
  border: 4px solid #f4f4f4;
  height: 24px;
  width: 100%;
  position: relative;
  box-shadow:
    -4px -4px 0 0 #f4f4f4,
    4px -4px 0 0 #f4f4f4,
    -4px 4px 0 0 #f4f4f4,
    4px 4px 0 0 #f4f4f4;
}

.health-bar-fill {
  background: #38b764;
  height: 100%;
  transition: width 0.5s steps(10);
}

.health-bar-fill.warning {
  background: #f7d15c;
}

.health-bar-fill.danger {
  background: #b13e53;
}
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #1a1c2c;
  border-left: 4px solid #5d5f7a;
}

::-webkit-scrollbar-thumb {
  background: #5d5f7a;
}
```

## 动画效果

### 像素闪烁

```css
@keyframes pixelBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.blink {
  animation: pixelBlink 1s steps(1) infinite;
}
```

### 弹出动画（RPG风格，无缓动）

```css
@keyframes popIn {
  0% { transform: scale(0); }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.pop-in {
  animation: popIn 0.3s steps(5) forwards;
}
```

### 星空闪烁背景（可选）

```javascript
function createStar() {
  const star = document.createElement('div');
  star.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: #f4f4f4;
    top: ${Math.random() * 100}vh;
    left: ${Math.random() * 100}vw;
    pointer-events: none;
    z-index: -1;
    animation: pixelBlink ${1 + Math.random() * 3}s steps(1) infinite ${Math.random() * 2}s;
  `;
  document.body.appendChild(star);
}
for (let i = 0; i < 50; i++) createStar();
```

## 设计注意事项

1. **绝对不使用圆角 (border-radius)**——这是像素风格的核心原则
2. **不使用渐变阴影**，只用像素级box-shadow
3. **过渡动画使用 `steps()` 而非平滑缓动**，保持像素跳跃感
4. `image-rendering: pixelated` 确保所有图像保持像素清晰
5. 像素字体行高需要特别注意，`Press Start 2P` 需要较大的 line-height
6. 颜色数量保持克制，模拟有限调色板（建议不超过16色）
7. 所有尺寸尽量是4的倍数，模拟像素对齐
8. 可以使用emoji或Unicode符号模拟像素图标：♥ ★ ▶ ■ ● ◆

## 向用户展示的风格描述

> 👾 **8-Bit 像素风格**
>
> 你的页面将致敬经典红白机时代！方方正正的像素边框、复古游戏字体、有限但鲜明的调色板。按钮像RPG游戏里的菜单选项，弹窗像NPC的对话框，甚至还有闪烁的星空背景。按下按钮的瞬间，仿佛听到了"哔——"的8-bit音效。
>
> 🎨 默认配色：暗夜蓝底 + 像素绿强调 + 像素黄/红/蓝点缀（PICO-8调色板）
> 🔘 按钮风格：方正像素边框 + RPG菜单箭头 + 按压回弹
> 💫 特效：像素闪烁、打字机文字、星空背景
