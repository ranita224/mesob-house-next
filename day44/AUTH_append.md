
---

## Search Engines Are Not Access Control

Private routes (`/cart`, `/checkout`, `/orders`, `/orders/[id]`, `/kitchen`, `/signin`, `/register`)
are disallowed in `robots.js` and marked `noindex` so they stay out of search results.
That only keeps them out of a listing. Anyone who knows the address can still request the
page, and `robots.txt` is itself public. What actually protects a route is the session,
ownership and role checks above.
