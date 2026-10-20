# Mesob Eats: performance (Day 46)

Measured on a production build (`npm run build` then `npm run start`, or the deployed
preview), mobile profile, throttled connection, in a private window. Fill **Before** after
all features are finished and before any optimisation. Fill **After** when the optimisation
pass is done. Leave nothing as a guess: if a number is missing, it is not measured yet.

## Budget

| Measure | Target | Before | After | Met? |
|---|---|---|---|---|
| LCP, throttled | Under 2.5 s | | | |
| CLS | Under 0.1 | | | |
| First Load JS, `/menu` | Under 120 kB | | | |
| Largest image | Under 150 kB | | | |
| Lighthouse performance | 90 or better | | | |

Where each number comes from:

| Measure | Source |
|---|---|
| LCP, CLS, Lighthouse performance | Lighthouse, mobile, on `/menu` and on one dish page |
| First Load JS | Network tab on `npm run start`: Disable cache on, JS filter, hard reload `/menu`, read the transferred total (the method used in `BOUNDARY.md`). This build does not print a size column. |
| Largest image | Network tab, Img filter, the largest transferred size on `/menu/[id]` |

## What changed between Before and After

One row per change. Name the number it moved.

| Change | File | Measure it moved | From | To |
|---|---|---|---|---|
| | | | | |

Things already done on Day 43 that belong here if they were part of this pass:
`next/image` with `sizes`, `priority` on one image only (the dish photo on `/menu/[id]`),
`next/font` for Playfair Display and Plus Jakarta Sans.

## Targets I missed, and why

If a number would not come down, write the reason here. A documented miss you understand is
worth more than a number you cannot explain.

| Measure | Result | Why it did not reach the target |
|---|---|---|
| | | |

## Known cost in this project

`getDishes` and `getDish` wait 1.5 s on purpose (`DELAY` in `app/menu/dishes.js`) to simulate a
slow data source. It affects build time and any request that is not prerendered. It should not
be counted as an optimisation target unless it is removed, and removing it should be recorded
in the change table above.

## Day 46 dashboard note

Day 46 added a dashboard route (`/dashboard`) with data representation components.
The dashboard displays summary metrics, chart components and tabular data. The
dashboard currently uses small sample datasets, so it does not create a noticeable
performance cost and was not a target of the optimisation pass.