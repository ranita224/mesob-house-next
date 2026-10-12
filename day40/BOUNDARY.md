# Mesob House: server and client boundary

## Client components (8)

| File | Why it must be client |
|---|---|
| app/providers.jsx | Cart context holds state |
| app/menu/FilterShell.jsx | Holds the selected category |
| app/menu/AddToCartButton.jsx | onClick writes to the cart |
| components/CartCount.jsx | Reads the cart for the header |
| app/cart/CartLines.jsx | Reads the cart; used by /cart and /checkout |
| app/checkout/CheckoutForm.jsx | useActionState for the pending flag and result |
| app/orders/CancelButton.jsx | useActionState for the cancel result |
| app/menu/error.js | Error boundaries must be client components |

## Server components

| File | What it does |
|---|---|
| app/layout.js | Passes children into Providers; imports nothing client except Providers |
| app/page.js | Landing page with the specials |
| app/menu/layout.js | Category sidebar markup |
| app/menu/page.js | Composes the menu; ISR |
| app/menu/DishList.jsx | Awaits dishes, renders markup, ships no JavaScript |
| app/menu/[id]/page.js | Awaits one dish; static via params |
| app/cart/page.js | Heading only |
| app/checkout/page.js | Checks the session, then renders |
| app/orders/page.js | Lists orders |
| components/Header.js, Footer.js | Markup only |

## Composition

FilterShell is a client component that wraps the server component DishList. DishList
is passed in as children and is never imported by FilterShell, so the list stays on
the server.

## Data movement

| What | How |
|---|---|
| Menu and dish data | Server component |
| Placing and cancelling an order | Server action |
| /api/orders | Route handler for outside callers |
| /api/dishes | Public feed for outside callers; none of our pages call it |
| Cart | Client store only |

## First Load JS for /menu

| Version | Transferred | Resources | JS requests |
|---|---|---|---|
| Day 37 | 140 kB | 463 kB | 7 |
| Day 38 | 143 kB | 465 kB | 10 |
| Day 40 | 144 kB | 465 kB | 11 |

Measured on npm run start, in a private window, with Disable cache on and the JS
filter in the Network tab.

## What the numbers show

Between Day 37 and Day 40 the app gained a cart, an Add button, a header count, a
category filter, a checkout form and an orders page. The JavaScript for /menu grew
by only 4 kB transferred. Most of it is the shared React and Next.js runtime, which
every version ships. Day 40 is flat compared with Day 38 (+1 kB): merging the cart
files reduced the number of client files from 11 to 8, but the same code still
runs in the browser, so the bytes barely moved. The 20-dish menu, the landing
page, the layouts and DishList all stay on the server and add no JavaScript.