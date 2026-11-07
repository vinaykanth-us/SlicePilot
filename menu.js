/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   MENU DATA — sample menu for this fictional demo only.
   These are demo prices, NOT a real restaurant's
   prices. $0.00 entries on the
   source page were skipped as unpriced variants.
   Kent Pizzeria is a fictional restaurant.
   ========================================== */

const DEMO_MENU_NOTE = "Sample menu for this fictional demo; prices are demo prices, not a real restaurant's.";

const SIZES = ["XS", "SM", "MED", "LG", "XL"];
const STD = { XS: 15.39, SM: 22.54, MED: 25.84, LG: 30.24, XL: 35.74 };

const menuItems = [
    // ---------- PIZZAS ----------
    { id: 1, img: "assets/pizza-bbq-chicken.jpg", name: "BBQ Chicken Pizza", category: "Pizzas", emoji: "🍗", desc: "BBQ chicken pizza.", sizes: Object.assign({}, STD) },
    { id: 2, img: "assets/pizza-buffalo-chicken-bleu.jpg", name: "Buffalo Chicken Chunky Bleu Cheese Pizza", category: "Pizzas", emoji: "🌶️", desc: "Buffalo chicken with chunky bleu cheese.", sizes: Object.assign({}, STD) },
    { id: 3, img: "assets/pizza-buffalo.jpg", name: "Buffalo Pizza", category: "Pizzas", emoji: "🌶️", desc: "Buffalo sauce pizza.", sizes: Object.assign({}, STD) },
    { id: 4, img: "assets/pizza-cheese.jpg", name: "Cheese Pizza", category: "Pizzas", emoji: "🧀", desc: "Classic cheese pizza.", sizes: { XS: 9.89, SM: 17.04, MED: 19.24, LG: 21.44, XL: 24.74 } },
    { id: 5, img: "assets/pizza-chicken-bacon-ranch.jpg", name: "Chicken Bacon Ranch Pizza", category: "Pizzas", emoji: "🍗", desc: "Chicken, bacon and ranch.", sizes: Object.assign({}, STD) },
    { id: 6, img: "assets/pizza-chicken-primo.jpg", name: "Chicken Primo Pizza", category: "Pizzas", emoji: "🍗", desc: "Chicken primo pizza.", sizes: Object.assign({}, STD) },
    { id: 7, img: "assets/pizza-chicken-sundried-tomato.jpg", name: "Chicken Sun-Dried Tomato Pizza", category: "Pizzas", emoji: "🍅", desc: "Chicken with sun-dried tomato.", sizes: Object.assign({}, STD) },
    { id: 8, img: "assets/pizza-clam-casino.jpg", name: "Clam Casino Pizza", category: "Pizzas", emoji: "🦪", desc: "Clam casino pizza.", sizes: Object.assign({}, STD) },
    { id: 9, img: "assets/pizza-clam.jpg", name: "Clam Pizza", category: "Pizzas", emoji: "🦪", desc: "Clam pizza.", sizes: Object.assign({}, STD) },
    { id: 10, img: "assets/pizza-fiorentina.jpg", name: "Fiorentina Pizza", category: "Pizzas", emoji: "🍕", desc: "Fiorentina pizza.", sizes: Object.assign({}, STD) },
    { id: 11, img: "assets/pizza-four-cheese.jpg", name: "Four Cheese Pizza", category: "Pizzas", emoji: "🧀", desc: "Four cheese pizza.", sizes: { XS: 15.39, SM: 21.44, MED: 24.74, LG: 30.24, XL: 35.74 } },
    { id: 12, img: "assets/pizza-hawaiian.jpg", name: "Hawaiian Pizza", category: "Pizzas", emoji: "🍍", desc: "Ham and pineapple.", sizes: Object.assign({}, STD) },
    { id: 13, img: "assets/pizza-house-special.jpg", name: "House Special Pizza", category: "Pizzas", emoji: "⭐", desc: "The house special.", sizes: Object.assign({}, STD) },
    { id: 14, img: "assets/pizza-italiana.jpg", name: "Italiana Pizza", category: "Pizzas", emoji: "🇮🇹", desc: "Italiana pizza. No XS size.", sizes: { SM: 22.54, MED: 25.84, LG: 30.24, XL: 35.74 } },
    { id: 15, img: "assets/pizza-margarita.jpg", name: "Margarita Pizza", category: "Pizzas", emoji: "🍅", desc: "Margarita pizza.", sizes: { XS: 15.39, SM: 22.54, MED: 25.84, LG: 30.24 } },
    { id: 16, img: "assets/pizza-meat-lovers.jpg", name: "Meat Lovers Pizza", category: "Pizzas", emoji: "🥩", desc: "Loaded with meats.", sizes: Object.assign({}, STD) },
    { id: 17, img: "assets/pizza-eggplant.jpg", name: "Eggplant Pizza", category: "Pizzas", emoji: "🍆", desc: "NEW! Eggplant pizza.", sizes: { XS: 15.39, SM: 22.54, MED: 24.74, LG: 30.24, XL: 35.74 } },
    { id: 18, img: "assets/pizza-honeyroni.jpg", name: "Honeyroni Pizza", category: "Pizzas", emoji: "🍯", desc: "NEW! Honeyroni pizza.", sizes: { XS: 15.39, SM: 22.54, MED: 24.74, LG: 30.24, XL: 35.74 } },
    { id: 19, img: "assets/pizza-lasagna.jpg", name: "Lasagna Pizza", category: "Pizzas", emoji: "🍝", desc: "NEW! Lasagna pizza. Temporarily unavailable in this demo.", sizes: Object.assign({}, STD), available: false },
    { id: 20, img: "assets/pizza-pesto-tomato.jpg", name: "Pesto Tomato Pizza", category: "Pizzas", emoji: "🌿", desc: "Pesto and tomato.", sizes: Object.assign({}, STD) },
    { id: 21, img: "assets/pizza-premium-veggie.jpg", name: "Premium Veggie Pizza", category: "Pizzas", emoji: "🥦", desc: "Premium veggie pizza.", sizes: Object.assign({}, STD) },
    { id: 22, img: "assets/pizza-sarantino.jpg", name: "Sarantino Pizza", category: "Pizzas", emoji: "🍕", desc: "Sarantino pizza.", sizes: { XS: 15.39, SM: 22.54, MED: 25.84, LG: 30.24, XL: 36.29 } },
    { id: 23, img: "assets/pizza-shrimp-pesto.jpg", name: "Shrimp Pesto Pizza", category: "Pizzas", emoji: "🍤", desc: "Shrimp with pesto.", sizes: { XS: 16.49, SM: 22.54, MED: 25.84, LG: 30.24, XL: 35.74 } },
    { id: 24, img: "assets/pizza-steak.jpg", name: "Steak Pizza", category: "Pizzas", emoji: "🥩", desc: "Steak pizza.", sizes: Object.assign({}, STD) },
    { id: 25, img: "assets/pizza-veggie.jpg", name: "Veggie Pizza", category: "Pizzas", emoji: "🥗", desc: "Veggie pizza.", sizes: { XS: 15.39, SM: 22.54, MED: 25.74, LG: 30.24, XL: 35.74 } },

    // ---------- APPETIZERS ----------
    { id: 26, img: "assets/app-mac-n-cheese.jpg", name: "Homemade Mac N Cheese", category: "Appetizers", emoji: "🧀", desc: "NEW! Homemade mac n cheese.", price: 10.99 },
    { id: 27, img: "assets/app-fried-mozzarella.jpg", name: "Fried Mozzarella (6 PC)", category: "Appetizers", emoji: "🧀", desc: "6 pieces of fried mozzarella.", price: 8.79 },
    { id: 28, img: "assets/app-chicken-fingers.jpg", name: "Chicken Fingers (7 PC)", category: "Appetizers", emoji: "🍗", desc: "7 pieces of chicken fingers.", price: 16.49 },
    { id: 29, img: "assets/app-waffle-fries.jpg", name: "Waffle Fries", category: "Appetizers", emoji: "🍟", desc: "NEW! Waffle fries.", price: 8.24 },
    { id: 30, img: "assets/app-french-fries.jpg", name: "French Fries", category: "Appetizers", emoji: "🍟", desc: "French fries.", price: 7.69 },
    { id: 31, img: "assets/app-french-fries.jpg", name: "Fried Dough with Sugar", category: "Appetizers", emoji: "🍩", desc: "Fried dough with sugar.", price: 8.24 },
    { id: 32, img: "assets/app-french-fries.jpg", name: "Curly Fries", category: "Appetizers", emoji: "🍟", desc: "Curly fries.", price: 8.24 },
    { id: 33, img: "assets/app-tri-sampler.jpg", name: "Tri Sampler", category: "Appetizers", emoji: "🍢", desc: "3 mozzarella sticks, 3 jalapeno poppers, 3 chicken fingers and marinara sauce.", price: 13.74 },
    { id: 34, img: "assets/app-onion-rings.jpg", name: "Onion Rings", category: "Appetizers", emoji: "🧅", desc: "Onion rings.", price: 8.24 },
    { id: 35, img: "assets/app-garlic-knots.jpg", name: "Garlic Bread", category: "Appetizers", emoji: "🍞", desc: "Garlic bread.", price: 7.14 },
    { id: 36, img: "assets/app-french-fries.jpg", name: "Zucchini Fries", category: "Appetizers", emoji: "🥒", desc: "Zucchini fries.", price: 8.24 },
    { id: 37, img: "assets/app-garlic-knots.jpg", name: "Garlic Bread with Cheese", category: "Appetizers", emoji: "🧀", desc: "Garlic bread with cheese.", price: 7.69 },
    { id: 38, img: "assets/app-jalapeno-poppers.jpg", name: "Jalapeno Poppers", category: "Appetizers", emoji: "🌶️", desc: "Jalapeno poppers.", price: 8.79 },
    { id: 39, img: "assets/app-chicken-fingers.jpg", name: "Grilled Chicken with Fries", category: "Appetizers", emoji: "🍗", desc: "Grilled chicken served with fries.", price: 14.84 },
    { id: 40, img: "assets/app-fried-mozzarella.jpg", name: "Fried Mushrooms", category: "Appetizers", emoji: "🍄", desc: "Fried mushrooms.", price: 8.79 },
    { id: 41, img: "assets/app-fried-shrimp.jpg", name: "Fried Jumbo Shrimp (7 PC)", category: "Appetizers", emoji: "🍤", desc: "7 pieces of fried jumbo shrimp.", price: 23.64 },
    { id: 42, img: "assets/app-french-fries.jpg", name: "Potato Skins", category: "Appetizers", emoji: "🥔", desc: "Potato skins.", price: 9.89 },

    // ---------- THIN CRUST FLATBREADS (well done) ----------
    { id: 43, img: "assets/flatbread-chicken-bacon-ranch.jpg", name: "Chicken Bacon Ranch Flatbread", category: "Flatbreads", emoji: "🫓", desc: "Grilled chicken, bacon, ranch sauce.", price: 23.09 },
    { id: 44, img: "assets/flatbread-buffalo-chicken.jpg", name: "Buffalo Chicken Flatbread", category: "Flatbreads", emoji: "🫓", desc: "Buffalo crispy chicken, bacon, hot sauce, ranch.", price: 23.09 },
    { id: 45, img: "assets/flatbread-classic.jpg", name: "Classic Flatbread", category: "Flatbreads", emoji: "🫓", desc: "Shaved beef steak, onion, green peppers, mushrooms.", price: 23.09 },
    { id: 46, img: "assets/flatbread-chicken-broccoli.jpg", name: "Chicken Broccoli Flatbread", category: "Flatbreads", emoji: "🫓", desc: "Grilled chicken, broccoli, fresh sliced tomato.", price: 23.09 },
    { id: 47, img: "assets/flatbread-pesto-chicken.jpg", name: "Pesto Chicken Flatbread", category: "Flatbreads", emoji: "🫓", desc: "Grilled chicken, pesto sauce, roasted peppers.", price: 23.09 },
    { id: 48, img: "assets/flatbread-chicken-sundried-tomato.jpg", name: "Grilled Chicken Sundried Tomato Flatbread", category: "Flatbreads", emoji: "🫓", desc: "White, grilled chicken, sun-dried tomatoes, roasted peppers, fresh garlic, olive oil.", price: 23.09 },

    // ---------- WINGS ----------
    { id: 49, img: "assets/wings-bone-in.jpg", name: "6 PC Wings", category: "Wings", emoji: "🍗", desc: "6 piece bone-in wings.", price: 12.09 },
    { id: 50, img: "assets/wings-boneless.jpg", name: "6 PC Boneless Wings", category: "Wings", emoji: "🍗", desc: "NEW! Bite-sized boneless wings.", price: 12.09 },
    { id: 51, img: "assets/wings-bone-in.jpg", name: "12 PC Wings", category: "Wings", emoji: "🍗", desc: "12 piece bone-in wings.", price: 23.09 },
    { id: 52, img: "assets/wings-boneless.jpg", name: "12 PC Boneless Wings", category: "Wings", emoji: "🍗", desc: "NEW! Bite-sized boneless wings.", price: 23.09 },
    { id: 53, img: "assets/wings-bone-in.jpg", name: "24 PC Wings", category: "Wings", emoji: "🍗", desc: "24 piece bone-in wings.", price: 39.59 }
];

