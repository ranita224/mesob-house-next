(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/providers.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const KEY = "mesob_cart";
function isValid(item) {
    return item && typeof item.id === "string" && typeof item.name === "string" && typeof item.price === "number" && Number.isInteger(item.quantity) && item.quantity > 0;
}
function Providers({ children }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loaded, setLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Providers.useEffect": ()=>{
            try {
                const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
                if (Array.isArray(saved)) setItems(saved.filter(isValid));
            } catch  {}
            setLoaded(true);
        }
    }["Providers.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Providers.useEffect": ()=>{
            if (!loaded) return;
            try {
                localStorage.setItem(KEY, JSON.stringify(items));
            } catch  {}
        }
    }["Providers.useEffect"], [
        items,
        loaded
    ]);
    const addItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Providers.useCallback[addItem]": (dish)=>{
            setItems({
                "Providers.useCallback[addItem]": (current)=>{
                    const existing = current.find({
                        "Providers.useCallback[addItem].existing": (item)=>item.id === dish.id
                    }["Providers.useCallback[addItem].existing"]);
                    if (existing) {
                        return current.map({
                            "Providers.useCallback[addItem]": (item)=>item.id === dish.id ? {
                                    ...item,
                                    quantity: item.quantity + 1
                                } : item
                        }["Providers.useCallback[addItem]"]);
                    }
                    return [
                        ...current,
                        {
                            id: dish.id,
                            name: dish.name,
                            price: dish.price,
                            quantity: 1
                        }
                    ];
                }
            }["Providers.useCallback[addItem]"]);
        }
    }["Providers.useCallback[addItem]"], []);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Providers.useCallback[clearCart]": ()=>{
            setItems({
                "Providers.useCallback[clearCart]": (current)=>current.length ? [] : current
            }["Providers.useCallback[clearCart]"]);
        }
    }["Providers.useCallback[clearCart]"], []);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Providers.useMemo[value]": ()=>{
            const total = items.reduce({
                "Providers.useMemo[value].total": (sum, item)=>sum + item.price * item.quantity
            }["Providers.useMemo[value].total"], 0);
            return {
                items,
                cart: items,
                total,
                addItem,
                addToCart: addItem,
                clearCart
            };
        }
    }["Providers.useMemo[value]"], [
        items,
        addItem,
        clearCart
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.jsx",
        lineNumber: 62,
        columnNumber: 10
    }, this);
}
_s(Providers, "Vmk/RriEej47JTYrMvanPFhirw0=");
_c = Providers;
function useCart() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
}
_s1(useCart, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/signin/data:f275d3 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signOut",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"007aad7d6e4ec2b949fd4263e24353165e3de25064":{"name":"signOut"}},"app/signin/actions.js",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("007aad7d6e4ec2b949fd4263e24353165e3de25064", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "signOut");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AuthNav.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$emll9s78$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/use-swr-emll9s78.mjs [app-client] (ecmascript) <export u as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fetcher.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$data$3a$f275d3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/signin/data:f275d3 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function AuthNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { data, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$emll9s78$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"])(`/api/me?at=${encodeURIComponent(pathname)}`, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fetcher$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetcher"], {
        keepPreviousData: true
    });
    const user = data?.user ?? null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-x-6 gap-y-2",
        children: [
            user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/orders",
                className: "hover:text-maroon",
                children: "Orders"
            }, void 0, false, {
                fileName: "[project]/components/AuthNav.jsx",
                lineNumber: 21,
                columnNumber: 9
            }, this),
            user?.role === "staff" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/kitchen",
                className: "hover:text-maroon",
                children: "Kitchen"
            }, void 0, false, {
                fileName: "[project]/components/AuthNav.jsx",
                lineNumber: 24,
                columnNumber: 9
            }, this),
            user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                action: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$signin$2f$data$3a$f275d3__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["signOut"],
                onSubmit: ()=>mutate({
                        user: null
                    }, false),
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-amber-200 bg-amber-50 px-4 py-2 font-semibold text-maroon",
                        children: [
                            "Hi, ",
                            user.name.split(" ")[0]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AuthNav.jsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "rounded-full border border-paprika px-4 py-2 text-sm font-semibold text-paprika hover:bg-paprika hover:text-white",
                        children: "Sign out"
                    }, void 0, false, {
                        fileName: "[project]/components/AuthNav.jsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AuthNav.jsx",
                lineNumber: 28,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/signin",
                className: "rounded-full bg-paprika px-5 py-2 text-sm font-semibold text-white hover:bg-maroon",
                children: "Sign in"
            }, void 0, false, {
                fileName: "[project]/components/AuthNav.jsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AuthNav.jsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(AuthNav, "9rGoVD0Gq9B87otm4jgqipp3ZfE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$use$2d$swr$2d$emll9s78$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__u__as__default$3e$__["default"]
    ];
});
_c = AuthNav;
var _c;
__turbopack_context__.k.register(_c, "AuthNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CartCount.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CartCount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/providers.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CartCount() {
    _s();
    const { items = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])() || {};
    const count = items.reduce((sum, item)=>sum + item.quantity, 0);
    if (count === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "ml-1 rounded-full bg-paprika px-2 py-0.5 text-xs font-semibold text-white",
        children: count
    }, void 0, false, {
        fileName: "[project]/components/CartCount.jsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_s(CartCount, "R2nJtOhg2yPjJYtrs0LfYKoxyZE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$providers$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = CartCount;
var _c;
__turbopack_context__.k.register(_c, "CartCount");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/fetcher.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetcher",
    ()=>fetcher
]);
async function fetcher(url) {
    const res = await fetch(url);
    if (!res.ok) {
        const error = new Error("Request failed");
        error.status = res.status;
        throw error;
    }
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1tt3bhr._.js.map