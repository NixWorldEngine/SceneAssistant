# 🐉 西幻风格 (Western Fantasy)

## 风格概述

中世纪城堡、魔法符文、龙与骑士、精灵与矮人。灵感来源于《指环王》《龙与地下城》《巫师》。石质纹理、古老羊皮纸、哥特式花纹、烛火照亮的地下城。一个充满魔法与史诗的奇幻世界。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 深石灰 | `#1c1c24` |
| 背景辅色 | 暗紫灰 | `#252030` |
| 主强调色 | 魔法金 | `#d4a847` |
| 副强调色 | 神秘紫 | `#7c3aed` |
| 第三强调色 | 龙焰橙 | `#e86833` |
| 正文文字 | 旧羊皮纸色 | `#c8b99a` |
| 标题文字 | 亮金 | `#e8c84a` |
| 链接/符文 | 魔法蓝 | `#4aa3df` |

## 字体方案

- 标题字体：`MedievalSharp` 或 `Uncial Antiqua`（Google Fonts）— 中世纪手抄本风格
- 正文字体：`Crimson Text` 或 `EB Garamond`（Google Fonts）
- 符文/装饰：`Noto Sans Symbols`
- 中文回退：`"Noto Serif SC", "SimSun", serif`

## 背景设计

- 深色石质纹理（CSS渐变模拟）
- 可选：微弱的烛光/篝火光影动画
- 边缘暗角效果

```css
body {
  background-color: #1c1c24;
  background-image:
    radial-gradient(ellipse at 30% 20%, rgba(212,168,71,0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(124,58,237,0.03) 0%, transparent 50%);
  color: #c8b99a;
  font-family: 'Crimson Text', 'Noto Serif SC', serif;
  line-height: 1.8;
}

/* 石质纹理覆盖 */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'MedievalSharp', cursive;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  color: #e8c84a;
  text-align: center;
  text-shadow: 0 0 20px rgba(212,168,71,0.3), 0 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 0.05em;
}

.section-title {
  font-family: 'MedievalSharp', cursive;
  font-size: clamp(1.3rem, 3vw, 2rem);
  color: #d4a847;
  text-align: center;
  position: relative;
  display: inline-block;
}

/* 两侧剑形装饰 */
.section-title::before {
  content: '⚔';
  margin-right: 15px;
  font-size: 0.8em;
}

.section-title::after {
  content: '⚔';
  margin-left: 15px;
  font-size: 0.8em;
}
```

## 装饰分隔线

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
  height: 1px;
  max-width: 200px;
  background: linear-gradient(90deg, transparent, #d4a847, transparent);
}

