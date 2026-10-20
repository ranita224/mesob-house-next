module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.2vob68tjqpejf.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/app/menu/dishes.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAGE_SIZE",
    ()=>PAGE_SIZE,
    "categories",
    ()=>categories,
    "categorySlug",
    ()=>categorySlug,
    "dishes",
    ()=>dishes,
    "getCategories",
    ()=>getCategories,
    "getDish",
    ()=>getDish,
    "getDishes",
    ()=>getDishes,
    "paginate",
    ()=>paginate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$menu$2f$menu$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/menu/menu.json.[json].cjs [app-rsc] (ecmascript)");
;
const dishes = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$menu$2f$menu$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].data.map((item)=>({
        id: item.slug,
        name: item.nameEn,
        nameAm: item.nameAm,
        category: item.category,
        price: item.priceETB,
        description: item.description,
        ingredients: item.ingredients,
        spiceLevel: item.spiceLevel,
        servings: item.servings,
        isFasting: item.isFasting,
        isSpecial: item.isSpecial
    }));
const categories = [
    ...new Set(dishes.map((dish)=>dish.category))
];
const DELAY = 1500;
const wait = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
async function getCategories() {
    return categories;
}
async function getDishes() {
    await wait(DELAY);
    return dishes;
}
async function getDish(id) {
    await wait(DELAY);
    return dishes.find((dish)=>dish.id === id);
}
const categorySlug = (category)=>category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const PAGE_SIZE = 6;
function paginate(list, page) {
    const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    const current = Math.min(Math.max(1, page), pageCount);
    const start = (current - 1) * PAGE_SIZE;
    return {
        items: list.slice(start, start + PAGE_SIZE),
        total: list.length,
        page: current,
        pageCount
    };
}
}),
"[project]/app/menu/menu.json.[json].cjs [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "status": "ok",
    "data": [
        {
            "id": "menu-1",
            "slug": "doro-wat",
            "nameEn": "Classic Doro Wat",
            "nameAm": "የዶሮ ወጥ",
            "category": "Traditional Stews & Wat",
            "priceETB": 650,
            "spiceLevel": "Fiery Berbere (3/3)",
            "isFasting": false,
            "isSpecial": true,
            "description": "Slow-simmered highland chicken simmered in rich caramelized shallots, 12-spice berbere, and organic niter kibbeh with a hard-boiled egg.",
            "ingredients": [
                "Free-range chicken",
                "Berbere",
                "Niter Kibbeh",
                "Farm Egg",
                "Red Onions",
                "Garlic",
                "Ginger"
            ],
            "servings": "Serves 1-2 generously"
        },
        {
            "id": "menu-2",
            "slug": "siga-wat",
            "nameEn": "Prime Siga Wat (Beef Stew)",
            "nameAm": "የስጋ ወጥ",
            "category": "Traditional Stews & Wat",
            "priceETB": 580,
            "spiceLevel": "Medium-Hot (2/3)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Tender grass-fed beef chuck cubes slowly braised in deep berbere gravy until meltingly tender.",
            "ingredients": [
                "Prime Beef",
                "Highland Berbere",
                "Niter Kibbeh",
                "Cardamom",
                "Garlic"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-3",
            "slug": "beg-alicha-wat",
            "nameEn": "Beg Alicha Wat (Mild Lamb Stew)",
            "nameAm": "የበግ አልጫ ወጥ",
            "category": "Traditional Stews & Wat",
            "priceETB": 620,
            "spiceLevel": "Mild (Turmeric & Ginger)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Fragrant, mild highland lamb stew slow-cooked with fresh ginger, turmeric roots, garlic, and wild rosemary.",
            "ingredients": [
                "Highland Lamb",
                "Fresh Turmeric",
                "Ginger",
                "Clarified Spiced Butter",
                "Garlic"
            ],
            "servings": "Serves 1-2"
        },
        {
            "id": "menu-4",
            "slug": "shiro-tegamino",
            "nameEn": "Clay-Pot Shiro Tegamino",
            "nameAm": "ሽሮ ተጋሚኖ",
            "category": "Traditional Stews & Wat",
            "priceETB": 420,
            "spiceLevel": "Medium (1/3)",
            "isFasting": true,
            "isSpecial": false,
            "description": "Spiced chickpea and broad bean stew whipped with herbs and extra virgin seed oil, served boiling hot in earthenware.",
            "ingredients": [
                "Chickpea flour",
                "Cardamom",
                "Garlic",
                "Shallots",
                "Seed Oil",
                "Green Chili"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-5",
            "slug": "shiro-bozena",
            "nameEn": "Shiro Bozena (Beef Enriched Shiro)",
            "nameAm": "ሽሮ ቦዘና",
            "category": "Traditional Stews & Wat",
            "priceETB": 490,
            "spiceLevel": "Medium-Hot (2/3)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Traditional spiced chickpea puree enriched with savoury diced prime beef morsels and fragrant niter kibbeh.",
            "ingredients": [
                "Chickpea Flour",
                "Beef Bites",
                "Spiced Butter",
                "Berbere",
                "Garlic"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-6",
            "slug": "siga-derek-tibs",
            "nameEn": "Crisp Siga Derek Tibs",
            "nameAm": "የደረቅ ስጋ ጥብስ",
            "tagline": "Crispy pan-fried prime beef with Awaze",
            "category": "Tibs & Grills",
            "priceETB": 620,
            "spiceLevel": "Chef Signature Crisp",
            "isFasting": false,
            "isSpecial": true,
            "description": "Pan-charred pasture beef chunks seared with garden rosemary sprigs, seared jalapeño rounds, served with house Awaze dip.",
            "ingredients": [
                "Prime Tenderloin Beef",
                "Rosemary",
                "Jalapeño",
                "Garlic",
                "Awaze Paste"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-7",
            "slug": "awaze-lamb-tibs",
            "nameEn": "Awaze Lamb Tibs",
            "nameAm": "የበግ አዋዜ ጥብስ",
            "category": "Tibs & Grills",
            "priceETB": 680,
            "spiceLevel": "Fiery Hot Awaze (3/3)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Succulent lamb tenderloin morsels wok-fried with our proprietary Awaze chili glaze, red shallots, and fresh thyme.",
            "ingredients": [
                "Highland Lamb",
                "House Awaze",
                "Red Onions",
                "Rosemary",
                "Butter"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-8",
            "slug": "quanta-firfir",
            "nameEn": "Spicy Quanta Firfir",
            "nameAm": "የቋንጣ ፍርፍር",
            "category": "Tibs & Grills",
            "priceETB": 540,
            "spiceLevel": "Robust Berbere (2/3)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Sun-dried house-cured highland beef jerky shredded and sautéed in rich berbere butter gravy, laced with shredded teff injera.",
            "ingredients": [
                "House Quanta Jerky",
                "Teff Injera Pieces",
                "Berbere",
                "Niter Kibbeh",
                "Shallots"
            ],
            "servings": "Serves 1-2"
        },
        {
            "id": "menu-9",
            "slug": "chornake-fish-tibs",
            "nameEn": "Lake Tana Crispy Fish Tibs",
            "nameAm": "የዓሳ ጥብስ",
            "category": "Tibs & Grills",
            "priceETB": 560,
            "spiceLevel": "Zesty Lemon & Chili (1/3)",
            "isFasting": true,
            "isSpecial": false,
            "description": "Fresh golden pan-crisped freshwater tilapia chunks dusted with korarima and served with spicy mitmita salt and lime.",
            "ingredients": [
                "Fresh Tilapia fillet",
                "Korarima",
                "Lime",
                "Garlic oil",
                "Mitmita"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-10",
            "slug": "prime-beef-kitfo",
            "nameEn": "Prime Beef Kitfo",
            "nameAm": "የከብት ስጋ ክትፎ",
            "category": "Raw & Cured Delicacies / Kitfo",
            "priceETB": 720,
            "spiceLevel": "Choice: Leb-Leb or Raw",
            "isFasting": false,
            "isSpecial": true,
            "description": "Finely minced extra-lean tenderloin beef steeped in warm aromatic herbal butter and fiery orange mitmita spice blend.",
            "ingredients": [
                "Top sirloin",
                "Niter Kibbeh",
                "Mitmita",
                "Cardamom seed powder"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-11",
            "slug": "gored-gored",
            "nameEn": "Highland Gored Gored",
            "nameAm": "ጎረድ ጎረድ",
            "category": "Raw & Cured Delicacies / Kitfo",
            "priceETB": 750,
            "spiceLevel": "Extra Hot Mitmita (3/3)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Succulent raw tenderloin beef cut into neat geometric bite-sized cubes, rolled in fiery mitmita chili and melted herbal butter.",
            "ingredients": [
                "Raw Prime Tenderloin",
                "Melted Ghee",
                "Mitmita",
                "Awaze dip"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-12",
            "slug": "kitfo-dulet",
            "nameEn": "Addis Style Dulet",
            "nameAm": "ዱለት",
            "category": "Raw & Cured Delicacies / Kitfo",
            "priceETB": 580,
            "spiceLevel": "Spicy & Tangy (2/3)",
            "isFasting": false,
            "isSpecial": false,
            "description": "Traditional minced beef, tripe, and liver seasoned with finely chopped green peppers, shallots, and fragrant niter kibbeh.",
            "ingredients": [
                "Minced Beef & Offal",
                "Jalapeño",
                "Red Onion",
                "Mitmita",
                "Niter Kibbeh"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-13",
            "slug": "full-vegan-beyaynetu",
            "nameEn": "Full Vegan Beyaynetu Platter",
            "nameAm": "የጾም በያይነቱ ድልድል",
            "category": "Fasting & Vegan / Tsom",
            "priceETB": 480,
            "spiceLevel": "Varied Spices (1-2/3)",
            "isFasting": true,
            "isSpecial": true,
            "description": "Grand rainbow tasting platter of Misir Wat, Kik Alicha, braised Gomen, sweet Fosolia with carrots, and Atakilt Wat.",
            "ingredients": [
                "Lentils",
                "Split peas",
                "Collard greens",
                "Carrots & Green beans",
                "Cabbage & Potatoes"
            ],
            "servings": "Serves 1-2 generously"
        },
        {
            "id": "menu-14",
            "slug": "misir-wat",
            "nameEn": "Highland Red Misir Wat",
            "nameAm": "የምስር ወጥ",
            "category": "Fasting & Vegan / Tsom",
            "priceETB": 360,
            "spiceLevel": "Warm Berbere (2/3)",
            "isFasting": true,
            "isSpecial": false,
            "description": "Split red lentils simmered gently in rich spiced berbere sauce, caramelized red onions, and cold-pressed sunflower oil.",
            "ingredients": [
                "Red lentils",
                "Berbere",
                "Shallots",
                "Garlic",
                "Sunflower oil"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-15",
            "slug": "kik-alicha-wat",
            "nameEn": "Golden Kik Alicha",
            "nameAm": "የክክ አልጫ ወጥ",
            "category": "Fasting & Vegan / Tsom",
            "priceETB": 340,
            "spiceLevel": "Mild Herb Fragrant (1/3)",
            "isFasting": true,
            "isSpecial": false,
            "description": "Yellow split peas slow-cooked to a buttery creaminess with garlic, ginger, and golden turmeric broth.",
            "ingredients": [
                "Yellow split peas",
                "Turmeric",
                "Garlic",
                "Ginger",
                "White onions"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-16",
            "slug": "gomen-collards",
            "nameEn": "Braised Ye'abesha Gomen",
            "nameAm": "የሀበሻ ጎመን",
            "category": "Fasting & Vegan / Tsom",
            "priceETB": 320,
            "spiceLevel": "Mild & Savory (1/3)",
            "isFasting": true,
            "isSpecial": false,
            "description": "Tender young collard greens braised with sweet garlic, sliced shallots, and fresh green jalapeños.",
            "ingredients": [
                "Collard greens",
                "Garlic cloves",
                "Green chilies",
                "Onions",
                "Cold-pressed oil"
            ],
            "servings": "Serves 1"
        },
        {
            "id": "menu-17",
            "slug": "fresh-timatim-fitfit",
            "nameEn": "Fresh Timatim Fitfit",
            "nameAm": "ቲማቲም ፍትፍት",
            "category": "Fasting & Vegan / Tsom",
            "priceETB": 280,
            "spiceLevel": "Cooling & Tangy (1/3)",
            "isFasting": true,
            "isSpecial": false,
            "description": "Crisp heirloom tomatoes, minced red shallots, and sliced green peppers tossed with torn cold injera and tangy mustard dressing.",
            "ingredients": [
                "Fresh tomatoes",
                "Injera pieces",
                "Shallots",
                "Mustard dressing",
                "Jalapeño"
            ],
            "servings": "Serves 1 (Great as side)"
        },
        {
            "id": "menu-18",
            "slug": "house-tej-carafe",
            "nameEn": "House Fermented Tej (500ml Carafe)",
            "nameAm": "የማር ጠጅ",
            "category": "Beverages & Tej",
            "priceETB": 350,
            "spiceLevel": "Pure Sweet Ferment",
            "isFasting": true,
            "isSpecial": true,
            "description": "Traditional golden mead naturally fermented for 21 days with pure highland wildflower honey and bitter gesho wood.",
            "ingredients": [
                "Pure Wild Honey",
                "Gesho Wood",
                "Spring Water"
            ],
            "servings": "500ml Flask (11% ABV)"
        },
        {
            "id": "menu-19",
            "slug": "jebena-spiced-coffee",
            "nameEn": "Traditional Jebena Coffee",
            "nameAm": "የጀበና ቡና",
            "category": "Beverages & Tej",
            "priceETB": 80,
            "spiceLevel": "Smoky & Aromatic",
            "isFasting": true,
            "isSpecial": false,
            "description": "Addis-style freshly roasted Yirgacheffe arabica beans boiled in clay Jebena with a hint of tenadam rue herb.",
            "ingredients": [
                "Yirgacheffe Coffee Beans",
                "Tenadam Herb (optional)",
                "Cardamom"
            ],
            "servings": "Ceremonial Sini Cup"
        },
        {
            "id": "menu-20",
            "slug": "spiced-habesha-chai",
            "nameEn": "Highland Spiced Shai",
            "nameAm": "የቅመም ሻይ",
            "category": "Beverages & Tej",
            "priceETB": 80,
            "spiceLevel": "Cardamom & Cinnamon Infusion",
            "isFasting": true,
            "isSpecial": false,
            "description": "Slow-infused black highland tea leaves brewed with crushed cinnamon bark, fragrant cardamom pods, and cloves.",
            "ingredients": [
                "Black tea leaves",
                "Cinnamon",
                "Cardamom",
                "Cloves",
                "Ginger root"
            ],
            "servings": "Served hot with raw cane sugar"
        }
    ]
};
}),
"[project]/app/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$menu$2f$dishes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/menu/dishes.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/site.js [app-rsc] (ecmascript)");
;
;
;
;
;
const metadata = {
    description: "Order Doro Wat, Tibs, Kitfo and Shiro from kitchens in Bole and Kazanchis. Delivery across Addis Ababa, paid with TeleBirr.",
    alternates: {
        canonical: "/"
    }
};
const restaurantLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Mesob Eats",
    url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$site$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_URL"],
    servesCuisine: "Ethiopian",
    areaServed: "Addis Ababa"
};
function HomePage() {
    const specials = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$menu$2f$dishes$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["dishes"].filter((dish)=>dish.isSpecial);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "p-8 max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(restaurantLd).replace(/</g, "\\u003c")
                }
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold",
                children: "Mesob Eats"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-gray-600",
                children: "Ethiopian food, delivered across Addis Ababa."
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-8 text-xl font-bold",
                children: "Today's specials"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-4 space-y-4",
                children: specials.map((dish, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-4 rounded-2xl bg-white p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-blush",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    src: `/images/dishes/${dish.id}.png`,
                                    alt: dish.name,
                                    width: 96,
                                    height: 96,
                                    priority: index === 0,
                                    className: "object-cover h-full w-full"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 42,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/menu/${dish.id}`,
                                        className: "font-semibold underline text-lg",
                                        children: dish.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-paprika font-bold mt-1",
                                        children: [
                                            dish.price,
                                            " birr"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-500 mt-1 line-clamp-2",
                                        children: dish.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this)
                        ]
                    }, dish.id, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                href: "/menu",
                className: "mt-8 inline-block underline font-medium",
                children: "See the full menu →"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.js [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.js [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0a65_-z._.js.map