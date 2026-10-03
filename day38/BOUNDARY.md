# Mesob House: server and client boundary

| Component | Runs on | Why |
|---|---|---|
| app/layout.js | Server | Passes children into Providers; imports nothing client except Providers |
| app/providers.jsx | Client | Context requires state |
| app/CartContext.jsx | Client | Cart state with useState and context |
| app/menu/page.js | Server | Awaits searchParams and composes the page; no interactivity |
| app/menu/DishList.jsx | Server | Awaits dishes and renders markup; ships no JavaScript |
| app/menu/FilterShell.jsx | Client | Show/hide state; receives DishList as children, not an import |
| app/menu/AddToCartButton.jsx | Client | onClick writes to the cart |
| app/menu/CategoryLinks.jsx | Client | useSearchParams highlights the active category |
| app/menu/error.js | Client | Error boundaries must be client components |
| app/menu/layout.js | Server | Sidebar structure; only CategoryLinks inside is client |
| app/menu/[id]/page.js | Server | Awaits getDish; static via generateStaticParams (20 pages) |
| components/Header.js | Server | Markup only; only CartCount inside is client |
| components/CartCount.jsx | Client | Reads cart state |
| app/cart/page.js | Server | Heading only |
| app/cart/CartList.jsx | Client | Reads cart state |

## First Load JS for /menu (production build, JS only)

| | Transferred | Resources | JS requests |
|---|---|---|---|
| Before (Day 37) | 140 kB | 463 kB | 7 |
| After (Day 38) | 143 kB | 465 kB | 10 |

Measured with `npm run build` and `npm run start`, in a private window with
Disable cache on, using the JS filter in the Network tab.

## Explanation

Day 37 had one client file (error.js). Day 38 adds real interactivity: a cart
context, an Add button, a header count, a category filter and a show/hide
shell. That cost only about 3 kB transferred and 2 kB uncompressed, because
each client component is a small leaf. Most of the JavaScript is the shared
React and Next.js runtime, which both versions ship.

The menu grew from 2 dishes to 20, and that added no JavaScript. Pages,
layouts, Header and DishList stay on the server. DishList reaches FilterShell
as children instead of an import, and menu.json is imported on the server only,
so the data is sent as HTML, not as code. Pushing the boundary down to the
leaves is what kept the bundle almost unchanged while the app gained features.