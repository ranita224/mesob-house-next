# Mesob Eats: (Day 48)

Sign-in uses a phone number and a password. Passwords are stored as bcrypt hashes.
The session is a signed token (JWT, HS256, one day) held in a cookie named `session`.
The cookie is `httpOnly`, `sameSite: "lax"` and `secure` whenever `NODE_ENV` is
`production` (so also on a local `npm run start`, but not on `npm run dev`). The signing
secret is `SESSION_SECRET`, read from the environment; the app refuses to start without it.

The session helpers (`getSession`, `createSession`, `destroySession` in `lib/session.js`)
are plain server modules, not server actions. A server action is a public endpoint, and a
function that signs a cookie for whatever user it is given must never be one.

## Demo accounts

All use the password `password123`.

| Phone | Name | Role | Notes |
|---|---|---|---|
| `0911111111` | Abebe Bikila | customer | |
| `0922222222` | Someone Else | customer | Owns the seeded order `ord_seed_1` |
| `0933333333` | Kitchen Staff | staff | Can open `/kitchen` |
| `0944444444` | Raniya | customer | Also reachable with the "Continue as Raniya" button, only when `DEMO_LOGIN=true` |

---

## Decision one: who may see what

| Route or action | Who | Middleware (`proxy.js`) | Page | Inside the action or handler | What proves it |
|---|---|---|---|---|---|
| `/`, `/menu`, `/menu/[id]`, `/dishes` | Everyone | none | none | none | Public on purpose, and indexable |
| `/cart` | Everyone | none | none | none | The cart is only the browser's own choices |
| `/signin`, `/register` | Everyone | none | none | credentials checked in the action | A password is verified against a bcrypt hash |
| `/checkout` | Any signed-in person | yes | session check | `placeOrder` checks the session | Proxy: a validly signed, unexpired cookie. Page: a real session. The write checks the rest. |
| `/orders` | The owner | yes | session check; `getOrdersFor(user.id)` | `cancelOrder`: session and ownership | The query is scoped to the session id, never to an id from the request |
| `/track/[id]` | The owner | yes | session and ownership | none | The order's owner id is compared to the session id |
| `GET /api/orders/[id]/stream` | The owner | no | n/a | session (401), ownership (403) | Streaming updates are only sent to the owner of the order |
| `/orders/[id]` | The owner | yes | session and ownership, then `notFound()` | none | The order's owner id is compared to the session id |
| `GET /api/orders/[id]` | The owner | no | n/a | session (401), ownership (403) | A real check, on the handler itself |
| `POST /api/orders` | Signed in | no | n/a | session (401); owner set from the session | A real check |
| `GET /api/dishes`, `/api/dishes/[id]` | Everyone | no | n/a | none | Public menu data |
| `GET /api/me` | Everyone | no | n/a | returns the session user or `null` | The header uses it for display only |
| `placeOrder` | Signed in | n/a | n/a | session; owner from the session; prices rebuilt on the server from the dish ids | A real check |
| `cancelOrder` | The owner | n/a | n/a | session, then `order.userId === user.id` | Authentication and authorisation, checked separately |
| `/kitchen` | Staff only | no | session, then `role === "staff"` | none (the page has no actions) | The role is read from the signed token on the server |

The proxy only proves that a validly signed cookie exists. It is not the security. The
checks inside the pages, actions and handlers are.

`proxy.js` (project root) covers `/checkout/:path*` and `/orders/:path*`. It verifies the
cookie with `verifyToken` and redirects to `/signin?next=<the path asked for>` when the
cookie is missing, forged or expired. The build output lists `Proxy (Middleware)`, so the
file is being picked up.

---

## Sign-in, sign-out and the demo login

| Action | Where | What it does |
|---|---|---|
| `signIn` | `app/signin/actions.js` | Normalises the phone number, compares the password with the bcrypt hash, creates the session, then redirects to a safe `next` |
| `signOut` | `app/signin/actions.js` | Calls `destroySession()` from `lib/session.js`, which deletes the `httpOnly` cookie on the server, then redirects to `/` |
| `signInAsDemo` | `app/signin/actions.js` | Signs in as Raniya, but only when `DEMO_LOGIN` is `"true"`; otherwise it redirects away |
| `register` | `app/register/actions.js` | Validates the name, phone and password, creates a customer, signs them in |

The Sign out button lives in `components/AuthNav.jsx`. AuthNav asks `/api/me` who is signed
in, so the header never reads a cookie during the server render and the public pages stay
static. The button is interface only: the cookie is deleted on the server.

---

## Open redirect safeguards

`next` is accepted only if it starts with `/` and, once parsed against a dummy origin,
still points at the same origin (`safeNext` in `lib/authHelpers.js`).
`https://example.com`, `//example.com` and `/\example.com` all fall back to `/`.
A normal return path such as `/orders?x=1` is kept, so the return trip still works.

