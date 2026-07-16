# YUAN Website

YUAN 对外官方网站，基于 Next.js、React、TypeScript 与 Tailwind CSS 构建。

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

- 首页品牌区域使用“合作品牌与买手”作为标题。
- 买手及买手店名单使用 `buyers` 字段维护，并展示为“合作买手与买手店”。
- “渠道合作”服务内容描述业务能力，不代表名单中的买手是用户接入公司的合作渠道。

## 数据安全

订货政策属于内部业务数据，不得存放在本项目的 `public/` 或任何可被官网直接访问的路径中。

政策数据、上传模板和管理功能统一由 `yuan-academy` 的登录鉴权接口提供。官网仓库不保存政策 JSON、备份文件或 Excel 模板。

## 相关文档

- [合作买手文案设计](docs/superpowers/specs/2026-07-16-buyer-partners-copy-design.md)
- [合作买手文案实施计划](docs/superpowers/plans/2026-07-16-buyer-partners-copy.md)

