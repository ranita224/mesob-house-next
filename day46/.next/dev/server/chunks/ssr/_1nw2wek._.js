module.exports = [
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/signin/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "007aad7d6e4ec2b949fd4263e24353165e3de25064",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$signin$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/app/signin/actions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/signin/actions.js [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/signin/actions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/signin/actions.js [app-rsc] (ecmascript)");
;
}),
"[project]/app/signin/actions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"007aad7d6e4ec2b949fd4263e24353165e3de25064":{"name":"signOut"},"40eed9d6573c4ada3e72429844cadbe23b9cf1289f":{"name":"signInAsDemo"},"6079362f87a5590ce2d7096c6e8ff1606401b236b9":{"name":"signIn"}},"app/signin/actions.js",""] */ __turbopack_context__.s([
    "signIn",
    ()=>signIn,
    "signInAsDemo",
    ()=>signInAsDemo,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/session.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/authHelpers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function signIn(prevState, formData) {
    const phone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePhone"])(formData.get("phone"));
    const password = String(formData.get("password") ?? "");
    const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeNext"])(formData.get("next"));
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findUserByPhone"])(phone);
    const ok = user && await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(password, user.passwordHash);
    if (!ok) {
        return {
            error: "Phone number or password is incorrect",
            phone
        };
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])(user);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(next);
}
async function signInAsDemo(formData) {
    if (process.env.DEMO_LOGIN !== "true") (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/signin");
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findUserByPhone"])("0944444444");
    if (!user) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/signin");
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])(user);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$authHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["safeNext"])(formData.get("next")));
}
async function signOut() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$session$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["destroySession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    signIn,
    signInAsDemo,
    signOut
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signIn, "6079362f87a5590ce2d7096c6e8ff1606401b236b9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signInAsDemo, "40eed9d6573c4ada3e72429844cadbe23b9cf1289f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signOut, "007aad7d6e4ec2b949fd4263e24353165e3de25064", null);
}),
"[project]/lib/authHelpers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizePhone",
    ()=>normalizePhone,
    "safeNext",
    ()=>safeNext
]);
function normalizePhone(raw) {
    const p = String(raw ?? "").replace(/[\s-]+/g, "");
    return p.startsWith("+251") ? "0" + p.slice(4) : p;
}
function safeNext(value) {
    if (typeof value !== "string" || !value.startsWith("/")) return "/";
    try {
        const url = new URL(value, "http://localhost");
        if (url.origin !== "http://localhost") return "/";
        return url.pathname + url.search;
    } catch  {
        return "/";
    }
}
}),
"[project]/lib/db.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrder",
    ()=>createOrder,
    "createUser",
    ()=>createUser,
    "db",
    ()=>db,
    "findUserByPhone",
    ()=>findUserByPhone,
    "getAllOrders",
    ()=>getAllOrders,
    "getDish",
    ()=>getDish,
    "getOrder",
    ()=>getOrder,
    "getOrdersFor",
    ()=>getOrdersFor,
    "markCancelled",
    ()=>markCancelled
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
;
const mockDishes = [
    {
        id: "dish_1",
        name: "Doro Wat",
        description: "Traditional spicy chicken stew served with injera and boiled egg.",
        price: 350,
        currency: "ETB",
        category: "Main",
        available: true
    },
    {
        id: "dish_2",
        name: "Beyaynetu",
        description: "Assorted vegan fasting dishes served on injera.",
        price: 220,
        currency: "ETB",
        category: "Vegetarian",
        available: true
    },
    {
        id: "dish_3",
        name: "Kitfo",
        description: "Minced beef seasoned with mitmita and niter kibbeh.",
        price: 400,
        currency: "ETB",
        category: "Main",
        available: true
    },
    {
        id: "dish_4",
        name: "Shiro Tegabeno",
        description: "Rich chickpea flour stew served bubbling hot in a clay pot.",
        price: 180,
        currency: "ETB",
        category: "Vegetarian",
        available: true
    }
];
const demoHash = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].hashSync("password123", 10);
const mockUsers = globalThis.__mockUsers ??= [
    {
        id: "user_addis_101",
        name: "Abebe Bikila",
        phone: "0911111111",
        role: "customer",
        passwordHash: demoHash
    },
    {
        id: "user_other_202",
        name: "Someone Else",
        phone: "0922222222",
        role: "customer",
        passwordHash: demoHash
    },
    {
        id: "user_raniya_001",
        name: "Raniya Ayalew",
        phone: "0944444444",
        role: "customer",
        passwordHash: demoHash
    }
];
const mockOrders = globalThis.__mockOrders ??= [
    {
        id: "ord_seed_1",
        name: "Someone Else",
        phone: "0922222222",
        dishId: "dish_1",
        quantity: 1,
        status: "PENDING",
        userId: "user_other_202",
        createdAt: new Date().toISOString()
    }
];
const db = {
    dish: {
        findMany: async ()=>[
                ...mockDishes
            ],
        findUnique: async ({ where })=>mockDishes.find((d)=>d.id === where.id) || null
    },
    order: {
        findMany: async ()=>[
                ...mockOrders
            ]
    }
};
async function getDish(id) {
    const dish = mockDishes.find((d)=>d.id === id);
    return dish || null;
}
async function findUserByPhone(phone) {
    return mockUsers.find((u)=>u.phone === phone) || null;
}
async function createUser({ name, phone, passwordHash }) {
    const user = {
        id: `user_${globalThis.crypto.randomUUID()}`,
        name,
        phone,
        role: "customer",
        passwordHash
    };
    mockUsers.push(user);
    return user;
}
async function createOrder(data, userId) {
    const newOrder = {
        id: `ord_${Math.floor(100 + Math.random() * 900)}`,
        ...data,
        status: "PENDING",
        userId,
        createdAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return newOrder;
}
async function getOrder(id) {
    const order = mockOrders.find((o)=>o.id === id);
    return order || null;
}
async function getOrdersFor(userId) {
    return mockOrders.filter((o)=>o.userId === userId);
}
async function getAllOrders() {
    return [
        ...mockOrders
    ];
}
async function markCancelled(id) {
    const order = mockOrders.find((o)=>o.id === id);
    if (!order) {
        throw new Error("Order not found");
    }
    order.status = "CANCELLED";
    order.updatedAt = new Date().toISOString();
    return order;
}
}),
"[project]/lib/session.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0065bbfca6650e86ca192378495cd93103a95299b9":{"name":"getSession"},"00ef80de8755e4f7877e57e8519b13d2af1e12e86b":{"name":"destroySession"},"40162d95a6aa9ce71d54801580541dcfa64f3ca969":{"name":"createSession"}},"lib/session.js",""] */ __turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "destroySession",
    ()=>destroySession,
    "getSession",
    ()=>getSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/token.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const COOKIE = "session";