---

## Registration

Anyone can create an account at `/register`. The server validates the name, the phone
number (normalised, so `+2519…` and `09…` are the same) and a password of 8 to 72
characters. Passwords are stored as bcrypt hashes. New accounts are always `customer`: the
form has no role field, so staff accounts only come from seed data. A duplicate phone
number is rejected. After registering, the person is signed in and sent to a safe `next`
destination.

---

## Interface hiding versus server security

The Orders and Kitchen links in the header are shown by AuthNav from `/api/me`. That is for
usability only. A customer who types `/kitchen` is refused by the role check in
`app/kitchen/page.js`, and a signed-out visitor to `/orders` is redirected by `proxy.js` and
by the page itself. Hiding a link protects nothing; the server checks do.

---

## Search engines are not access control

Private routes (`/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/kitchen`, `/signin`,
`/register`) are disallowed in `robots.js` and marked `noindex`, so they stay out of search
results. That only keeps them out of a listing. Anyone who knows the address can still
request the page, and `robots.txt` is itself public. What actually protects a route is the
session, ownership and role checks above.

---

## The three attacks

Run on a production build (`npm run build`, then `npm run start`), in a private window.
For each attack, the last column names the line that refused it.

Run on: 2026-10-18

| # | Attack | How it was run | Result | What stopped it |
|---|---|---|---|---|
| 1a | Read an order while signed out | Signed out, in the browser console: `await fetch("/api/orders/ord_seed_1").then(r => r.status)` | `401` | `getSession()` returns nothing, so `app/api/orders/[id]/route.js` returns "Not signed in" |
| 1b | Cancel an order while signed out | Open `/orders` signed in, sign out in a second tab, press Cancel in the first tab | Refused; the order was unchanged | The first layer that sees the request: `proxy.js` (no valid cookie on `/orders`). Behind it, `if (!user) return { error: "Not signed in" }` in `cancelOrder` (`app/actions.js`) |
| 2a | Cancel another account's order | Signed in as `0911111111`, changed the hidden `orderId` input of a Cancel form to `ord_seed_1`, pressed Cancel | "Not yours"; the order was unchanged | `if (order.userId !== user.id) return { error: "Not yours" }` in `cancelOrder` (`app/actions.js`). It passed the proxy and the session check and was refused on ownership. |
| 2b | Read another account's order | Signed in as `0911111111`: `await fetch("/api/orders/ord_seed_1").then(r => r.status)` | `403` | `if (order.userId !== user.id)` in `app/api/orders/[id]/route.js` |
| 2c | Open another account's order by URL | Signed in as `0911111111`, visited `/orders/ord_seed_1` | Page not found | The owner id is compared with the session id in `app/orders/[id]/page.js`, then `notFound()` |
| 3 | Crafted sign-in link | Visited `/signin?next=https://example.com` and `/signin?next=//example.com`, then signed in | Landed on this site's `/`, never on example.com | `safeNext` in `lib/authHelpers.js` rejects anything that does not start with `/` or that changes origin |

`cancelOrder` is a server action that takes a form, so it cannot be called from the console
by name. The browser-visible way to attack it is to change the form field, which is attack 2a.

### Layer one: the proxy (checked with curl, `npm run start`, signed out)

| Request | Result | What stopped it |
|---|---|---|
| `curl -i localhost:3000/orders` | `307`, `location: /signin?next=%2Forders` | `proxy.js`: no `session` cookie |
| `curl -i localhost:3000/orders -H "Cookie: session=garbage"` | `307`, `location: /signin?next=%2Forders` | `proxy.js`: `verifyToken` rejects a token that is not signed with `SESSION_SECRET` |
| `curl -i localhost:3000/checkout` | `307`, `location: /signin?next=%2Fcheckout` | `proxy.js`: no `session` cookie |

---

## Production notes

- `DEMO_LOGIN` must be unset, or not `"true"`, on the deployed site. When it is `"true"`,
  `signInAsDemo` signs anyone in as a demo account.
- `SESSION_SECRET` must be set in the host's environment settings. It is never committed:
  `.env.local` is ignored by Git.
- The cookie is `secure` in production, so it only works over https.
- Orders and users are held in memory in `lib/db.js`. On a serverless host an order may not
  survive between requests that land on different instances, so deployed order history
  demonstrates the checks, not storage.

---

## Known limits

- A signed token cannot be revoked before it expires, and a role change needs a new sign-in.
- No refresh token, no rate limiting and no password reset. Users are mock data in `lib/db.js`.
- `/kitchen` is not covered by the proxy matcher. Its protection is the session check and
  the role check in the page, and it has no actions to protect.