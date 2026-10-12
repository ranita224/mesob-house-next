# Mesob House (Addis Eats on Next.js)

Food ordering app built across Days 36 to 41: file routing, nested layouts, a rendering
strategy per route, server and client components, route handlers, server actions, and
client-side data fetching with SWR.

## Run

    npm install
    npm run build
    npm run start

## Pages

| Route | What it does |
|---|---|
| / | Landing page with today's specials |
| /menu | Menu with a category filter and a search box |
| /menu/[id] | One dish, with an Add button |
| /dishes | All dishes, six per page, page number in the URL |
| /cart | Cart lines and the running total |
| /checkout | Order form posted through a server action |
| /orders | The orders list, with Cancel |
| /orders/[id] | One order, polled every 5 seconds |

## Endpoints

| Endpoint | Method | Success | Errors |
|---|---|---|---|
| /api/dishes | GET | 200, `{ items, total }`; add `?q=` to search | none |
| /api/dishes?page=N | GET | 200, `{ items, total, page, pageCount }` | 400 if page is not a positive whole number |
| /api/dishes/[id] | GET | 200, one dish | 404 `{ "error": "No such dish" }` |
| /api/orders | POST | 201, the new order | 400 invalid JSON; 401 not signed in; 422 `{ "error", "fieldErrors" }` |
| /api/orders/[id] | GET | 200, the order | 401 not signed in; 403 not your order; 404 no such order |

Every error uses one shape: `{ "error": "...", "fieldErrors": { ... } }`.

## Server actions (app/actions.js)

| Action | Checks inside the action |
|---|---|
| placeOrder | Session, then validation with the shared orderSchema |
| cancelOrder | Session, order exists, order.userId equals the session user |

## Verify with curl

    curl -i localhost:3000/api/dishes/not-a-dish
    curl "localhost:3000/api/dishes?q=tibs"
    curl "localhost:3000/api/dishes?page=2"
    curl -i "localhost:3000/api/dishes?page=0"
    curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0912"}'
    curl -i localhost:3000/api/orders/ord_seed_1

Expected: 404; four matching dishes; page 2 of 4; 400; 422 with fieldErrors.phone; 403.

## Documents

| File | What it holds |
|---|---|
| STRATEGY.md | Every route, its rendering strategy, and why |
| BOUNDARY.md | Every component, which side it runs on, and the bundle sizes |
| DATA.md | Every client query: its key, its refresh rule, and why |

## Build output

(paste the route list from npm run build here)

## Notes

- Orders live in memory and reset when the server restarts.
- The session is a fixed mock user from lib/db.js. Real sessions come on Day 42.
- /api/dishes is called by the search box and the paged list. The menu pages read
  the same data directly on the server.