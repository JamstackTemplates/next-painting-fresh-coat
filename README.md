# Brushstroke & Co. Painters (`next-painting-fresh-coat`)

A self-contained Next.js static website for **Brushstroke & Co. Painters**, a fictitious Edinburgh
painting and decorating firm created as a Jamstacks gallery template. Every business name, phone
number (`0131 496 0742`, Ofcom Edinburgh drama range), email (`hello@brushstrokeandco.example`),
and project is sample data ready to replace with real details.

Local development requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Asymmetric hero with interactive swatch fan & room art, services strip, 4-step process, featured projects, seasonal colour deck, service area & phone hours, closing CTA, and `HousePainter` JSON-LD |
| `/services/` | Interior, exterior and commercial service dockets with guide prices, sticky swatch tabs, what's always included, and how pricing works |
| `/projects/` | Filterable project gallery (`?category=`) drawn as paint-chip cards with bespoke scene vignettes and a linked "The colours we used" chip wall |
| `/contact/` | Hosted Jamstacks quote-visit enquiry form when configured, visible email fallback when unconfigured, phone hours table, "Useful to include" checklist, and service area |
| `/404.html` | Custom "This wall's still bare." static error page with swatch-chip recovery links |

## Make it yours

Edit page-specific prose and headings directly in each route's `app/**/page.tsx` file, and edit
shared or structured data in `content/`:

| File | Owns |
| --- | --- |
| `content/business.ts` | Business name, tagline, email, phone, `Europe/London` time zone, `phoneHours`, `serviceArea`, `leadTime` (blank hides the Home tape note) and Contact enquiry copy |
| `content/colours.ts` | House swatch library (`BC-###` codes, true hexes, families, notes and the 6 `seasonal` flags) |
| `content/services.ts` | Interior, exterior and commercial services, `fromPrice` whole-pound GBP guide prices, `typicalDays`, `includes` and swatch references |
| `content/projects.ts` | Completed projects, areas (validated against `serviceArea`), scenes, 1–3 swatch colour IDs, days, summaries and the 3 `featured` flags |
| `content/process.ts` | Ordered four-step decorating process shown on Home |
| `app/page.tsx`, `app/services/page.tsx`, `app/projects/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Page composition and owner-editable headings, introductions and calls to action |
| `site.config.json` | Public site name, description, demo domain, `timeZone` and Jamstacks integration (`siteId`, `cdnUrl`) |
| `app/tailwind.input.css` | "Eggshell" light and "Lights off in the empty room" dark colour tokens, dust-sheet & masking-tape styles, font mappings and print rules |
| `components/art/` | Inline SVG artwork: `HeroRoom`, `SceneVignette` (6 scenes), `ProcessArt`, `NotFoundArt`, `SwatchChip`, `MiniSwatchFan`, `TapeRule`, `BrushstrokeDivider`, `CutInEdge`, `Wordmark` and 10 decorator icons |
| `lib/structured-data.ts` | `HousePainter` schema.org JSON-LD derived from `content/business.ts` |
| `app/sitemap.ts` | Static sitemap entries (`/`, `/services/`, `/projects/`, `/contact/`) |

### Common owner edits

- **Update lead time:** Edit `leadTime` in `content/business.ts`. Leave it as `''` to hide the masking-tape note on Home.
- **Adjust guide prices:** Edit `fromPrice` (whole GBP) in `content/services.ts`. Both Home and `/services/` update automatically.
- **Add a project:** Append a project entry to `content/projects.ts` using valid colour IDs from `content/colours.ts` and an area from `business.serviceArea`. It appears on `/projects/` and its colours are added to "The colours we used".
- **Change featured projects or seasonal colours:** Toggle `featured` in `content/projects.ts` (keep exactly 3) or `seasonal` in `content/colours.ts` (keep exactly 6). Run `npm test` to verify all references.

## Typography and licences

All fonts are self-hosted via npm under the **SIL Open Font License 1.1 (OFL-1.1)**:

- **Instrument Serif** (`@fontsource/instrument-serif`, regular & italic) — display headings, wordmark and swatch names
- **Schibsted Grotesk** (`@fontsource-variable/schibsted-grotesk`) — body copy and UI
- **Spline Sans Mono** (`@fontsource-variable/spline-sans-mono`) — swatch codes (`BC-###`), guide prices, phone hours and eyebrows

## Public configuration

```json
{
  "name": "Brushstroke & Co. Painters",
  "description": "Brushstroke & Co. Painters: interior, exterior and commercial painting across Edinburgh and the Lothians. Careful prep, clean lines, tidy sites. Ask for a quote visit.",
  "domain": "next-painting-fresh-coat.jamstacks.net",
  "timeZone": "Europe/London",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

Replace `domain` with your own hostname when publishing a customer site. Do not add business data
or credentials to `site.config.json`.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear
only on `/contact/` when `siteId` is configured. Without a site ID, `/contact/` shows the email
fallback with no embed request. Public email (`hello@brushstrokeandco.example`) and phone number
remain visible in either mode. Navigation to and from `/contact/` uses full-document loads via
`SiteLink`. All wording treats quote visits and start dates as enquiries, never confirmed bookings.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Publishing assets

`jamstacks/` is removable gallery-only source metadata. Customer builds, tests and GitHub Pages
never read it. To refresh gallery captures and validate the manifest:

```sh
npm run build
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template . --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Remove `plan/` and `.claude/skills/` after review before publishing.
