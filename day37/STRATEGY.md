# Mesob House: rendering strategy

| Route | Strategy | Why |
|---|---|---|
| / | Static | Story and address don't change between builds |
| /menu | ISR, 1 hour | Dishes change occasionally; speed matters most |
| /menu/[id] | Static via generateStaticParams | Every dish is known at build time |
| /cart | Client | It's the person's own private state |
| /checkout | Dynamic | Depends on who is asking (session cookie, live pricing) |