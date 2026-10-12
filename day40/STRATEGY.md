# Mesob House: rendering strategy

| Route | Strategy | One-line reason |
|---|---|---|
| / | Static | The specials do not depend on who is asking |
| /menu | ISR, 3600 s | Dishes change a few times a day; the category filter runs in the browser, so the page needs no request data |
| /menu/[id] | Static via generateStaticParams | All 20 dishes are known at build time |
| /cart | Static shell + client | The cart is private to the browser tab |
| /checkout | Dynamic | force-dynamic; it checks the session and posts through a server action |
| /orders | Dynamic | force-dynamic; the list changes with every order and cancel |
| /api/dishes, /api/dishes/[id], /api/orders | Dynamic | Route handlers that read per-request data |

## A route I changed my mind about

/menu. On Day 38 I filtered by category with a query string (?category=...), which
made the route dynamic because it read searchParams. The brief asks for ISR, so I
moved the filter into a small client component that hides sections with CSS. The
page went from ƒ back to ○ with a one-hour revalidate.

## Checked against the build

The build output matches this table line by line.