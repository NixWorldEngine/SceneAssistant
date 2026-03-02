# ✨ 现代简约风格 (Modern Minimal)

## 风格概述

少即是多。大量留白、克制的配色、精确的排版、微妙的阴影。灵感来源于苹果官网、无印良品、北欧设计。每一个像素都有其存在的理由，多余的装饰一概去除。

## 默认配色方案

| 用途 | 颜色 | 色值 |
|------|------|------|
| 背景主色 | 纯白 | `#ffffff` |
| 背景辅色 | 极浅灰 | `#f8f9fa` |
| 主强调色 | 深黑 | `#111111` |
| 副强调色 | 品牌蓝 | `#2563eb` |
| 第三强调色 | 中灰 | `#6b7280` |
| 正文文字 | 深灰 | `#374151` |
| 标题文字 | 纯黑 | `#111111` |
| 边框/分隔 | 浅灰 | `#e5e7eb` |

## 字体方案

- 标题字体：`Inter` 或 `Plus Jakarta Sans`（Google Fonts）— 现代无衬线
- 正文字体：`Inter`（Google Fonts）
- 中文回退：`"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif`

## 背景设计

- 纯白或极浅灰，没有任何纹理和图案
- 用大面积留白划分内容区域
- 可选：极微弱的渐变色块作为区域背景

```css
body {
  background: #ffffff;
  color: #374151;
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

section:nth-child(even) {
  background: #f8f9fa;
}
```

## 标题样式

```css
.hero-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  color: #111111;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #111111;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  font-weight: 400;
  max-width: 600px;
}
```

## 按钮样式

### 主按钮

```css
.btn-primary {
  background: #111111;
  color: #ffffff;
  border: none;
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #333333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 次要按钮

```css
.btn-secondary {
  background: transparent;
  color: #111111;
  border: 1.5px solid #e5e7eb;
  padding: 12px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: #111111;
  background: #f8f9fa;
}
```

### 文字按钮

```css
.btn-text {
  background: none;
  border: none;
  color: #2563eb;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 0;
  position: relative;
}

.btn-text::after {
  content: ' →';
  transition: transform 0.2s;
  display: inline-block;
}

.btn-text:hover::after {
  transform: translateX(4px);
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
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  max-width: 480px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #e5e7eb;
  color: #111111;
}
```

## 卡片样式

```css
.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 28px;
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: transparent;
}
```

## 导航栏样式

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 16px 40px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

.nav-brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #111111;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #111111;
}
```

## 表单输入框样式

```css
.input-field {
  background: #ffffff;
  border: 1.5px solid #e5e7eb;
  color: #374151;
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  width: 100%;
  border-radius: 8px;
  transition: all 0.2s;
  outline: none;
}

.input-field:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-field::placeholder {
  color: #9ca3af;
}

label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
  display: block;
}
```

## 分隔线

```css
.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 60px 0;
  border: none;
}
```

## 滚动条

```css
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}
```

## 布局原则

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section {
  padding: 80px 0;
}

@media (min-width: 768px) {
  .section {
    padding: 120px 0;
  }
}
```

## 动画效果

### 滚动渐入

```css
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

配合少量JS实现：

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

## 设计注意事项

1. 留白是最重要的设计元素，不要填满每一寸空间
2. 颜色使用极度克制，主要靠黑白灰层次，强调色仅点缀
3. 字号对比要大：大标题非常大，正文保持舒适阅读大小
4. 字重对比要强：标题800/700，正文400
5. 所有圆角统一使用8px或12px，保持一致性
6. 动画要微妙，持续时间0.2-0.3s，避免华丽效果
7. 图片使用圆角，可加极淡的阴影
8. 一切视觉噪音都要消除

## 向用户展示的风格描述

> ✨ **现代简约风格**
>
> 你的页面将呈现苹果官网般的高级感。干净的白色背景，大量的留白让内容自由呼吸，黑色标题醒目而克制，整体散发着"少即是多"的优雅气质。
>
> 🎨 默认配色：纯白底色 + 纯黑标题 + 极少量蓝色点缀
> 🔘 按钮风格：圆角矩形 + 细腻阴影 + 丝滑过渡
> 💫 特效：滚动渐入、微妙悬浮、极简过渡动画
