# Mesob Eats — Day 44

Food ordering app built across Days 36 to 44: file routing, nested layouts, a rendering
strategy per route, server and client components, route handlers, server actions,
client-side data fetching with SWR, real authentication with a staff-only route,
multi-order global state, and search metadata, social previews, structured data, a sitemap
and robots rules.

## Run

Create a file named `.env.local` in the project root:

    SESSION_SECRET=put-a-long-random-string-here
    SITE_URL=http://localhost:3000

Generate a secret with `openssl rand -base64 32`. The app refuses to start without
`SESSION_SECRET`. `.env.local` is ignored by Git and must never be committed.

`SITE_URL` is the public address of the site. Social preview images, canonical links and
the sitemap are built from it, so on a deployed site it must be the real address
(for example `https://mesob-eats.example`). If it is missing, it falls back to
`http://localhost:3000` and every shared link loses its picture.

Then:

    npm install
    npm run build
    npm run start

---

## Demo Accounts

All three use the password `password123`.

| Phone | Name | Role |
|---|---|---|
| `0911111111` | Abebe Bikila | customer |
| `0922222222` | Someone Else | customer (owns the seeded order `ord_seed_1`) |
| `0933333333` | Kitchen Staff | staff |

Anyone can also create a customer account at `/register`. Staff accounts exist only in
the seed data.

---

## Pages

| Route | Who can open it | What it does |
|---|---|---|
| `/` | Anyone | Landing page with today's specials |
| `/menu` | Anyone | Menu with a category filter and a search box |
| `/menu/[id]` | Anyone | One dish, with an Add button |
| `/dishes` | Anyone | All dishes, six per page, page number in the URL |
| `/cart` | Anyone | Cart lines and the running total (not indexed) |
| `/signin`, `/register` | Anyone | Sign in or create an account; `next` returns you to where you were going (not indexed) |
| `/checkout` | Signed in | Order form with empty-cart validation posted through a server action |
| `/orders` | Signed in | Your active orders tracking dashboard with cancellation controls |
| `/orders/[id]` | The order's owner | One order, polled every 5 seconds |
| `/kitchen` | Staff only | Every order in the system |
| `/sitemap.xml` | Anyone | Generated from the dish list |
| `/robots.txt` | Anyone | Crawler rules and the sitemap address |

---

## Search and sharing (Day 44)

Every route has a title and description. A title template in the root layout adds
`| Mesob Eats` to each page. Each dish page generates its own metadata, a preview image
(1200 x 630) and `MenuItem` JSON-LD from the dish data. The home page carries `Restaurant`
JSON-LD. `/cart`, `/checkout`, `/orders`, `/kitchen`, `/signin` and `/register` are
disallowed in `robots.js` and marked `noindex`. What is set where, and how to check it in
View Source, is in `SEO.md`.

---

## Endpoints

| Endpoint | Method | Success | Errors |
|---|---|---|---|
| `/api/dishes` | GET | 200, `{ items, total }`; add `?q=` to search | none |
| `/api/dishes?page=N` | GET | 200, `{ items, total, page, pageCount }` | 400 if page is not a positive whole number |
| `/api/dishes/[id]` | GET | 200, one dish | 404 `{ "error": "No such dish" }` |
| `/api/orders` | POST | 201, the new order | 400 invalid JSON; 401 not signed in; 422 `{ "error", "fieldErrors" }` |
| `/api/orders/[id]` | GET | 200, the order | 401 not signed in; 403 not your order; 404 no such order |
| `/api/me` | GET | 200, `{ user }` (user is null when signed out) | none |

Every error uses one shape: `{ "error": "...", "fieldErrors": { ... } }`.

---

## Server Actions

| Action | Where | Checks inside the action |
|---|---|---|
| `signIn` | `app/signin/actions.js` | Phone and bcrypt hash; `next` must stay on this site |
| `destroySession` | `lib/session.js` | Clears `httpOnly` session cookie on the server |
| `register` | `app/register/actions.js` | Name, phone and password validated; role is always customer |
| `placeOrder` | `app/actions.js` | Session; owner is taken from the session, never from the form |
| `cancelOrder` | `app/actions.js` | Session, order exists, order.userId equals the session user |

---

## Authentication in One Paragraph

The session is a signed token (HS256, one day) in a cookie called `session`. The cookie
is `httpOnly`, `sameSite: "lax"`, and `secure` in production. `proxy.js` redirects signed-out
visitors away from `/checkout` and `/orders` before anything renders. Sign-out runs via the
`destroySession` Server Action in `lib/session.js`. Pages check the session again, and the
actions and handlers make the checks that count. Every route, its layers and what each layer
proves are in `AUTH.md`.

---

## Other documents

| File | What it covers |
|---|---|
| `AUTH.md` | Every protected route, action and handler, and what proves it |
| `STRATEGY.md` | Rendering strategy per route, checked against the build |
| `BOUNDARY.md` | Server and client components, and First Load JS for `/menu` |
| `DATA.md` | SWR queries and their refresh rules |
| `SEO.md` | Metadata, previews, JSON-LD, sitemap, robots, and how to verify them |

---

## Verify with curl

Signed out (no cookie), these should be refused or empty:

```bash
curl -i localhost:3000/api/orders/ord_seed_1
curl -i -X POST localhost:3000/api/orders -H "Content-Type: application/json" -d '{"name":"Almaz","phone":"0911223344"}'
curl localhost:3000/api/me
```

Search and sharing, on a running build:

```bash
curl -s localhost:3000/robots.txt
curl -s localhost:3000/sitemap.xml
curl -s localhost:3000/menu/doro-wat | grep -o '<meta property="og:[^>]*>'
```
