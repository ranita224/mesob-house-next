# Mesob House: server and client boundary

## Client components (11)

| File | Why it must be client |
|---|---|
| app/providers.jsx | Cart context holds state |
| app/menu/FilterShell.jsx | Holds the selected category |
| app/menu/AddToCartButton.jsx | onClick writes to the cart |
| app/menu/SearchBox.jsx | Typing state, debounce and a SWR query |
| components/CartCount.jsx | Reads the cart for the header |
| app/cart/CartLines.jsx | Reads the cart; used by /cart and /checkout |
| app/checkout/CheckoutForm.jsx | useActionState for the pending flag and result |
| app/orders/CancelButton.jsx | useActionState for the cancel result |
| app/orders/[id]/OrderStatus.jsx | SWR poll every 5 s, seeded with the server's order |
| app/dishes/PagedDishes.jsx | Reads the page number from the URL and fetches with SWR |
| app/menu/error.js | Error boundaries must be client components |

The three newest files (SearchBox, OrderStatus, PagedDishes) are exactly the cases on
the Day 41 slide: search as you type, polling, and pages after the first. Everything
else a server component could fetch still stays on the server.

## Server components

| File | What it does |
|---|---|
| app/layout.js | Passes children into Providers; imports nothing client except Providers |
| app/page.js | Landing page with the specials |
| app/menu/layout.js | Category sidebar markup |
| app/menu/page.js | Composes the menu; ISR |
| app/menu/DishList.jsx | Awaits dishes, renders markup, ships no JavaScript |
| app/menu/[id]/page.js | Awaits one dish; static via params |
| app/dishes/page.js | Renders page one of the dish list on the server |
| app/dishes/DishRows.jsx | Plain markup shared by the server page and PagedDishes |
| app/cart/page.js | Heading only |
| app/checkout/page.js | Checks the session, then renders |
| app/orders/page.js | Lists orders |
| app/orders/[id]/page.js | Renders one order on the server, then hands it to OrderStatus |
| components/Header.js, Footer.js | Markup only |

## Composition

FilterShell is a client component that wraps the server component DishList. DishList
is passed in as children and is never imported by FilterShell, so the list stays on
the server.

OrderStatus and PagedDishes receive server data as props (`initial`), and SWR uses it
as fallbackData. The first paint shows real content with no spinner. Only plain
objects, strings and numbers cross the boundary.

## Data movement

| What | How |
|---|---|
| Menu and dish data | Server component |
| First page of the dish list, first view of an order | Server component, passed to the client as fallbackData |
| Order status polling | Client SWR query to GET /api/orders/[id] |
| Menu search | Client SWR query to GET /api/dishes?q= |
| Pages two onward | Client SWR query to GET /api/dishes?page= |
| Placing and cancelling an order | Server action |
| POST /api/orders | Route handler for outside callers |
| Cart | Client store only |

## First Load JS for /menu

| Version | Transferred | Resources | JS requests |
|---|---|---|---|
| Day 37 | 140 kB | 463 kB | 7 |
| Day 38 | 143 kB | 465 kB | 10 |
| Day 40 | 144 kB | 465 kB | 11 |
| Day 41 | ___ kB | ___ kB | ___ |

Measured on npm run start, in a private window, with Disable cache on and the JS
filter in the Network tab.

## What the numbers show

Between Day 37 and Day 40 the app gained a cart, an Add button, a header count, a
category filter, a checkout form and an orders page. The JavaScript for /menu grew by
only 4 kB transferred. Most of it is the shared React and Next.js runtime, which every
version ships. Day 41 adds SWR and the search box to /menu, so a small increase is
expected there. The 20-dish menu, the landing page, the layouts and DishList all stay
on the server and add no JavaScript.