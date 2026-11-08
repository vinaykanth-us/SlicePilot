/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   CHECKOUT — demo only. No payment is collected.
   No real DoorDash / Uber delivery is booked.
   Orders are saved in the browser only.
   ========================================== */

function selectedDemoValue(name, fallback) {
    const picked = document.querySelector('input[name="' + name + '"]:checked');
    return picked ? picked.value : fallback;
}

function loadCheckout() {
    const summary = document.getElementById("checkoutSummary");
    const empty = document.getElementById("checkoutEmpty");
    const form = document.getElementById("checkoutForm");
    const demoOptions = document.getElementById("demoOptionsGrid");
    const paymentTotal = document.getElementById("paymentTotal");
    if (!summary) return;

    const cart = getCart();
    const ids = Object.keys(cart);
    if (ids.length === 0) {
        summary.classList.add("hidden");
        form.classList.add("hidden");
        if (demoOptions) demoOptions.classList.add("hidden");
        empty.classList.remove("hidden");
        return;
    }

    let html = "";
    cartEntries().forEach(function (e) {
        html += '<div class="cart-line"><span>' + e.label + ' × ' + e.qty + '</span>' +
            '<span>$' + (e.unitPrice * e.qty).toFixed(2) + '</span></div>';
    });
    html += '<div class="cart-total"><span>Total (demo)</span><span>$' + cartTotal().toFixed(2) + '</span></div>';
    summary.innerHTML = html;
    if (paymentTotal) paymentTotal.textContent = "$" + cartTotal().toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
    loadCheckout();

    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("custName").value.trim();
        const address = document.getElementById("custAddress").value.trim();
        const payMethod = selectedDemoValue("payMethod", "Secure payment link");
        const deliveryProvider = selectedDemoValue("deliveryProvider", "DoorDash");

        // Demo order number: next number after the demo orders 3001-3003
        const placed = JSON.parse(localStorage.getItem("slicepilot_demo_orders") || "[]");
        const orderNumber = 3004 + placed.length;

        placed.push({
            order_id: orderNumber,
            customer: name,
            address: address,
            total: cartTotal(),
            payment_method_demo: payMethod,
            delivery_provider_demo: deliveryProvider,
            placed_at: new Date().toISOString()
        });
        localStorage.setItem("slicepilot_demo_orders", JSON.stringify(placed));

        // Clear the cart
        localStorage.removeItem(CART_KEY);
        updateCartBadge();

        document.getElementById("checkoutSummary").classList.add("hidden");
        const demoOptions = document.getElementById("demoOptionsGrid");
        if (demoOptions) demoOptions.classList.add("hidden");
        form.classList.add("hidden");
        const confirmBox = document.getElementById("orderConfirm");
        document.getElementById("confirmOrderNumber").textContent = "#" + orderNumber;
        document.getElementById("confirmName").textContent = name;
        document.getElementById("confirmPayment").textContent = payMethod + " (demo — no payment taken)";
        document.getElementById("confirmDelivery").textContent = deliveryProvider + " (demo — no courier booked)";
        confirmBox.classList.remove("hidden");
    });
});
