# Mesob Eats: client-side data (Day 45)

Library: SWR. The client work is a poll, a search box and paged results, so the
smaller library fits. Everything else (menu, dish, landing page) stays in server
components, as on Day 38.

All three queries use one shared fetcher, `lib/fetcher.js`. It throws on a bad status
code, so SWR treats a 404 or 403 as an error and not as data.

## Where every piece of data is fetched

| Data | Where | Why |
|---|---|---|
| Menu and dishes | Server | Public, indexable, cacheable (ISR on `/menu`, static on `/menu/[id]`) |
| Order history (`/orders`) | Server | Private; `getOrdersFor(user.id)` scopes it to the session |
| Order status (`/orders/[id]`) | Server first, then polled on the client | The server renders the first view as `fallbackData`; SWR then polls every 5 s |
| Menu search | Client | Triggered by typing; 300 ms debounce, null key for an empty box |
| Paged dishes after page 1 | Client | The page number is read in the browser so `/dishes` stays static |
| Who is signed in (header) | Client | Reading the cookie in the root layout would make every route dynamic |
| Cart | Client store | Never leaves the browser |

The rule: server unless the person triggers it. Where a client query is unavoidable, the
first result is rendered on the server and passed in as `fallbackData`.

## Queries

| Query | Key | Refresh rule | Why |
|---|---|---|---|
| Order status (`OrderStatus.jsx`) | `/api/orders/${id}` | `refreshInterval` 5000 ms, stops once the order is CANCELLED; `fallbackData` = the order the server rendered | The status changes outside this tab (a cancel from another tab or a kitchen update). It is repeated and private to one person, so it cannot be built ahead of time. The server renders the first view, so no spinner shows on arrival. |
| Menu search (`SearchBox.jsx`) | `/api/dishes?q=${debounced}`, or null when the term is empty | No timer; default revalidation on focus and reconnect; `keepPreviousData` | Triggered by typing. A 300 ms debounce stops a request per keystroke. A null key means no request for an empty box. `keepPreviousData` stops the list flashing empty between terms. |
| Paged dishes (`PagedDishes.jsx`) | `/api/dishes?page=${page}` | No timer; `fallbackData` for page 1 only; `keepPreviousData` | The page number is part of the key and of the URL, so a page can be shared. Page 1 is rendered on the server (fast, indexable); later pages are fetched in the browser. |

## SWR settings and why

| Setting | Where | Reason |
|---|---|---|
| `refreshInterval` 5000 | Order status | Five seconds is quick enough for an order screen without hammering the server |
| `refreshInterval` as a function | Order status | Returns 0 once the order is CANCELLED, because nothing changes after that |
| `fallbackData` | Order status, page 1 | Shows server data immediately, so there is no loading state on first paint |
| `keepPreviousData` | Search, paging | Keeps the old results visible until the new ones arrive |
| null key | Search | Says "not yet" without breaking the rules of hooks |
| `dedupingInterval` (default, 2 s) | All | Two components asking for the same key share one request |
| `revalidateOnFocus` (default, on) | Search, paging | Refreshes when the person returns to the tab; turned off nowhere, because none of this data is static |

SWR has no `staleTime` setting. Its equivalent decisions are `refreshInterval` (how often
to poll) and `dedupingInterval` (how long to share a request). TanStack Query's
`staleTime` is not used in this project.

## What stays on the server

| What | How |
|---|---|
| Menu on arrival, dish detail, landing page | Server components |
| Order page first render | Server component that passes the order in as `fallbackData` |
| Placing and cancelling an order | Server actions (`app/actions.js`) |

## Endpoints used by the client

| Endpoint | Used by | Notes |
|---|---|---|
| `GET /api/orders/[id]` | `OrderStatus` | 401 not signed in, 403 not your order, 404 no such order |
| `GET /api/dishes?q=` | `SearchBox` | Matches name, Amharic name, category, description, ingredients |
| `GET /api/dishes?page=` | `PagedDishes` | 6 dishes per page; 400 for an invalid page |

On Day 40 `/api/dishes` had no caller of our own. Search and paging now call it, which
is what justifies keeping it.

## Verifying the live data

| Check | How | What you should see |
|---|---|---|
| Debounce | Network tab, Fetch/XHR filter, type `doro` in the menu search | One `/api/dishes?q=` request after you pause, not four |
| Empty box | Clear the search box | No request is sent |
| Seeding | Hard-reload `/orders/[id]` for your own order | The order shows on arrival, no spinner |
| Polling | Leave the order page open | A `/api/orders/[id]` request about every 5 seconds |
| Polling stops | Cancel the order | The requests stop once the status is CANCELLED |

Result of the last run: (date, what was seen).