const CART_KEY = "slicepilot_cart";

/* ---------- Cart: keys are "id" for single-price items, "id:SIZE" for pizzas ---------- */
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function findItem(id) {
    return menuItems.find(function (m) { return m.id === Number(id); });
}

function unitPrice(item, size) {
    if (item.sizes) return item.sizes[size] || item.sizes.MED;
    return item.price;
}

function cartEntries() {
    const cart = getCart();
    const entries = [];
    Object.keys(cart).forEach(function (key) {
        const parts = key.split(":");
        const item = findItem(parts[0]);
        if (!item) return;
        const size = parts[1] || null;
        entries.push({
            key: key,
            item: item,
            size: size,
            label: size ? item.name + " (" + size + ")" : item.name,
            unitPrice: unitPrice(item, size),
            qty: cart[key]
        });
    });
    return entries;
}

function cartCount() {
    return cartEntries().reduce(function (a, e) { return a + e.qty; }, 0);
}

function cartTotal() {
    return cartEntries().reduce(function (a, e) { return a + e.unitPrice * e.qty; }, 0);
}

function addToCart(id, size) {
    const item = findItem(id);
    if (!item || item.available === false) return;
    const key = item.sizes ? id + ":" + (size || "MED") : String(id);
    const cart = getCart();
    cart[key] = (cart[key] || 0) + 1;
    saveCart(cart);
    updateCartBadge();
    renderCartPanel();
}

