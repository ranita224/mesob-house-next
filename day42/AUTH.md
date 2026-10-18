# Auth

Sign-in uses a phone number and password. Passwords are stored as bcrypt hashes.
The session is a signed token (JWT, HS256, 1 day) held in a cookie named `session`.
The cookie is `httpOnly`, `sameSite: "lax"`, and `secure` in production
(it is not `secure` on http://localhost). The secret is `SESSION_SECRET` in `.env.local`.

Demo accounts (password `password123`):
- 0911111111 customer (Abebe)
- 0922222222 customer (Someone Else, owns seed order `ord_seed_1`)
- 0933333333 staff

## Protected routes and actions

| Route or action | Middleware (proxy.js) | Page | Inside the action/handler | What proves it |
|---|---|---|---|---|
| /menu, /menu/[id] | none | none | none | Public on purpose |
| /checkout | yes | session check | none | Proxy: signed, unexpired cookie. Page: session |
| /orders | yes | session check, `getOrdersFor(user.id)` | none | Query is scoped to the session id, never an id from the request |
| /orders/[id] | yes | session + ownership (`notFound`) | none | Owner id compared to the session id |
| GET /api/orders/[id] | no | n/a | session (401) + ownership (403) | Real check |
| POST /api/orders | no | n/a | session (401), owner set from session | Real check |
| placeOrder | n/a | n/a | session, owner set from session | Real check |
| cancelOrder | n/a | n/a | session + ownership | Authentication and authorisation, separately |
| /kitchen | no | session + `role === "staff"` | n/a | Role read from the signed token on the server |

The proxy only proves a valid cookie exists. It is not the security. The checks inside
actions and handlers are.

## Open redirect

`next` is only accepted if it starts with `/` and resolves to the same origin.
`https://example.com`, `//example.com` and `/\example.com` all fall back to `/`.

## Registration

Anyone can create an account at /register. The server validates the name, the phone
number (normalised, so +2519… and 09… are the same) and a password of 8 to 72 characters.
Passwords are stored as bcrypt hashes. New accounts are always `customer`: the form has
no role field, so staff accounts only come from seed data. A duplicate phone number is
rejected. After registering, the person is signed in and sent to a safe `next` destination.

## Hiding the link

The Orders and Kitchen links in the header are shown by AuthNav from /api/me. That is
interface only. A customer who types /kitchen is refused by the role check in
app/kitchen/page.js, and a signed-out visitor to /orders is redirected by proxy.js and
by the page. Hiding a link protects nothing; the server checks do.

## Known limits

- A signed token cannot be revoked before it expires, and a role change needs a new sign-in.
- No refresh token, no rate limiting, no password reset. Users are mock data in `lib/db.js`.