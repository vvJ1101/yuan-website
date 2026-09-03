# POP-UP EVENTS and COLLABORATIONS

## Changed files

- `src/app/[locale]/pop-up-events/page.tsx` — activity listing.
- `src/app/[locale]/pop-up-events/[slug]/page.tsx` — activity details.
- `src/app/[locale]/collaborations/page.tsx` — collaboration listing.
- `src/app/[locale]/collaborations/[slug]/page.tsx` — collaboration details.
- `src/components/showroom/editorial-projects.tsx` — shared listing and detail layout.
- `src/components/showroom/collaboration-contact.tsx` — WeChat QR dialog.
- `src/components/showroom/site-header.tsx` — two navigation entries.
- `src/app/globals.css` — editorial layouts and wrapping navigation.
- `src/data/editorial.ts` — replaceable bilingual sample records and contact config.
- `src/types/editorial.ts` — typed events, collaborations and images.
- `src/lib/editorial.ts` — filtering and featured selection.
- `src/lib/editorial-metadata.ts` — canonical links and sample indexing policy.
- `tests/editorial.test.mjs` — filtering, routing and data integrity checks.
- `docs/editorial-content.md` — content handoff and file inventory.

Work lives on `codex/editorial-sections`, isolated from the brand-book deployment.
Verification: `npm run check` passed (75 tests, lint, typecheck and production
build); browser checks covered desktop, 1024px tablet, 390px and 320px mobile,
category selection and detail links. Both locales returned 200 for valid routes;
unknown project slugs returned 404. Real QR scanning and dialog operation await
the actual contact image. These changes have not been deployed.

## Existing system

Next.js App Router with TypeScript content in `src/data`, types in `src/types`,
shared presentation in `src/components/showroom`. No new CMS or dependency.
Chinese public routes are unprefixed; English routes retain `/en`.

## Layout direction

Events use a lead event followed by compact dated rows with thumbnails; archives
remain separate. Collaborations use one work per row with the signature below
its image, alternating 86% / 72% widths on desktop and full width below 900px.
Both retain the existing image component, category URLs and font system.
Collaboration concept prose uses the body scale; generous spacing separates
image/text groups rather than enlarging every paragraph or repeating labels.

See `typography.md` for approved type roles. These layout refinements are local
until explicitly deployed.

## Editing content

Replace the explicitly labelled records in `src/data/editorial.ts`. Keep each slug
unique within its section. Titles and prose use the existing `{ cn, en }` shape.
Images contain `src`, bilingual `alt`, and an existing editorial aspect `ratio`;
they render through MediaFrame / Next Image. Galleries preserve the authored order.

Events include title, slug, city, venue, ISO startDate/endDate, status, coverImage,
gallery, description, participatingBrands and credits. Status is editorially
managed: CURRENT / UPCOMING / ARCHIVE. It is not inferred from the visitor's clock.

Collaborations include title, slug, partner, category, year, subtitle, coverImage,
gallery, concept, process, outcomes and credits. Category is FASHION / ART / DESIGN /
CULTURE. `process` supplies the requested behind-the-scenes text.

Both types support `featured` and `isSample`. The first featured record is used
as the lead; otherwise the first filtered record is used. Filters use URL query
parameters so refresh, direct links and browser Back work without client state.
ALL shows the complete collection, with event archives separated below the lead.

Set `collaborationContact` to `{ qrImage: '/images/…' }` after receiving the actual
public collaboration WeChat code. The native dialog supports Escape, focus
containment and restoration, a visible close action, and backdrop dismissal.
Do not substitute the ordering-event reservation code.

## Before publishing

- Supply real event dates, venues, prose, participating brands and image credits.
- Supply approved collaboration partners, concepts, process, outcomes and images.
- Replace sample records and set `isSample: false` only for approved real content.
- Sample detail pages and all-sample indexes are noindex; labels remain visible.
- Supply and scan-test the collaboration QR code.

An eventual CMS can return the same typed records without changing presentation.
# 2026-09-03 活动列表素材更新

## HELEN KAMINSKI 详情设计预览

**已确认的活动详情标准**：后续 POP-UP EVENTS 详情统一复用 `EventArticle` 与本页排版，按活动添加 `eventStories[slug]` 并替换内容和图片；不新建另一套详情设计。当前链接为 `/en/pop-up-events/sample-showroom-edit`。未整理正文的现有项目暂保持准备中，补齐内容时接入此模板。

南京章节最终使用用户明确指定的建筑外立面广告图 `helen-nanjing-building.webp`，不使用女模特／到访者照片。此次仍是设计预览，保留提示与 noindex。

后续素材更新：南京组图改用新提供的拼图素材，人物、成都空间与产品、匠人图片已换成独立照片；首屏横向建筑照仍使用早期参考图中的照片窗口，待提供对应横版原图后替换。未使用带播放按钮的截图。成都详情改为两张互补产品图，手机保持双列，不再连续铺三张竖图；收紧页头，长段落统一左对齐。图片标识保留原样。文案仍属于待审核预览。

- `src/data/event-stories.ts` 集中管理引言、章节文案、图片及结尾。当前只有 HELEN KAMINSKI 使用文章式布局；其他活动及合作详情不变。
- 原图尚未提供，四张完整截图转为 WebP 临时素材，通过页面图片窗口展示其中照片区域；截图本身未被剪裁或覆盖。`crop` 是临时显示窗口，换成正式照片时移除即可。正文是真实 HTML，不依赖截图文字。
- 临时文案依据参考图整理，中英文均为排版预览。页头明确提示预览，继续保留 noindex；日期与活动状态仍不作为正式数据发布。
- 图片容器上限 1200px；长段落上限 65ch。图片以横幅、双栏图文及组图交替，复用 MediaFrame 和现有字号变量，沿用 900px / 640px 断点，无固定侧栏。
- 上线正式内容前需替换截图素材、审核中英文文案、核实日期与地点及图片署名。

- 展示顺序：HELEN KAMINSKI I 中国首次匠心之旅、DATT | PRINCESS DIARY、NHOJ | KNOT。名称按用户提供原文保留。
- 四张用户提供图片保存为 `public/images/editorial/events/*.webp`；第一张为精选封面，第二张为 HELEN KAMINSKI 详情配图，其余为 DATT / NHOJ 封面。保留原始比例，不裁切海报 Logo。
- 日期、城市、场地、正文和状态尚未核实。日期和状态支持 `null`；未知状态仅出现在全部列表，不混入 CURRENT / UPCOMING / ARCHIVE。不得使用原示例日期代替真实资料。
- `contentPending` 表示资料整理中，详情提示且暂不索引；既有 sample 路径暂保留，避免破坏已有预览链接。后续正式文章上线再确定语义化路径及重定向。
- 来源仅供编辑核对，不在页面添加公众号跳转：DATT https://mp.weixin.qq.com/s/NMe5tWDJt77goM5iNue2KA；NHOJ https://mp.weixin.qq.com/s/TR-Ev_jy4H8NLhgAhKmXOw；HELEN KAMINSKI 使用用户提供的本地 HTML。
- 列表页采用集中页头、完整竖幅精选图和横向后续条目；继续使用现有字体变量、MediaFrame 和 900px / 640px 断点。资料补全后显示状态和日期；分类功能保持数据驱动。
