# Mesob House: rendering strategy

| Route | Strategy | One-line reason |
|---|---|---|
| / | Static | The specials do not depend on who is asking |
| /menu | ISR, 3600 s | Dishes change a few times a day; the category filter and the search box run in the browser, so the page needs no request data |
| /menu/[id] | Static via generateStaticParams | All 20 dishes are known at build time |
| /dishes | Static + client fetch | Page one is prebuilt; the page number is read in the browser, so no request data is needed on the server |
| /cart | Static shell + client | The cart is private to the browser tab |
| /checkout | Dynamic | force-dynamic; it checks the session and posts through a server action |
| /orders | Dynamic | force-dynamic; the list changes with every order and cancel |
| /orders/[id] | Dynamic | force-dynamic; it checks that the order belongs to the person asking, then polls |
| /api/dishes, /api/dishes/[id] | Dynamic | Route handlers that read per-request data (q and page) |
| /api/orders, /api/orders/[id] | Dynamic | Route handlers that check the session |

## A route I changed my mind about

/menu. On Day 38 I filtered by category with a query string (?category=...), which
made the route dynamic because it read searchParams. The brief asks for ISR, so I
moved the filter into a small client component that hides sections with CSS. The page
went from ƒ back to ○ with a one-hour revalidate.

On Day 41 I put the paged list on its own route, /dishes, and not on /menu. Reading
the page number on the server would have made /menu dynamic again. On /dishes the
page number is read in the browser with useSearchParams, so the route stays static.

## Where the data comes from

| Route | First view | After that |
|---|---|---|
| /menu | Server component | Search box queries /api/dishes?q= |
| /dishes | Page one from the server | Client SWR query to /api/dishes?page= |
| /orders/[id] | The order from the server | Client SWR poll of /api/orders/[id] every 5 s |

## Checked against the build

The build output matches this table line by line. If /dishes shows ƒ instead of ○,
something on that page is reading searchParams on the server.