/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   AI ASSISTANT — browser-only demo.
   No API key, no data sent anywhere.
   Uses the real menu from menu.js and the
   demo orders 3001-3003. Never invents items.
   ========================================== */

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
}

function menuList() {
    if (typeof menuItems === "undefined" || !Array.isArray(menuItems)) return [];
    return menuItems.filter(function (m) { return m.available !== false; });
}

function priceFor(item, size) {
    if (item.sizes) return item.sizes[size] || item.sizes.MED || Object.values(item.sizes)[0];
    return item.price;
}

function itemCardHtml(item, size) {
    const price = priceFor(item, size || "MED");
    const img = item.img
        ? '<img class="menu-img" src="' + escapeHtml(item.img) + '" alt="' + escapeHtml(item.name) + '" loading="lazy">'
        : "";
    const btn = (typeof addToCart === "function")
        ? '<button class="btn" onclick="addToCart(' + item.id + ', \'' + (size || "MED") + '\')">Add to Order +</button>'
        : '<a class="btn" href="menu.html">See on Menu</a>';
    return '<div class="card">' + img +
        '<span class="menu-cat">' + escapeHtml(item.category) + '</span>' +
        '<h3>' + escapeHtml(item.name) + '</h3>' +
        '<p class="menu-desc">' + escapeHtml(item.desc) + '</p>' +
        '<span class="menu-price">$' + Number(price).toFixed(2) + ' <small>(' + (size || "MED") + ')</small></span>' +
        btn + '</div>';
}

/* ---------- AI Pizza Finder ---------- */
function scorePizza(item, craving, spice) {
    if (item.category !== "Pizzas") return -1;
    const name = (item.name + " " + item.desc).toLowerCase();
    let score = 0;
    const has = function (re) { return re.test(name); };
    if (craving === "meaty" && has(/chicken|meat|steak|bbq|bacon|shrimp|clam|hawaiian|pepperoni|sausage/)) score += 3;
    if (craving === "veggie" && has(/veggie|eggplant|margarita|pesto|tomato|mushroom|garden/)) score += 3;
    if (craving === "cheesy" && has(/cheese|mozzarella|four cheese/)) score += 3;
    if (craving === "spicy" && has(/buffalo|jalapeno|spicy|hot|nashville/)) score += 3;
    if (craving === "any") score += 1;
    if (spice === "mild" && has(/cheese|margarita|veggie/) && !has(/buffalo|jalapeno/)) score += 2;
    if (spice === "medium" && has(/bbq|chicken|bacon|ranch/)) score += 2;
    if (spice === "hot" && has(/buffalo|jalapeno|spicy/)) score += 2;
    if (spice === "any") score += 1;
    return score;
}

