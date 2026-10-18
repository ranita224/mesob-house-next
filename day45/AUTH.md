# Authentication Strategy & Session Handling

Sign-in uses a phone number and password. Passwords are stored as bcrypt hashes.
The session is a signed token (JWT, HS256, 1 day) held in a cookie named `session`.
The cookie is `httpOnly`, `sameSite: "lax"`, and `secure` in production (it is not `secure` on http://localhost). The secret is `SESSION_SECRET` in `.env.local`.

Demo accounts (password `password123`):
- `0911111111` customer (Abebe)
- `0922222222` customer (Someone Else, owns seed order `ord_seed_1`)
- `0933333333` staff

---

## Protected Routes and Actions

| Route or action | Middleware (proxy.js) | Page | Inside the action/handler | What proves it |
|---|---|---|---|---|
| `/menu`, `/menu/[id]` | none | none | none | Public on purpose |
| `/checkout` | yes | session check | none | Proxy: signed, unexpired cookie. Page: session |
| `/orders` | yes | session check, `getOrdersFor(user.id)` | none | Query is scoped to the session id, never an id from the request |
| `/orders/[id]` | yes | session + ownership (`notFound`) | none | Owner id compared to the session id |
| `GET /api/orders/[id]` | no | n/a | session (401) + ownership (403) | Real check |
| `POST /api/orders` | no | n/a | session (401), owner set from session | Real check |
| `placeOrder` | n/a | n/a | session, owner set from session | Real check |
| `cancelOrder` | n/a | n/a | session + ownership | Authentication and authorisation, separately |
| `/kitchen` | no | session + `role === "staff"` | n/a | Role read from the signed token on the server |

The proxy only proves a valid cookie exists. It is not the security. The checks inside actions and handlers are.

`proxy.js` (project root) covers `/checkout/:path*` and `/orders/:path*`. It verifies the
cookie with `verifyToken` and redirects to `/signin?next=<the path asked for>` when the
cookie is missing, forged or expired.

---

## Sign-Out Flow

* The sign-out mechanism is executed via a Next.js Server Action (`destroySession`) located in `lib/session.js`.
* Form submission in `components/Header.js` invokes `destroySession()` directly on the server.
* Calling `destroySession()` deletes the `httpOnly` `session` cookie and triggers an immediate UI state refresh back to the unauthenticated state ("Sign In") without requiring custom API routes or client-side JavaScript cookie deletion.

---

## Open Redirect Safeguards

`next` parameter is only accepted if it starts with `/` and resolves to the same origin.
`https://example.com`, `//example.com` and `/\example.com` all fall back to `/`.

---

## Registration

Anyone can create an account at `/register`. The server validates the name, the phone number (normalised, so `+2519…` and `09…` are the same) and a password of 8 to 72 characters.
Passwords are stored as bcrypt hashes. New accounts are always `customer`: the form has no role field, so staff accounts only come from seed data. A duplicate phone number is rejected. After registering, the user is signed in and sent to a safe `next` destination.

---

## Interface Hiding vs. Server Security

The Orders and Kitchen links in the header are controlled via authentication state in the navigation. That is for interface usability only. A customer who navigates directly to `/kitchen` is refused by the role check in `app/kitchen/page.js`, and a signed-out visitor to `/orders` is redirected by `proxy.js` and by the page itself. Hiding a link protects nothing; server checks do.

---

## Search Engines Are Not Access Control

Private routes (`/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/kitchen`, `/signin`, `/register`)
are disallowed in `robots.js` and marked `noindex` so they stay out of search results.
That only keeps them out of a listing. Anyone who knows the address can still request the
page, and `robots.txt` is itself public. What actually protects a route is the session,
ownership and role checks above.

---

## The Three Attacks (Day 45)

Run on a production build. Demo accounts are above. For each attack, the last column names
the line that refused it.

| # | Attack | How to run it | Expected | What stopped it |
|---|---|---|---|---|
| 1a | Read an order while signed out | Signed out, in the browser console: `await fetch("/api/orders/ord_seed_1").then(r => r.status)` | `401` | `getSession()` returns nothing, so `app/api/orders/[id]/route.js` returns `"Not signed in"` with status 401 |
| 1b | Cancel an order while signed out | Open `/orders` signed in, sign out in a second tab, then press Cancel in the first tab | Error "Not signed in", order unchanged | `if (!user) return { error: "Not signed in" }` in `cancelOrder` (`app/actions.js`) |
| 2a | Cancel another account's order | Sign in as `0911111111`. In devtools, change the hidden `orderId` input of a Cancel form to `ord_seed_1` (owned by `0922222222`), then press Cancel | Error "Not yours", order unchanged | `if (order.userId !== user.id) return { error: "Not yours" }` in `cancelOrder` |
| 2b | Read another account's order | Signed in as `0911111111`: `await fetch("/api/orders/ord_seed_1").then(r => r.status)` | `403` | `if (order.userId !== user.id)` in `app/api/orders/[id]/route.js` |
| 2c | Open another account's order by URL | Signed in as `0911111111`, visit `/orders/ord_seed_1` | Page not found | Owner id compared to session id in `app/orders/[id]/page.js`, then `notFound()` |
| 3 | Crafted sign-in link | Visit `/signin?next=https://example.com`, sign in | Lands on `/`, not on example.com | `safeNext` in `lib/authHelpers.js` rejects anything that does not start with `/` or that changes origin |

`cancelOrder` is a server action that takes a form, so it cannot be called from the console
by name. The browser-visible way to attack it is to change the form field, which is attack 2a.

**Results (fill in as you run each one):**

| # | Date | Build or URL | Result |
|---|---|---|---|
| 1a | | | |
| 1b | | | |
| 2a | | | |
| 2b | | | |
| 2c | | | |
| 3 | | | |

### Layer one: the proxy (checked with curl, `npm run start`, signed out)

| Request | Result | What stopped it |
|---|---|---|
| `curl -i localhost:3000/orders` | `307`, `location: /signin?next=%2Forders` | `proxy.js`: no `session` cookie |
| `curl -i localhost:3000/orders -H "Cookie: session=garbage"` | `307`, `location: /signin?next=%2Forders` | `proxy.js`: `verifyToken` rejects a token that is not signed with `SESSION_SECRET` |
| `curl -i localhost:3000/checkout` | `307`, `location: /signin?next=%2Fcheckout` | `proxy.js`: no `session` cookie |

The build output lists `Proxy (Middleware)`, so the file is being picked up.

---

## Production Notes

- `DEMO_LOGIN` must be unset or not `"true"` on the deployed site. `signInAsDemo` signs
  anyone in as a demo account when it is `"true"`.
- `SESSION_SECRET` must be set in the host's environment settings. The cookie is `secure`
  in production, so it only works over https.

---

## Known Limits

- A signed token cannot be revoked before it expires, and a role change needs a new sign-in.
- No refresh token, no rate limiting, no password reset. Users are mock data in `lib/db.js`.
