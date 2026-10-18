# Mesob House: rendering strategy

| Route | Strategy | One-line reason |
|---|---|---|
| / | Static | The specials do not depend on who is asking |
| /menu | ISR, 3600 s | Dishes change a few times a day; the category filter and the search box run in the browser, so the page needs no request data |
| /menu/[id] | Static via generateStaticParams | All 20 dishes are known at build time |
| /dishes | Static + client fetch | Page one is prebuilt; the page number is read in the browser, so no request data is needed on the server |
| /cart | Static shell + client | The cart is private to the browser tab |
| /signin | Dynamic | Reads searchParams to carry the return destination (next) |
| /register | Dynamic | Reads searchParams to carry the return destination (next) |
| /checkout | Dynamic | Reads the session cookie; posts through a server action |
| /orders | Dynamic | Reads the session cookie; the list is scoped to the signed-in person |
| /orders/[id] | Dynamic | Reads the session cookie; checks the order belongs to the person asking, then polls |
| /kitchen | Dynamic | Reads the session cookie; staff only |
| /api/dishes, /api/dishes/[id] | Dynamic | Route handlers that read per-request data (q and page) |
| /api/orders, /api/orders/[id] | Dynamic | Route handlers that check the session |
| /api/me | Dynamic | Reads the session cookie; the header asks it who is signed in |

## Routes I changed my mind about

**/menu (Day 38).** I first filtered by category with a query string (?category=...),
which made the route dynamic because it read searchParams. The brief asks for ISR, so
I moved the filter into a small client component that hides sections with CSS. The
page went from ƒ back to ○ with a one-hour revalidate.

**/dishes (Day 41).** The paged list has its own route. Reading the page number on the
server would have made /menu dynamic again. On /dishes the page number is read in the
browser with useSearchParams, so the route stays static.

**The header (Day 42).** The header first read the session on the server, so the
signed-in links appeared at once. But the header sits in the root layout, and reading
a cookie there made every route dynamic, including /, /menu and /menu/[id]. I moved
the account links into a small client component (AuthNav) that asks /api/me. The
public pages are static again. The cost is a brief moment before the account links
appear, and that is only interface. The real checks are on the server.

## Where the data comes from

| Route | First view | After that |
|---|---|---|
| /menu | Server component | Search box queries /api/dishes?q= |
| /dishes | Page one from the server | Client SWR query to /api/dishes?page= |
| /orders/[id] | The order from the server | Client SWR poll of /api/orders/[id] every 5 s |
| Header account links | Nothing (rendered in the browser) | Client SWR query to /api/me on each navigation |

## Protection

Every protected route, action and handler, with its layers, is in AUTH.md.

## Checked against the build

The build output matches this table line by line. If a public route (/, /menu,
/menu/[id], /dishes) shows ƒ instead of ○ or ●, something on it is reading a cookie
or searchParams on the server.