# Mesob House: rendering and server strategy (Day 39)

## Pages

| Route | Strategy | Why |
|---|---|---|
| / | Static | Story and address don't change between builds |
| /menu | Dynamic | Reads searchParams for the category filter |
| /menu/[id] | Static via generateStaticParams | All 20 dishes are known at build time |
| /cart | Static shell + client | CartList reads the person's private cart state |
| /checkout | Dynamic | force-dynamic; the form posts through a server action |
| /orders | Dynamic | force-dynamic; the list changes with every order and cancel |

## Endpoints (route handlers)

| Endpoint | Method | Success | Errors |
|---|---|---|---|
| /api/dishes | GET | 200, array of dishes | none |
| /api/dishes/[id] | GET | 200, one dish | 404 `{ error: "No such dish" }` |
| /api/orders | POST | 201, the new order | 400 broken JSON; 422 `{ error, fieldErrors }` |

Every error uses one shape: `{ "error": "...", "fieldErrors": { ... } }`.

## Server actions (app/actions.js)

| Action | Used by | Checks inside the action |
|---|---|---|
| placeOrder | CheckoutForm | Validates with the shared orderSchema, then revalidatePath("/orders") |
| cancelOrder | CancelButton | Session exists, order exists, order.userId equals the session user |

## Which tool, and why

| Job | Tool | Reason |
|---|---|---|
| Render the menu and orders | Server component | Reads data directly; no endpoint needed |
| Place or cancel an order from our own UI | Server action | No URL or fetch to write |
| Let an outside caller create an order | Route handler | Something outside our UI calls it |

## Where the security checks are

- The schema runs on the server in both `placeOrder` and `POST /api/orders`.
- `cancelOrder` looks the order up and compares its owner to the session. It never trusts the id from the browser.
- Hiding the Cancel button would only be interface. Tampering with the hidden `orderId` still returns "Not yours".