async function getSession() {
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get(COOKIE)?.value;
    if (!token) return null;
    const payload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["verifyToken"])(token);
    if (!payload) return null;
    return {
        id: payload.id,
        name: payload.name,
        role: payload.role
    };
}
async function createSession(user) {
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$token$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signToken"])({
        id: user.id,
        name: user.name,
        role: user.role
    });
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).set(COOKIE, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/"
    });
}
async function destroySession() {
    (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).delete(COOKIE);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSession,
    createSession,
    destroySession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSession, "0065bbfca6650e86ca192378495cd93103a95299b9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createSession, "40162d95a6aa9ce71d54801580541dcfa64f3ca969", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(destroySession, "00ef80de8755e4f7877e57e8519b13d2af1e12e86b", null);
}),
"[project]/lib/token.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signToken",
    ()=>signToken,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [app-rsc] (ecmascript)");
;
const secretValue = process.env.SESSION_SECRET;
if (!secretValue) throw new Error("SESSION_SECRET is not set in .env.local");
const secret = new TextEncoder().encode(secretValue);
async function signToken(payload) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: "HS256"
    }).setIssuedAt().setExpirationTime("1d").sign(secret);
}
async function verifyToken(token) {
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret, {
            algorithms: [
                "HS256"
            ]
        });
        return payload;
    } catch  {
        return null;
    }
}
}),
];

//# sourceMappingURL=_1nw2wek._.js.map