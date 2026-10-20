# Mesob Eats: rendering strategy & architecture

| Route | Strategy | One-line reason |
|---|---|---|
| `/` | Static | The specials do not depend on who is asking |
| `/menu` | ISR, 3600 s | Dishes change a few times a day; the category filter and the search box run in the browser, so the page needs no request data |
| `/menu/[id]` | Static via generateStaticParams | All 20 dishes are known at build time |
| `/dishes` | Static + client fetch | Page one is prebuilt; the page number is read in the browser, so no request data is needed on the server |
| `/dashboard` | Static | Displays analytics and data representation components using dashboard data |
| `/cart` | Static shell + client | The cart is private to the browser tab |
| `/signin` | Dynamic | Reads searchParams to carry the return destination (`next`) |
| `/register` | Dynamic | Reads searchParams to carry the return destination (`next`) |
| `/checkout` | Dynamic | Reads the session cookie; posts through a server action |
| `/orders` | Dynamic | Reads the session cookie; lists and manages orders scoped to the signed-in person |
| `/orders/[id]` | Dynamic | Reads the session cookie; checks the order belongs to the person asking, then polls |
| `/kitchen` | Dynamic | Reads the session cookie; staff only |
| `/opengraph-image` | Static | The site-wide preview image never changes between requests |
| `/menu/[id]/opengraph-image` | Dynamic (rendered on request) | One image per dish, built from the dish name and price |
| `/robots.txt` | Static | Fixed rules plus the sitemap address |
| `/sitemap.xml` | Static | Built from the dish list at build time |
| `proxy.js` | Runs before the page | Sits in front of `/checkout` and `/orders`; checks the signed cookie and redirects, so a signed-out request never reaches the page |
| `/api/dishes`, `/api/dishes/[id]` | Dynamic | Route handlers that read per-request data (`q` and `page`) |
| `/api/orders`, `/api/orders/[id]` | Dynamic | Route handlers that check the session |
| `/api/me` | Dynamic | Reads the session cookie; the header asks it who is signed in |

## State and orders

| What | Where it lives | Why |
|---|---|---|
| Cart | The browser (`app/providers.jsx`, saved in `localStorage` as `mesob_cart`) | It is only the person's choices. The server never trusts it: `placeOrder` rebuilds every line from the dish id and takes the price from `menu.json`. |
| Orders | The server (`lib/db.js`), created by `placeOrder` | They belong to an account, so the server scopes them to the session |
| Session | A signed `httpOnly` cookie named `session` | The browser cannot read or change it |

## Checkout and order lifecycle

1. `CartLines` and `CheckoutForm` stop an empty cart from being submitted and link back to `/menu`.
2. `placeOrder` runs on the server. It checks the session, rebuilds each line from the dish id, validates the form with the shared schema, and stores the order with the owner taken from the session.
3. On success the cart is cleared and the receipt links to `/orders/[id]`.
4. `/orders` lists only the signed-in person's active orders. `cancelOrder` re-checks the session and the owner, marks the order `CANCELLED`, and the list hides it. `/kitchen` still shows it, so staff do not cook a cancelled order.

Order statuses in the code are `PENDING` and `CANCELLED`.

## Session and authentication

The session is a signed token in an `httpOnly`, `sameSite: "lax"` cookie (`secure` in production). `signIn` and `signOut` are server actions in `app/signin/actions.js`. `signOut` calls the `destroySession()` helper in `lib/session.js`, which deletes the cookie on the server. Full detail is in `AUTH.md`.

## Routes I changed my mind about

**/menu (Day 38).** I first filtered by category with a query string (`?category=...`),
which made the route dynamic because it read `searchParams`. The brief asks for ISR, so
I moved the filter into a small client component that hides sections with CSS. The
page went from `ƒ` back to `○` with a one-hour revalidate.

**/dishes (Day 41).** The paged list has its own route. Reading the page number on the
server would have made `/menu` dynamic again. On `/dishes` the page number is read in the
browser with `useSearchParams`, so the route stays static.

**The header (Day 42).** The header first read the session on the server, so the
signed-in links appeared at once. But the header sits in the root layout, and reading
a cookie there made every route dynamic, including `/`, `/menu` and `/menu/[id]`. I moved
the account links into a small client component (`AuthNav`) that asks `/api/me`. The
public pages are static again. The cost is a brief moment before the account links
appear, and that is only interface. The real checks are on the server.

**Query strings and search engines (Day 44).** Putting the search term and page number in
the URL was right for the person, but a crawler sees `/menu` and `/menu?ref=telegram` as
different pages. Each public page now sets a canonical URL, so they count as one.

## Where the data comes from

| Route | First view | After that |
|---|---|---|
| `/menu` | Server component | Search box queries `/api/dishes?q=` |
| `/dishes` | Page one from the server | Client SWR query to `/api/dishes?page=` |
| `/orders/[id]` | The order from the server | Client SWR poll of `/api/orders/[id]` every 5 s |
| Header account links | Nothing (rendered in the browser) | Client SWR query to `/api/me` on each navigation |

## What Day 46 changed

Day 46 added a dashboard route at `/dashboard` to demonstrate data representation.

The dashboard presents information in multiple formats:

- Summary metrics (Total Orders and Total Revenue)
- Revenue by neighbourhood visualization
- Orders Per Day visualization
- Orders Data table

The dashboard uses static sample data for reporting and analytics purposes. It does not change the rendering strategy of existing routes and does not require session data or request-specific data.

No existing route changed from Static, ISR, or Dynamic because of the dashboard work.

## Discoverability (Day 44)

Dish pages are prerendered, so a crawler receives full HTML with the dish name, price and
description already in it. Metadata, previews, JSON-LD, the sitemap and the robots rules
are listed in `SEO.md`. Private routes (`/cart`, `/checkout`, `/orders`, `/kitchen`,
`/signin`, `/register`) are excluded from the sitemap, disallowed in `robots.js` and marked
`noindex`.

## Protection

Every protected route, action and handler, with its layers, is in `AUTH.md`.

## Checked against the build

The Day 45 `npm run build` output matches this table, and lists `Proxy (Middleware)` under the routes:

| Route | Build symbol |
|---|---|
| `/menu` | `○`, revalidate 1h |
| `/menu/[id]` | `●`, 20 dish paths from generateStaticParams |
| `/`, `/cart`, `/dishes`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml` | `○` |
| `/checkout`, `/kitchen`, `/orders`, `/orders/[id]`, `/register`, `/signin` | `ƒ` |
| `/menu/[id]/opengraph-image` | `ƒ` |
| `/api/dishes`, `/api/dishes/[id]`, `/api/me`, `/api/orders`, `/api/orders/[id]` | `ƒ` |

If a public route (`/`, `/menu`, `/menu/[id]`, `/dishes`) shows `ƒ` instead of `○` or `●`,
something on it is reading a cookie or `searchParams` on the server.
