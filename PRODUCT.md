# YUAN SHOWROOM Product Context

## Product

YUAN SHOWROOM is the public bilingual website of a fashion brand-management and showroom business operating across Shenzhen, Hong Kong, Shanghai Fashion Week, and the wider Chinese market.

## Primary audiences

- Independent and international designer brands evaluating representation, wholesale development, marketing, retail, or strategic cooperation.
- Fashion buyers and retail partners discovering represented brands, seasonal lookbooks, ordering events, and showroom activity.
- Industry and creative partners reviewing YUAN SHOWROOM's positioning, spaces, services, and past seasons.

## Primary jobs

- Understand the YUAN SHOWROOM identity and market position quickly.
- Discover represented brands and enter their public brand rooms.
- Review current seasonal activity, appointment information, on-site services, and recaps.
- Move between Chinese and English without losing the current page context.

## Product position

YUAN SHOWROOM connects creative direction, market development, wholesale operations, marketing, retail, and strategic support for designer brands entering or growing in China.

## Platform and stack

- Public responsive web application.
- Next.js App Router, React, TypeScript, and Tailwind CSS with project-level global editorial styles.
- Chinese pages use clean paths without a locale prefix; English pages use `/en`.
- Production runs as the `yuan-website` PM2 process on port `3002`.

## Durable constraints

- Preserve the existing public routes, primary navigation labels, bilingual routing, brand content, accessibility behavior, metadata, and analytics-relevant links unless the user explicitly changes them.
- Use only public, authorized fashion and showroom assets already stored in the website project unless the user supplies or approves new assets.
- Public pages must not expose Academy data, ordering policies, internal templates, customer information, credentials, or private source material.
- The website deployment must not modify the `yuan-academy` application, files, process, port, data, or Nginx configuration.
- Motion-heavy experiences must provide reduced-motion and non-WebGL fallbacks and remain usable on desktop, tablet, and mobile browsers.

## Brand commitments

- The official name is `YUAN SHOWROOM`, with `YUANSHOWROOM` retained as a searchable no-space alias where appropriate.
- The existing logo assets, monochrome editorial palette, type system, and sharp-corner visual language are authoritative unless the user explicitly requests a redesign.
- The homepage cover sentence is English in both language versions: `Connecting creativity, markets and the world.`