function runFinder() {
    const results = document.getElementById("finderResults");
    if (!results) return;
    const craving = document.getElementById("finderCraving").value;
    const spice = document.getElementById("finderSpice").value;
    const size = document.getElementById("finderSize").value || "MED";
    const items = menuList();
    if (!items.length) {
        results.innerHTML = '<p class="lead">Menu is still loading — please try again in a moment.</p>';
        return;
    }
    const ranked = items
        .map(function (item) { return { item: item, score: scorePizza(item, craving, spice) }; })
        .filter(function (r) { return r.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 3);
    if (!ranked.length) {
        results.innerHTML = '<p class="lead">No pizza matched that exactly — try “Anything” and “Any spice”.</p>';
        return;
    }
    results.innerHTML = ranked.map(function (r) { return itemCardHtml(r.item, size); }).join("");
    results.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- AI Chat (demo) ---------- */
const DEMO_ORDERS = {
    "3001": "Order 3001 — Margarita Pizza (MED) — out for delivery.",
    "3002": "Order 3002 — Meat Lovers Pizza (MED) — preparing.",
    "3003": "Order 3003 — Premium Veggie Pizza (MED) — delivered."
};

function botReply(q) {
    const text = q.toLowerCase();
    const items = menuList();
    const matchNum = text.match(/300[1-3]/);
    if (matchNum && DEMO_ORDERS[matchNum[0]]) {
        return DEMO_ORDERS[matchNum[0]] + "\nTrack it live on the Track Order page. Demo only — these are sample orders.";
    }
    if (/wing/.test(text)) {
        const wings = items.filter(function (m) { return m.category === "Wings"; }).slice(0, 3);
        if (!wings.length) return "Wings are on the menu page — try the Menu for the full list.";
        return "Our wings (demo prices):\n" + wings.map(function (w) {
            return "• " + w.name + " — $" + Number(priceFor(w)).toFixed(2);
        }).join("\n") + "\nWant me to find a pizza to go with them?";
    }
    if (/help|ticket|support|problem/.test(text)) {
        return "I can help — demo only. Raise a support request on the Help & Support page and you will get a demo ticket number, handled in your browser.";
    }
    if (/deliver|doordash|uber/.test(text)) {
        return "Delivery is demo only. At checkout you can pick DoorDash or Uber Eats as the demo delivery choice — no real courier is booked.";
    }
    if (/pay|payment|card|price|cost|how much/.test(text)) {
        return "Payment is demo only — no real payment is taken. At checkout pick Secure payment link, Card (test card 4242 4242 4242 4242), or Pay at pickup. Never enter a real card.";
    }
    if (/pizza|find|recommend|suggest|spicy|veggie|meaty|cheesy|hungry/.test(text)) {
        let picks = items.filter(function (m) { return m.category === "Pizzas"; });
        if (/spicy|hot|buffalo/.test(text)) picks = picks.filter(function (m) { return /buffalo|jalapeno|spicy/i.test(m.name); });
        if (/veggie|vegetarian/.test(text)) picks = picks.filter(function (m) { return /veggie|eggplant|margarita|pesto/i.test(m.name); });
        if (/meat|chicken|steak/.test(text)) picks = picks.filter(function (m) { return /chicken|meat|steak|bbq|bacon/i.test(m.name); });
        if (/cheese/.test(text)) picks = picks.filter(function (m) { return /cheese/i.test(m.name); });
        picks = picks.slice(0, 3);
        if (!picks.length) picks = items.filter(function (m) { return m.category === "Pizzas"; }).slice(0, 3);
        if (!picks.length) return "Try the AI Pizza Finder on the home page — it picks from the real menu.";
        return "Here are 3 picks from the real menu (MED, demo prices):\n" + picks.map(function (p) {
            return "• " + p.name + " — $" + Number(priceFor(p, "MED")).toFixed(2);
        }).join("\n") + "\nTap “Find my pizza” on the home page for a full AI pick, or add one from the Menu.";
    }
    if (/hello|hi\b|hey/.test(text)) {
        return "Hi! I am the SlicePilot AI — demo only, running in your browser. Ask me for a pizza pick, wings, or “track order 3001”.";
    }
    if (/open|hours|where|address|location/.test(text)) {
        return "Kent Pizzeria is a fictional demo restaurant at 112 Ashley Street, Hartford, CT. No real orders or deliveries.";
    }
    return "I can help with the menu, a pizza pick, demo orders 3001–3003, delivery and payment (demo only). Try: “Find me a spicy pizza” or “Track order 3001”.";
}

function addChatMsg(text, who) {
    const body = document.getElementById("aiChatBody");
    if (!body) return;
    const div = document.createElement("div");
    div.className = "ai-msg " + who;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

function handleChat(text) {
    const q = text.trim();
    if (!q) return;
    addChatMsg(q, "user");
    setTimeout(function () { addChatMsg(botReply(q), "bot"); }, 350);
}

document.addEventListener("DOMContentLoaded", function () {
    const finderBtn = document.getElementById("finderBtn");
    if (finderBtn) finderBtn.addEventListener("click", runFinder);

    const chatBtn = document.getElementById("aiChatBtn");
    const chatPanel = document.getElementById("aiChatPanel");
    const chatClose = document.getElementById("aiChatClose");
    if (chatBtn && chatPanel) {
        chatBtn.addEventListener("click", function () {
            chatPanel.classList.toggle("hidden");
            const body = document.getElementById("aiChatBody");
            if (body && !body.hasChildNodes()) {
                addChatMsg("Hi! I am the SlicePilot AI — demo only. Ask me for a pizza pick, wings, or “track order 3001”.", "bot");
            }
        });
    }
    if (chatClose && chatPanel) chatClose.addEventListener("click", function () { chatPanel.classList.add("hidden"); });

    document.querySelectorAll(".ai-chat-chips button").forEach(function (chip) {
        chip.addEventListener("click", function () { handleChat(chip.getAttribute("data-q") || chip.textContent); });
    });

    const chatForm = document.getElementById("aiChatForm");
    const chatInput = document.getElementById("aiChatInput");
    if (chatForm && chatInput) {
        chatForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const value = chatInput.value;
            chatInput.value = "";
            handleChat(value);
        });
    }
});
