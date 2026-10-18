# Mesob House (Addis Eats on Next.js)

Food ordering app built across Days 36 to 42: file routing, nested layouts, a rendering
strategy per route, server and client components, route handlers, server actions,
client-side data fetching with SWR, and real authentication with a staff-only route.

## Run

Create a file named `.env.local` in the project root with one line:

    SESSION_SECRET=put-a-long-random-string-here

Generate a value with `openssl rand -base64 32`. The app refuses to start without it.
`.env.local` is ignored by Git and must never be committed.

Then:

    npm install
    npm run build
    npm run start

## Demo accounts

All three use the password `password123`.

| Phone | Name | Role |
|---|---|---|
| 0911111111 | Abebe Bikila | customer |
| 0922222222 | Someone Else | customer (owns the seeded order `ord_seed_1`) |
| 0933333333 | Kitchen Staff | staff |

Anyone can also create a customer account at /register. Staff accounts exist only in
the seed data.

## Pages

| Route | Who can open it | What it does |
|---|---|---|
| / | Anyone | Landing page with today's specials |
| /menu | Anyone | Menu with a category filter and a search box |
| /menu/[id] | Anyone | One dish, with an Add button |
| /dishes | Anyone | All dishes, six per page, page number in the URL |
| /cart | Anyone | Cart lines and the running total |
| /signin, /register | Anyone | Sign in or create an account; `next` returns you to where you were going |
| /checkout | Signed in | Order form posted through a server action |
| /orders | Signed in | Your own orders, with Cancel |
| /orders/[id] | The order's owner | One order, polled every 5 seconds |
| /kitchen | Staff only | Every order in the system |

## Endpoints

| Endpoint | Method | Success | Errors |
|---|---|---|---|
| /api/dishes | GET | 200, `{ items, total }`; add `?q=` to search | none |
| /api/dishes?page=N | GET | 200, `{ items, total, page, pageCount }` | 400 if page is not a positive whole number |
| /api/dishes/[id] | GET | 200, one dish | 404 `{ "error": "No such dish" }` |
| /api/orders | POST | 201, the new order | 400 invalid JSON; 401 not signed in; 422 `{ "error", "fieldErrors" }` |
| /api/orders/[id] | GET | 200, the order | 401 not signed in; 403 not your order; 404 no such order |
| /api/me | GET | 200, `{ user }` (user is null when signed out) | none |

Every error uses one shape: `{ "error": "...", "fieldErrors": { ... } }`.

## Server actions

| Action | Where | Checks inside the action |
|---|---|---|
| signIn, signOut | app/signin/actions.js | Phone and bcrypt hash; `next` must stay on this site |
| register | (the register action) | Name, phone and password validated; role is always customer |
| placeOrder | app/actions.js | Session; the owner is taken from the session, never from the form |
| cancelOrder | app/actions.js | Session, order exists, order.userId equals the session user |

## Authentication in one paragraph

The session is a signed token (HS256, one day) in a cookie called `session`. The cookie
is httpOnly, sameSite lax, and secure in production. `proxy.js` redirects signed-out
visitors away from /checkout and /orders before anything renders. Pages check the
session again, and the actions and handlers make the checks that count. Every route,
its layers and what each layer proves are in AUTH.md.

## Verify with curl

Signed out (no cookie), these should be refused or empty:

    curl -i localhost:3000/api/orders/ord_seed_1
    curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0911223344"}'
    curl localhost:3000/api/me

Expected: 401, 401, and `{"user":null}`.

Public data:

    curl -i localhost:3000/api/dishes/not-a-dish
    curl "localhost:3000/api/dishes?q=tibs"
    curl "localhost:3000/api/dishes?page=2"
    curl -i "localhost:3000/api/dishes?page=0"

Expected: 404; the matching dishes; page 2 of 4; 400.

## Attacks I tried on my own work

| Attack | Result |
|---|---|
| Open /checkout signed out | Redirected to /signin?next=/checkout, then returned after signing in |
| Sign in through /signin?next=https://example.com | Stays on this site |
| Sign in through /signin?next=//example.com | Stays on this site |
| Open /orders/ord_seed_1 as Abebe | Not found |
| Call cancelOrder with another person's order id | "Not yours" |
| Open /kitchen as a customer | Not found |
| Open /orders after signing out | Redirected to /signin |

## Documents

| File | What it holds |
|---|---|
| STRATEGY.md | Every route, its rendering strategy, and why |
| BOUNDARY.md | Every component, which side it runs on, and why |
| DATA.md | Every client query: its key, its refresh rule, and why |
| AUTH.md | Every protected route, its layers, and what each layer proves |

## Build output

(paste the route list from npm run build here)

## Notes

- Orders and users live in memory and reset when the server restarts.
- The orders data layer (`lib/db.js`) comes from the course. Its four dishes are only used
  to check a `dishId` sent to POST /api/orders. The menu pages and /api/dishes read
  `menu.json`.
- A signed token cannot be revoked before it expires. There is no refresh token, no rate
  limiting and no password reset.
- Dish photos are in `public/images/dishes/`. A dish without a photo shows a tinted tile.

## Credits

Design: "Habesha-Restaurant" by Eyasu Nigussie (Figma Community, CC BY 4.0).