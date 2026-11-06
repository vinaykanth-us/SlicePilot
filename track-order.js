/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   ORDER TRACKING — demo orders only.
   Kent Pizzeria is a fictional restaurant.
   ========================================== */

const demoOrders = {
    3001: {
        order_id: 3001,
        customer: "Maya",
        item: "Margarita Pizza (MED)",
        status: "out for delivery",
        eta: "2026-11-06 19:30"
    },
    3002: {
        order_id: 3002,
        customer: "Alex",
        item: "Meat Lovers Pizza (MED)",
        status: "preparing",
        eta: "2026-11-06 20:00"
    },
    3003: {
        order_id: 3003,
        customer: "Maya",
        item: "Premium Veggie Pizza (MED)",
        status: "delivered",
        eta: "2026-11-05 19:15"
    }
};

const statusConfig = {
    "order received": { step: 0, message: "Your order has been received!" },
    "preparing": { step: 1, message: "Your pizza is being prepared!" },
    "out for delivery": { step: 2, message: "Your order is on its way!" },
    "delivered": { step: 3, message: "Your order has been delivered. Enjoy your pizza!" }
};

const STEPS = ["Order received", "Preparing", "Out for delivery", "Delivered"];

function findOrder(orderNumber) {
    const n = Number(orderNumber);
    if (!orderNumber || isNaN(n)) return null;
    return demoOrders[n] || null;
}

function orderStatusHtml(order) {
    const cfg = statusConfig[order.status] || statusConfig["order received"];
    let stepsHtml = STEPS.map(function (label, i) {
        let cls = "";
        if (i < cfg.step) cls = "done";
        else if (i === cfg.step) cls = "current";
        return '<div class="timeline-step ' + cls + '">' + label + '</div>';
    }).join("");

    return '' +
        '<div class="order-summary">' +
        '<p><strong>Order #' + order.order_id + '</strong> — ' + order.customer + '</p>' +
        '<p>Item: ' + order.item + '</p>' +
        '<p>Status: <strong>' + order.status + '</strong></p>' +
        '<p>ETA: ' + order.eta + '</p>' +
        '<p>' + cfg.message + '</p>' +
        '</div>' +
        '<div class="timeline">' + stepsHtml + '</div>' +
        '<p class="hint">Demo order — no real delivery is attached to this number.</p>';
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("trackingForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const orderNumber = document.getElementById("orderNumber").value.trim();
        const result = document.getElementById("trackingResult");
        const error = document.getElementById("trackingError");
        const order = findOrder(orderNumber);

        if (order) {
            result.innerHTML = orderStatusHtml(order);
            result.classList.remove("hidden");
            error.classList.add("hidden");
        } else {
            error.classList.remove("hidden");
            result.classList.add("hidden");
        }
    });
});
