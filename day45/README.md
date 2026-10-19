# Mesob Eats — Day 45

Food ordering app built across Days 36 to 45: file routing, nested layouts, a rendering
strategy per route, server and client components, route handlers, server actions,
client-side data fetching with SWR, real authentication with a staff-only route, a measured
optimisation pass, and search metadata, previews, structured data, a sitemap and robots rules.

**Deployed URL:** (https://mesob-house-next.vercel.app/
)

## Run from a fresh clone

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

Create a file named `.env.local` in the project root:

    SESSION_SECRET=put-a-long-random-string-here
    SITE_URL=http://localhost:3000

Generate a secret with `openssl rand -base64 32`. The app refuses to start without
`SESSION_SECRET`. `.env.local` is ignored by Git and must never be committed.

```bash
npm run build
npm run start
```

Open http://localhost:3000.

## Deploying

Set these in the host's environment settings (not in the repository):

| Variable | Value |
|---|---|
| `SESSION_SECRET` | A long random string |
| `SITE_URL` | The deployed address, for example `https://mesob-eats.vercel.app` |
| `DEMO_LOGIN` | Leave unset |

If `SITE_URL` is missing, social previews, canonical links and the sitemap point at
`http://localhost:3000`.

Orders and users are held in memory in `lib/db.js`. On a serverless host an order may not
survive between requests that land on different instances. Treat deployed order history as
a demonstration of the checks, not as storage.

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
| `/orders` | Signed in | Your active orders with cancellation controls |
| `/orders/[id]` | The order's owner | One order, polled every 5 seconds |
| `/kitchen` | Staff only | Every order in the system |
| `/sitemap.xml`, `/robots.txt` | Anyone | Generated from the dish list |

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
| `signIn`, `signOut` | `app/signin/actions.js` | Phone and bcrypt hash; `next` must stay on this site; sign-out deletes the cookie via `destroySession()` in `lib/session.js` |
| `signInAsDemo` | `app/signin/actions.js` | Only works when `DEMO_LOGIN` is `"true"`; refuses otherwise |
| `register` | `app/register/actions.js` | Name, phone and password validated; role is always customer |
| `placeOrder` | `app/actions.js` | Session; owner is taken from the session, never from the form |
| `cancelOrder` | `app/actions.js` | Session, order exists, order.userId equals the session user |

---

## The Six Areas

| Area | Where to look | Proof |
|---|---|---|
| Accounts | `AUTH.md`, `lib/session.js` | Signed `httpOnly` cookie named `session` |
| Protection | `AUTH.md` | Three layers per private route; the three attacks table |
| Ownership | `AUTH.md`, `lib/db.js` | `getOrdersFor(session id)`; owner compared inside every action and handler |
| Live data | `DATA.md` | Network tab: one request per pause while searching; poll every 5 s |
| Performance | `PERF.md` | Budget table, Before and After columns |
| Discovery | `SEO.md` | View Source on the deployed page; `/sitemap.xml`; `/robots.txt` |

## Other documents

| File | What it covers |
|---|---|
| `AUTH.md` | Every protected route, action and handler, what proves it, and the three attacks |
| `DATA.md` | SWR queries, where each piece of data is fetched, and how to verify it |
| `PERF.md` | Performance budget with both columns filled, and what caused each change |
| `SEO.md` | Metadata, previews, JSON-LD, sitemap, robots |
| `STRATEGY.md` | Rendering strategy per route, checked against the build |
| `BOUNDARY.md` | Server and client components, and First Load JS for `/menu` |

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
