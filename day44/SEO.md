# Mesob Eats: metadata and SEO (Day 44)

## Where each thing is set

| Set in | What | File |
|---|---|---|
| Root layout | `metadataBase`, title template `%s \| Mesob Eats`, default title, default description, site-wide Open Graph | `app/layout.js` |
| Root file convention | Default 1200 x 630 preview image | `app/opengraph-image.jsx` |
| Static pages | Own title, description, canonical | `/`, `/menu`, `/dishes` |
| Private pages | `robots: { index: false, follow: false }` | `/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/kitchen`, `/signin`, `/register` |
| Dish page | `generateMetadata` from the dish: name, price, description, canonical, Open Graph | `app/menu/[id]/page.js` |
| Dish page | `MenuItem` JSON-LD built from the same dish object the page renders | `app/menu/[id]/page.js` |
| Dish page | Generated preview image per dish (`ImageResponse`, 1200 x 630) | `app/menu/[id]/opengraph-image.jsx` |
| Landing page | `Restaurant` JSON-LD | `app/page.js` |
| Crawlers | Sitemap generated from the real dish list | `app/sitemap.js` |
| Crawlers | Robots rules and a pointer to the sitemap | `app/robots.js` |
| Site address | `SITE_URL` environment variable, read once | `lib/site.js` |

## Decisions and why

- **Title template in one place.** Each page supplies only its own part, so renaming the site changes every title at once.
- **Descriptions are written per page.** The dish description is generated from the dish and cut to 155 characters, so forty dishes do not share one sentence.
- **Open Graph is set on the pages that need their own URL.** A page that exports `openGraph` replaces the parent's object, it does not merge. Pages that do not set it inherit the root one, including its `url`.
- **JSON-LD matches the page.** Name, description and price come from the same `dish` object that renders the page. The JSON is escaped (`<` becomes `\u003c`) before it goes into the script tag.
- **Private routes are marked twice.** They are disallowed in `robots.js` and carry `noindex`. This is for search results only. It protects nothing: access is controlled by the server checks in `AUTH.md`.
- **Dish pages are prerendered**, so a crawler gets full HTML. The rendering strategy in `STRATEGY.md` did more for discoverability than any tag here.
- **Canonical URLs** are set on `/`, `/menu`, `/dishes` and every dish, so `?ref=` or a trailing slash does not create a second page for a crawler.

## Setting the site address

`SITE_URL` must be the production address (for example `https://mesob-eats.example`) wherever the app is built and deployed. If it is missing, it falls back to `http://localhost:3000`, and every social preview image then points at localhost and fails to load.

## Verified against the build

| Route | Result | Meaning |
|---|---|---|
| `/menu` | `○`, revalidate 1h | Static with hourly refresh |
| `/menu/[id]` | `●`, 20 paths | One prerendered page per dish |
| `/opengraph-image` | `○` | Site preview image built at build time |
| `/menu/[id]/opengraph-image` | `ƒ` | Per-dish image rendered on request |
| `/robots.txt`, `/sitemap.xml` | `○` | Generated at build time |
| `/cart`, `/dishes` | `○` | Static |
| `/checkout`, `/orders`, `/kitchen`, `/signin`, `/register` | `ƒ` | Dynamic, as intended |

## How to check it yourself

Run `npm run build` then `npm run start`, open a dish page, and use View Source. Look for:

1. One `<title>` of the form `Doro Wat | Mesob Eats`.
2. A `<meta name="description">` that names the dish and its price.
3. `og:title`, `og:description`, `og:image` and `og:url`, each with an **absolute** `https://` address.
4. `<link rel="canonical">`.
5. A `<script type="application/ld+json">` whose price matches the price on screen.
6. `/sitemap.xml` lists the home page, `/menu`, `/dishes` and all 20 dish pages, and none of the private routes.
7. `/robots.txt` disallows `/api/`, `/cart`, `/checkout`, `/orders`, `/kitchen`, `/signin` and `/register`, and names the sitemap.

On a deployed site, then check Search Console for indexing and a social preview debugger for the Telegram card.

## What matters most

Content that answers the query, server-rendered HTML, a fast LCP on a phone, one `h1` per page, working links and semantic markup. The metadata is the finishing layer. Keyword density, the meta keywords tag and `priority` values in the sitemap do little or nothing.
