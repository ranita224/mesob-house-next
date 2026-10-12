# Mesob House (Addis Eats on Next.js)

Food ordering app built across Days 36 to 40: file routing, nested layouts, a
rendering strategy per route, server and client components, route handlers and
server actions.

## Run

    npm install
    npm run build
    npm run start

## Endpoints

| Endpoint | Method | Success | Errors |
|---|---|---|---|
| /api/dishes | GET | 200, array of dishes | none |
| /api/dishes/[id] | GET | 200, one dish | 404 { "error": "No such dish" } |
| /api/orders | POST | 201, the new order | 400 invalid JSON; 401 not signed in; 422 { "error", "fieldErrors" } |

Every error uses one shape: { "error": "...", "fieldErrors": { ... } }.

## Server actions (app/actions.js)

| Action | Checks inside the action |
|---|---|
| placeOrder | Session, then validation with the shared orderSchema |
| cancelOrder | Session, order exists, order.userId equals the session user |

## Verify with curl

    curl -i localhost:3000/api/dishes/not-a-dish
    curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0912"}'

Expected: 404, then 422 with fieldErrors.phone.

## Build output

    Route (app)                 Revalidate  Expire
    ┌ ○ /
    ├ ○ /_not-found
    ├ ƒ /api/dishes
    ├ ƒ /api/dishes/[id]
    ├ ƒ /api/orders
    ├ ○ /cart
    ├ ƒ /checkout
    ├ ○ /menu                         1h      1y
    ├ /menu/[id]
    │ ├ ● /menu/doro-wat
    │ ├ ● /menu/siga-wat
    │ ├ ● /menu/beg-alicha-wat
    │ └ [+17 more paths]
    └ ƒ /orders

    ○ (Static)   prerendered as static content
    ● (SSG)      prerendered as static HTML (uses generateStaticParams)
    ƒ (Dynamic)  server-rendered on demand

## Notes

- Orders live in memory and reset when the server restarts.
- /api/dishes exists for outside callers. The menu pages read the data directly.
- Documents: STRATEGY.md and BOUNDARY.md.