function changeQty(key, delta) {
    const cart = getCart();
    cart[key] = (cart[key] || 0) + delta;
    if (cart[key] <= 0) delete cart[key];
    saveCart(cart);
    updateCartBadge();
    renderCartPanel();
}

function updateCartBadge() {
    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = cartCount();
}

/* ---------- Render menu ---------- */
let activeCategory = "All";
let searchText = "";
let selectedSize = {}; // item id -> size, default MED

function sizeFor(item) {
    const chosen = selectedSize[item.id];
    if (chosen && item.sizes[chosen] !== undefined) return chosen;
    if (item.sizes.MED !== undefined) return "MED";
    return Object.keys(item.sizes)[0];
}

function setSize(id, size) {
    selectedSize[id] = size;
    renderMenu();
}

function renderMenu() {
    const grid = document.getElementById("menuGrid");
    if (!grid) return;

    const filtered = menuItems.filter(function (item) {
        const inCategory = activeCategory === "All" || item.category === activeCategory;
        const inSearch = !searchText ||
            item.name.toLowerCase().includes(searchText) ||
            item.desc.toLowerCase().includes(searchText) ||
            item.category.toLowerCase().includes(searchText);
        return inCategory && inSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p class="lead">No items match your search. Try another name or category.</p>';
        const count0 = document.getElementById("menuCount");
        if (count0) count0.textContent = "Showing 0 of " + menuItems.length + " items";
        return;
    }

    grid.innerHTML = filtered.map(function (item) {
        const unavailable = item.available === false;
        let priceHtml = "";
        let buttonHtml = "";
        if (item.sizes) {
            const size = sizeFor(item);
            const sizeBtns = SIZES.filter(function (s) { return item.sizes[s] !== undefined; }).map(function (s) {
                return '<button class="size-btn' + (s === size ? ' active' : '') + '" onclick="setSize(' + item.id + ', \'' + s + '\')">' + s + '</button>';
            }).join("");
            priceHtml = '<div class="size-row">' + sizeBtns + '</div>' +
                '<span class="menu-price">$' + item.sizes[size].toFixed(2) + ' <small>(' + size + ')</small></span>';
            buttonHtml = unavailable
                ? '<span class="badge-unavailable">Unavailable</span><button class="btn" disabled>Unavailable</button>'
                : '<button class="btn" onclick="addToCart(' + item.id + ', \'' + size + '\')">Add to Order +</button>';
        } else {
            priceHtml = '<span class="menu-price">$' + item.price.toFixed(2) + '</span>';
            buttonHtml = '<button class="btn" onclick="addToCart(' + item.id + ')">Add to Order +</button>';
        }
        const imgHtml = item.img
            ? '<img class="menu-img" src="' + item.img + '" alt="' + item.name + '" loading="lazy">'
            : '<div class="menu-emoji">' + item.emoji + '</div>';
        return '' +
            '<div class="menu-card' + (unavailable ? ' unavailable' : '') + '">' +
            imgHtml +
            '<span class="menu-cat">' + item.category + '</span>' +
            '<h3>' + item.name + '</h3>' +
            '<p class="menu-desc">' + item.desc + '</p>' +
            priceHtml +
            buttonHtml +
            '</div>';
    }).join("");

    const count = document.getElementById("menuCount");
    if (count) count.textContent = "Showing " + filtered.length + " of " + menuItems.length + " items";
}

function renderCartPanel() {
    const panel = document.getElementById("cartPanel");
    if (!panel) return;
    const entries = cartEntries();
    if (entries.length === 0) {
        panel.innerHTML = '<h3>Your Order</h3><p class="cart-empty">Your cart is empty. Add something from the menu.</p>';
        return;
    }
    let html = '<h3>Your Order</h3>';
    entries.forEach(function (e) {
        html += '<div class="cart-line"><span>' + e.label + ' × ' + e.qty + '</span>' +
            '<span>$' + (e.unitPrice * e.qty).toFixed(2) + ' ' +
            '<button class="qty-btn" onclick="changeQty(\'' + e.key + '\', -1)">−</button> ' +
            '<button class="qty-btn" onclick="changeQty(\'' + e.key + '\', 1)">+</button></span></div>';
    });
    html += '<div class="cart-total"><span>Total</span><span>$' + cartTotal().toFixed(2) + '</span></div>';
    html += '<p class="hint">Demo checkout — no payment is collected.</p>';
    html += '<a class="btn" href="checkout.html">Go to Checkout</a>';
    panel.innerHTML = html;
}

/* ---------- Page wiring ---------- */
function setCategory(cat, btn) {
    activeCategory = cat;
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    if (btn) btn.classList.add("active");
    renderMenu();
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    renderCartPanel();
    renderMenu();

    const search = document.getElementById("menuSearch");
    if (search) {
        search.addEventListener("input", function () {
            searchText = search.value.trim().toLowerCase();
            renderMenu();
        });
    }
});
