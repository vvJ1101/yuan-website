# YUAN SHOWROOM Development Guidance

## Typography

- 修改字体、字号或新增文字层级前，先查阅 `docs/typography.md`，复用现有字体及语义变量。
- 字体标准变化必须同步更新该文档；不要为窄栏标题随意套用大章节字号，也不要顺带重构无关页面。

## POP-UP EVENTS detail standard

- 后续活动详情沿用已确认的 HELEN KAMINSKI 页面（`/en/pop-up-events/sample-showroom-edit`）及 `EventArticle` 模板，不重新设计布局。
- 内容与图片集中在 `src/data/event-stories.ts`，替换标题、引言、章节和图片即可；保留官网字体、1200px 图片容器、65ch 阅读段落、900px / 640px 断点及现有组图节奏。
- 不恢复固定右侧信息栏，不嵌入公众号；图片优先用独立原图，临时截图窗口在原图到位后替换。发布前核实文案、日期、场地与署名，预览内容继续明确标注。

## Verification policy

- Match verification effort to the risk and scope of the current change.
- Treat CSS, spacing, typography, static copy, and image adjustments as low-risk changes unless they alter interaction, routing, data, or build configuration.
- During development, low-risk changes should use only directly relevant checks. Do not run a production build until preparing a deployment or when compilation behavior is part of the change.
- Do not add source-regex or implementation-detail tests for purely visual adjustments unless they protect a specific, previously reproduced regression.
- For component logic changes, run relevant tests, ESLint for the affected scope, and TypeScript validation when types or component contracts changed.
- For routing, shared data structures, dependencies, Next.js configuration, security headers, or deployment scripts, run `npm run check` before completion.
- Use `npm run check:fast` for low-risk production releases and `npm run check` for high-risk releases.
- Do not repeat a check when the relevant code and configuration have not changed since that check passed.
- Keep successful command output concise. Report a summary for passing checks and include only actionable output for failures.
- Do not inspect, load, or invoke skills that are unrelated to the current request. Use a skill only when it directly applies or the user explicitly requests it.

## Deployment safety

- Every production deployment must still create a production build, upload into an independent staging location, preserve a rollback copy, perform local and public health checks, and automatically restore the previous release on failure.
- Never use the fast path for dependency, routing, data-model, security, infrastructure, or deployment changes.
- Never modify the `yuan-academy` application, process, port, files, data, or Nginx configuration while deploying this website.
