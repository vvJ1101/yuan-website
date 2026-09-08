---
name: YUAN SHOWROOM
description: A restrained bilingual editorial system for fashion, showroom services, and seasonal stories.
colors:
  paper: "#ffffff"
  ink: "#0a0a0a"
  muted-ink: "#686868"
  soft-surface: "#f2f2ee"
  warm-surface: "#f8f4f2"
  dark-stage: "#11110f"
  warm-light: "#eee9dc"
  hairline: "#c8c8c3"
typography:
  display:
    fontFamily: "Song Myung, Noto Serif SC Variable, Songti SC, STSong, serif"
    fontSize: "clamp(36px, 3.1vw, 56px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "0.005em"
  title:
    fontFamily: "Castoro, Noto Serif SC Variable, Songti SC, STSong, serif"
    fontSize: "clamp(24px, 2.1vw, 36px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Castoro, Noto Serif SC Variable, Songti SC, STSong, serif"
    fontSize: "clamp(14px, 0.9vw, 16px)"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "-0.008em"
  label:
    fontFamily: "Work Sans Variable, Noto Sans SC Variable, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(10px, 0.66vw, 12px)"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.1em"
rounded:
  square: "0"
  micro: "3px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "clamp(56px, 6vw, 100px)"
  gutter: "clamp(32px, 4vw, 68px)"
components:
  navigation-link:
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "0 0 5px"
  editorial-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "8px 0"
---

# Design System: YUAN SHOWROOM

## Overview

**Creative North Star: “The Editorial Showroom”**

YUAN SHOWROOM 的视觉系统以时装编辑画册和真实展厅为共同参照：黑白为主、图片承担叙事、文字保持克制，空间关系比装饰更重要。页面应让品牌、服装、空间与现场服务成为主角，界面本身退居辅助层。

本规范记录截至 2026-09-08 已确认的前端设计，作为当前阶段的暂时定稿。后续新增页面优先复用现有语义字号、留白、导航、图片容器和响应式行为；只有用户明确提出重新设计时，才替换这一视觉世界。

**Key Characteristics:**

- 双语编辑感，而非通用电商模板
- 以真实图片和留白建立层级
- 黑白主色、少量内容相关的局部色彩
- 直角、细线、低装饰、清晰交互状态
- 中英文结构稳定，但字距和字体回退分别优化

## Colors

主界面使用纸白与近黑，灰色用于次要信息；暖白和深黑仅服务于明确的内容场景。

- **Paper** (`#ffffff`)：默认页面和弹层背景。
- **Ink** (`#0a0a0a`)：正文、标题、焦点轮廓与主要线条。
- **Muted Ink** (`#686868`)：辅助信息；正常字号文字不得使用更浅且不达标的灰色。
- **Soft Surface** (`#f2f2ee`)：On-site 等相邻内容区的轻微分层。
- **Warm Surface** (`#f8f4f2`)：Lookbook 编辑画册背景。
- **Dark Stage / Warm Light** (`#11110f` / `#eee9dc`)：POP-UP EVENTS 的电影感舞台。
- **Hairline** (`#c8c8c3`)：区块分隔线，避免用卡片阴影替代结构。

**The Restraint Rule.** 颜色来自品牌图片或特定叙事场景，不为“丰富页面”额外加入通用强调色。

## Typography

**Display Font:** Song Myung，中文回退 Noto Serif SC。
**Editorial Font:** Castoro，中文回退 Noto Serif SC。
**Functional Font:** Work Sans，中文回退 Noto Sans SC。

衬线体负责页面标题和编辑性阅读，无衬线体负责导航、数据、分类、年份和操作。品牌名与固定英文内容保持其原文，不通过系统粗体制造视觉权威。

### Hierarchy