.divider-icon {
  color: #d4a847;
  font-size: 1.3rem;
}
```

## 按钮样式

### 主按钮 — 魔法石板风格

```css
.btn-primary {
  background: linear-gradient(180deg, #3a3344 0%, #252030 100%);
  border: 2px solid #d4a847;
  color: #e8c84a;
  padding: 14px 36px;
  font-family: 'MedievalSharp', cursive;
  font-size: 1rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

/* 角落符文装饰 */
.btn-primary::before {
  content: '◆';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
  color: #d4a847;
}

.btn-primary:hover {
  box-shadow: 0 0 20px rgba(212,168,71,0.25), inset 0 0 20px rgba(212,168,71,0.05);
  border-color: #e8c84a;
  text-shadow: 0 0 8px rgba(212,168,71,0.5);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  border: 1px solid rgba(200,185,154,0.4);
  color: #c8b99a;
  padding: 14px 36px;
  font-family: 'MedievalSharp', cursive;
  font-size: 1rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #7c3aed;
  color: #a78bfa;
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.15);
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
  background: rgba(10, 10, 15, 0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: linear-gradient(135deg, #252030, #1c1c24);
  border: 2px solid #d4a847;
  padding: 44px;
  max-width: 520px;
  width: 90%;
  position: relative;
  box-shadow: 0 0 40px rgba(212,168,71,0.1);
}

/* 四角金属钉装饰 */
.modal-content::before,
.modal-content::after {
  font-size: 10px;
  color: #d4a847;
  position: absolute;
}

.modal-content::before {
  content: '◈           ◈';
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
}

.modal-content::after {
  content: '◈           ◈';
  bottom: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 18px;
  color: #c8b99a;
  font-size: 1.3rem;
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #e86833;
}
```

## 卡片样式

```css
.card {
  background: linear-gradient(135deg, rgba(37,32,48,0.9), rgba(28,28,36,0.9));
  border: 1px solid rgba(212,168,71,0.2);
  padding: 28px;
  position: relative;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(212,168,71,0.5);
  box-shadow: 0 0 20px rgba(212,168,71,0.08);
  transform: translateY(-3px);
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #d4a847, transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.card:hover::before {
  opacity: 1;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 14px 40px;
  background: rgba(28, 28, 36, 0.95);
  border-bottom: 1px solid rgba(212,168,71,0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-family: 'MedievalSharp', cursive;
  color: #e8c84a;
  font-size: 1.3rem;
}

.nav-link {
  color: #c8b99a;
  text-decoration: none;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #d4a847;
}
```

## 表单输入框样式

```css
.input-field {
  background: rgba(37, 32, 48, 0.6);
  border: 1px solid rgba(200,185,154,0.3);
  color: #c8b99a;
  padding: 12px 16px;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  width: 100%;
  transition: all 0.3s;
  outline: none;
}

.input-field:focus {
  border-color: #d4a847;
  box-shadow: 0 0 10px rgba(212,168,71,0.1);
}
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1c1c24;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #d4a847, #8b6914);
  border-radius: 4px;
}
```

## 动画效果

### 烛火摇曳光影

```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
  75% { opacity: 0.95; }
}

.torch-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212,168,71,0.06), transparent 70%);
  pointer-events: none;
  animation: flicker 3s ease-in-out infinite;
}
```

### 魔法粒子浮动

```css
@keyframes magicFloat {
  0% { opacity: 0; transform: translateY(20px) scale(0); }
  50% { opacity: 1; }
  100% { opacity: 0; transform: translateY(-40px) scale(1); }
}

.magic-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #d4a847;
  border-radius: 50%;
  box-shadow: 0 0 6px #d4a847;
  animation: magicFloat 2s ease-in-out infinite;
}
```

### 符文发光

```css
@keyframes runeGlow {
  0%, 100% { text-shadow: 0 0 5px rgba(124,58,237,0.3); }
  50% { text-shadow: 0 0 15px rgba(124,58,237,0.6), 0 0 30px rgba(124,58,237,0.3); }
}

.rune {
  animation: runeGlow 3s ease-in-out infinite;
  color: #a78bfa;
}
```

## 设计注意事项

1. 用深色调营造地下城/城堡内部的氛围
2. 金色装饰要有"手工镶嵌"的古老质感，避免过于光滑现代
3. 可使用符号装饰：⚔️🛡️🐉🏰⚜️✦◈◆♦
4. 文字排版模拟古老书卷感，字间距适当加大
5. 光影效果要像烛火或魔法光源，不要用现代均匀光
6. 卡片和容器可以有"石板"质感
7. 适当使用紫色系作为"魔法"元素的代表色

## 向用户展示的风格描述

> 🐉 **西幻风格**
>
> 你的页面将带你走进中世纪的魔法世界。深邃的暗色背景如同城堡内殿，金色的标题和装饰线散发着古老符文的光芒，卡片像一块块神秘的石板。微弱的烛火光影在角落跳动，魔法粒子缓缓升起。
>
> 🎨 默认配色：深石灰底 + 魔法金强调 + 神秘紫点缀
> 🔘 按钮风格：石板造型 + 金色边框 + 符文装饰
> 💫 特效：烛火摇曳、魔法粒子、符文发光
