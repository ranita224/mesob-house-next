# Mesob House: rendering strategy

| Route | Strategy | Why |
|---|---|---|
| / | Static | Story and address don't change between builds |
| /menu | Dynamic | Reads searchParams for the category filter, so the response depends on the request |
| /menu/[id] | Static via generateStaticParams | All 20 dishes are known at build time |
| /cart | Static shell + client | The page shell is static; CartList is a client component that reads the person's private cart state |
| /checkout | Dynamic | Depends on who is asking (session cookie, live pricing) |