- **Page title**：`clamp(36px, 3.1vw, 56px)`，400 / 1.04；只用于页面级标题。
- **Section title**：`clamp(28px, 2.5vw, 44px)`；用于主要章节。
- **Project title**：`clamp(24px, 2.1vw, 36px)`；用于服务名、项目名和详情标题，不与页面标题同级。
- **Body**：`clamp(14px, 0.9vw, 16px)`，行高 1.68；阅读宽度通常不超过 65ch。
- **Supporting body**：`clamp(11px, 0.74vw, 13px)`；用于事实、列表和图片说明。
- **Caption / label**：`clamp(10px, 0.66vw, 12px)`；只用于短标签、编号和元数据，不替代正文。
- **Navigation**：12px / 500；手机为 11px，触控目标至少 44px。

英文大写标签可使用 0.06–0.14em 字距；中文标签通常收紧到 0.06em，禁止直接照搬宽松英文 tracking。

## Layout

全站以 `--ys-gutter: clamp(32px, 4vw, 68px)` 控制水平边距，以 8 / 12 / 16 / 24 / 32px 形成局部节奏，大章节通常使用 `clamp(56px, 6vw, 100px)` 分隔。相关内容靠近，不相关章节通过明显留白或 1px 细线分开。

- **Desktop（901px+）**：允许双栏、非对称画册和固定一屏体验，但正文不可因压缩至 8px 来换取“一屏”。
- **Tablet（641–900px）**：优先两栏或横向可浏览结构，同时满足触控目标；不得仅按桌面等比缩小。
- **Mobile（≤640px）**：主要内容单栏重排，长标题自然换行，画册缩略图可横向浏览。
- 中英文切换不得改变核心模块高度、滚动位置或阅读路径；内容差异通过合理换行和固定布局轨道吸收。

## Elevation & Depth

系统默认保持扁平。层级主要由留白、尺寸、图片比例、背景色和细线建立。阴影只用于悬浮图片、画册焦点图或全屏查看器等确实脱离页面平面的内容，不用于普通卡片装饰。

## Shapes

页面、按钮、图片框和弹层以直角为主。圆形仅用于轮播圆点、状态点和具有明确含义的小型标记；不得把内容统一装进圆角卡片。边框通常为 1px，图片裁切遵循素材与页面叙事，不使用任意几何遮罩。

## Components

### Navigation

黑底白字、居中主导航、当前项使用细下划线。桌面保持低调密度，平板和手机保证 44px 触控高度；语言切换独立但与主导航共享字体体系。

### Editorial links and controls

操作以文字链接、细下划线和明确 focus ring 为主。可点击区域可以大于视觉标记；hover 不得是唯一可发现状态。

### Media and cards

图片优先使用真实比例和项目既有 `MediaFrame`。品牌封面本身已有 Logo 时不叠加品牌名。卡片不依赖阴影或圆角分组，而由图文邻近、比例和间距建立关系。

### Signature surfaces

- **NOW**：一屏事件入口，预览图主导，文字为次级导航。
- **BRANDS**：首屏两行封面，继续滚动展示其余品牌。
- **LOOKBOOK**：画册舞台与缩略索引并存，中央人物不被标题遮挡。
- **ON-SITE**：现场配套服务，不与跨界联动混用；桌面首屏完整展示两个服务。
- **POP-UP EVENTS**：深色电影感索引；详情沿用已确认的 HELEN KAMINSKI 编辑模板。
- **COLLABORATIONS**：图片预览与标题同步轮播，标题和图片均可进入详情，自动切换为 3 秒。

## Do's and Don'ts

### Do

- **Do** 先判断文字角色，再选择语义字号变量。
- **Do** 在中文、英文、桌面、平板和手机上共同检查真实内容。
- **Do** 让图片完整表达品牌内容，使用留白和比例建立画册感。
- **Do** 为 reduced-motion、键盘焦点和触控输入保留可用路径。

### Don't

- **Don't** 为了塞进固定一屏，把正文或关键标签缩到 10px 以下。
- **Don't** 给图片重复叠加素材中已有的品牌 Logo 或名称。
- **Don't** 用大面积遮罩、厚边框、圆角卡片或装饰阴影替代排版。
- **Don't** 在未更新本文件和 `docs/typography.md` 的情况下新增字体、字号层级或断点体系。
- **Don't** 修改既有 POP 详情模板、双语路由和核心交互，除非用户明确提出。
