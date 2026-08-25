# YUAN SHOWROOM Website

YUAN SHOWROOM 对外官方网站，基于 Next.js、React、TypeScript 与 Tailwind CSS 构建。当前版本采用中英双语、多页面的时装编辑式体验，面向品牌方、买手及行业合作伙伴公开展示。

## 当前版本（2026-08-25）

- 全局导航：`BRANDS / ABOUT / NOW / ON-SITE / RECAP`。
- 顶部采用黑底白字、白色品牌标识与细灰分隔线；当前页面带下划线状态。
- 首页为横向自动移动的视觉画廊，支持滚轮交互、实时位置与时间信息，并尊重系统的“减少动态效果”设置。
- BRANDS 公开展示品牌分类、品牌图片矩阵与独立品牌详情页。
- ABOUT 展示公司定位、业务说明、关键数据与内部品牌手册式阅读页。
- NOW 包含当季活动入口、部分 Lookbook、订货会导览与预约入口。
- ON-SITE 展示现场服务内容；RECAP 用于长期沉淀历季订货会档案。
- 中文使用无前缀公开路径，英文使用 `/en`；系统保存用户语言选择并在页面切换时保持当前栏目。
- 桌面端保持完整导航；移动端不使用汉堡菜单，并避免横向溢出。

当前 UI 的完成度、自评及下一阶段建议见 [UI 设计审查（2026-08-25）](docs/UI-REVIEW-2026-08-25.md)。

## 本地开发

```bash
npm install
npm run dev
```

常用校验命令：

```bash
npm run check
```

`check` 会依次运行契约测试、ESLint、TypeScript 类型检查和生产构建。

## 内容约定

- 品牌名单对外完整公开展示。
- Lookbook 仅展示部分款式，不提供完整订货资料，也不设置登录功能。
- 导览图与 Aano Caffe 内容归入订货会现场内容，不作为独立全局导航。
- 订货会现场素材仅用于公开回顾；百度网盘是只读素材来源，不在本项目中反向编辑网盘内容。
- 买手与买手店是公司合作对象，不描述为用户通过其接入公司的“合作渠道”。

## 数据安全

订货政策属于内部业务数据，不得存放在本项目的 `public/` 或任何可被官网直接访问的路径中。

政策数据、上传模板和管理功能统一由 `yuan-academy` 的登录鉴权接口提供。官网仓库不保存政策 JSON、备份文件或 Excel 模板。

以下内容只保留在本地或对应内部系统，不提交 Git，也不进入官网部署包：

- `.env*`、API 密钥、SSH 密钥、服务器凭据；
- 订货政策原始数据、内部模板、客户隐私数据；
- 百度网盘同步目录、临时下载包及本地备份文件。

## 生产环境

- 官网域名：`https://yuanshowroom.cn` 与 `https://www.yuanshowroom.cn`。
- 应用目录：`/var/www/yuan-website`。
- PM2 进程：`yuan-website`，本地端口 `3002`。
- 部署仅更新官网应用，不修改 `yuan-academy` 的文件、端口、进程或 Nginx 配置。
- 发布前必须运行 `npm run check` 并执行敏感信息扫描；发布后检查中文首页、英文首页、关键栏目与 HTTPS 状态。

## 相关文档

- [合作买手文案设计](docs/superpowers/specs/2026-07-16-buyer-partners-copy-design.md)
- [合作买手文案实施计划](docs/superpowers/plans/2026-07-16-buyer-partners-copy.md)
- [新版官网视觉规格](docs/superpowers/specs/2026-08-20-showroom-website-restoration-design.md)
- [新版官网实施计划](docs/superpowers/plans/2026-08-20-showroom-website-restoration.md)
- [UI 设计审查（2026-08-25）](docs/UI-REVIEW-2026-08-25.md)
