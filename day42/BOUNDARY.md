# Mesob House: server and client boundary

## Client components (14)

| File | Why it must be client |
|---|---|
| app/providers.jsx | Cart context holds state |
| app/menu/FilterShell.jsx | Holds the selected category |
| app/menu/AddToCartButton.jsx | onClick writes to the cart |
| app/menu/SearchBox.jsx | Typing state, debounce and a SWR query |
| components/CartCount.jsx | Reads the cart for the header |
| components/AuthNav.jsx | Asks /api/me who is signed in; shows Orders, Kitchen and Sign out |
| app/cart/CartLines.jsx | Reads the cart; used by /cart and /checkout |
| app/checkout/CheckoutForm.jsx | useActionState for the pending flag and result |
| app/orders/CancelButton.jsx | useActionState for the cancel result |
| app/orders/[id]/OrderStatus.jsx | SWR poll every 5 s, seeded with the server's order |
| app/dishes/PagedDishes.jsx | Reads the page number from the URL and fetches with SWR |
| app/signin/SignInForm.jsx | useActionState for the pending flag and the sign-in error |
| app/register/RegisterForm.jsx | useActionState for the pending flag and the field errors |
| app/menu/error.js | Error boundaries must be client components |

Day 42 added three client files: the sign-in form, the register form and AuthNav.
The two forms need the pending flag and the error state. AuthNav exists so the header
does not read cookies on the server (see below).

## Server components

| File | What it does |
|---|---|
| app/layout.js | Passes children into Providers; imports nothing client except Providers |
| app/page.js | Landing page with the specials |
| components/Header.js, Footer.js | Markup only; the account links are a client leaf (AuthNav) |
| app/menu/layout.js | Centers the page content |
| app/menu/page.js | Composes the menu; ISR |
| app/menu/DishList.jsx | Awaits dishes, renders markup, ships no JavaScript |
| app/menu/[id]/page.js | Awaits one dish; static via params |
| app/dishes/page.js | Renders page one of the dish list on the server |
| app/dishes/DishRows.jsx | Plain markup shared by the server page and PagedDishes |
| app/cart/page.js | Heading only |
| app/signin/page.js | Reads next from the URL and renders the form |
| app/checkout/page.js | Checks the session, then renders |
| app/orders/page.js | Checks the session; lists only the signed-in person's orders |
| app/orders/[id]/page.js | Checks session and ownership, then hands the order to OrderStatus |
| app/kitchen/page.js | Checks session and role on the server |

## Composition

FilterShell is a client component that wraps the server component DishList. DishList
is passed in as children and is never imported by FilterShell, so the list stays on
the server.

OrderStatus and PagedDishes receive server data as props (`initial`), and SWR uses it
as fallbackData. Only plain objects, strings and numbers cross the boundary.

## The session and the boundary

| Where the session is read | Side |
|---|---|
| proxy.js, pages, actions, route handlers | Server (getSession or verifyToken) |
| The header's account links | Client, through /api/me |

The cookie is httpOnly, so no client component can read it. AuthNav asks the server
who is signed in instead of reading anything itself. What AuthNav shows is only
interface: the checks that matter run on the server.

## Data movement

| What | How |
|---|---|
| Menu and dish data | Server component |
| First page of the dish list, first view of an order | Server component, passed to the client as fallbackData |
| Order status polling | Client SWR query to GET /api/orders/[id] |
| Menu search | Client SWR query to GET /api/dishes?q= |
| Pages two onward | Client SWR query to GET /api/dishes?page= |
| Who is signed in (header) | Client SWR query to GET /api/me |
| Placing and cancelling an order | Server action |
| Signing in and out | Server action |
| POST /api/orders | Route handler for outside callers |
| Cart | Client store only |

## First Load JS for /menu

| Version | Transferred | Resources | JS requests |
|---|---|---|---|
| Day 37 | 140 kB | 463 kB | 7 |
| Day 38 | 143 kB | 465 kB | 10 |
| Day 40 | 144 kB | 465 kB | 11 |

Measured on npm run start, in a private window, with Disable cache on and the JS
filter in the Network tab. Days 41 and 42 added SWR, the search box, the sign-in and
register forms and AuthNav; they were not measured separately.

## What the numbers show

Between Day 37 and Day 40 the app gained a cart, an Add button, a header count, a
category filter, a checkout form and an orders page. The JavaScript for /menu grew by
only 4 kB transferred. Most of it is the shared React and Next.js runtime, which every
version ships. The 20-dish menu, the landing page, the layouts and DishList all stay
on the server and add no JavaScript.