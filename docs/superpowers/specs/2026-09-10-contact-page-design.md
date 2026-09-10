# YUAN SHOWROOM Contact Page Design

## Goal

Add a bilingual CONTACT section that matches the current YUAN SHOWROOM editorial system and works as a single-screen contact directory plus inquiry form on desktop and landscape iPad.

## Visual direction

- Keep the existing black site header, white page background, official logo, navigation typography, and sharp-corner system.
- Use an editorial split layout: approximately 38% contact directory and 62% inquiry form.
- Prefer whitespace, type weight, and alignment over rules. Keep only the main column divider, input baselines, and the top rule above the city strip.
- Do not use cards, rounded corners, shadows, gradients, or warm/off-white surfaces.
- Keep `CONTACT` in the main navigation in English for both locales.

## Contact directory

The left column contains three selectable contact types. Selection updates the form heading, recipient email, and inquiry type.

1. `BRAND PARTNERSHIPS` / `品牌合作` → `heshiya@yuanshowroom.vip`
2. `BUYING & SAMPLES` / `买手订货 / 样衣` → `elson@yuanshowroom.vip`
3. `PRESS & PROJECTS` / `媒体、活动与跨界合作` → `heshiya@yuanshowroom.vip`

Inactive choices are visually quieter; the active choice uses weight and contrast rather than a box or heavy rule.

## Inquiry form

Fields: name, brand/company, email, WeChat or phone (optional), inquiry type, message, and attachment (optional). The first release has no server-side form service: submitting opens the visitor's email client with the selected recipient, subject, and entered text. If a file was selected, the page tells the visitor to attach it in the email client because browsers cannot transfer a local file through a `mailto:` URL.

## Locations and WeChat

The bottom strip contains:

- `SHENZHEN — BY APPOINTMENT`
- `HONG KONG — BY APPOINTMENT`
- `WECHAT` with a neutral QR placeholder until the final QR asset is supplied.

No street address or door number is displayed.

## Responsive behavior

- Desktop and landscape iPad retain the split composition.
- At narrower tablet widths the directory receives slightly more width, contact emails may be hidden from the choices, and the form fields stack when necessary.
- Mobile stacks the directory, form, locations, and WeChat in document order; all controls remain accessible without hover.

## Acceptance

- `/contact` and `/en/contact` render correctly.
- The header marks CONTACT active and language switching preserves the route.
- Selecting any contact type updates the displayed email and form type.
- The page uses a pure white content background.
- Desktop and landscape iPad layouts have no overlap or horizontal clipping.

