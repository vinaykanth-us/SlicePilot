/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   CHECKOUT — demo only. No payment is collected.
   No real DoorDash / Uber delivery is booked.
   Card fields are demo only: use the test card
   4242 4242 4242 4242. Card details are never
   saved, stored, or sent anywhere.
   Orders are saved in the browser only.
   ========================================== */

function selectedDemoValue(name, fallback) {
    const picked = document.querySelector('input[name="' + name + '"]:checked');
    return picked ? picked.value : fallback;
}

function toggleCardFields() {
    const cardFields = document.getElementById("cardFields");
    if (!cardFields) return;
    if (selectedDemoValue("payMethod", "Secure payment link") === "Card") {
        cardFields.classList.remove("hidden");
    } else {
        cardFields.classList.add("hidden");
    }
}

function toggleBillingFields() {
    const billingFields = document.getElementById("billingFields");
    const billingSame = document.getElementById("billingSame");
    if (!billingFields || !billingSame) return;
    if (billingSame.checked) {
        billingFields.classList.add("hidden");
    } else {
        billingFields.classList.remove("hidden");
    }
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
    toggleCardFields();
    toggleBillingFields();
}

document.addEventListener("DOMContentLoaded", function () {
    loadCheckout();

    document.querySelectorAll('input[name="payMethod"]').forEach(function (radio) {
        radio.addEventListener("change", toggleCardFields);
    });

    const billingSame = document.getElementById("billingSame");
    if (billingSame) billingSame.addEventListener("change", toggleBillingFields);

    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("custName").value.trim();
        const address = document.getElementById("custAddress").value.trim();
        const apt = document.getElementById("custApt").value.trim();
        const city = document.getElementById("custCity").value.trim();
        const zip = document.getElementById("custZip").value.trim();
        const payMethod = selectedDemoValue("payMethod", "Secure payment link");
        const deliveryProvider = selectedDemoValue("deliveryProvider", "DoorDash");

        // City and ZIP code: demo only.
        if (!city) {
            alert("Please enter your city.");
            return;
        }
        if (!/^\d{5}(-\d{4})?$/.test(zip)) {
            alert("Please enter a 5-digit ZIP code, e.g. 06105.");
            return;
        }

        // Billing address (demo only): same as delivery, unless unchecked.
        let billAddress = address;
        let billApt = apt;
        let billCity = city;
        let billZip = zip;
        const billingSameEl = document.getElementById("billingSame");
        if (billingSameEl && !billingSameEl.checked) {
            billAddress = document.getElementById("billAddress").value.trim();
            billApt = document.getElementById("billApt").value.trim();
            billCity = document.getElementById("billCity").value.trim();
            billZip = document.getElementById("billZip").value.trim();
            if (!billAddress || !billCity || !/^\d{5}(-\d{4})?$/.test(billZip)) {
                alert("Please enter a billing street address, city, and 5-digit ZIP code.");
                return;
            }
        }
        const billingText = billAddress + (billApt ? ", " + billApt : "") + ", " + billCity + " " + billZip;

        // Demo-only card check: format only, never saved or sent.
        if (payMethod === "Card") {
            const cardName = document.getElementById("cardName").value.trim();
            const cardDigits = document.getElementById("cardNumber").value.replace(/\D/g, "");
            const expiry = document.getElementById("cardExpiry").value.trim();
            const cvv = document.getElementById("cardCvv").value.replace(/\D/g, "");
            const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
            if (!cardName || cardDigits.length !== 16 || !expiryOk || cvv.length < 3 || cvv.length > 4) {
                alert("Demo card only: please use the test card 4242 4242 4242 4242, expiry 12/28, CVV 123. Never enter a real card.");
                return;
            }
        }

        // Demo order number: next number after the demo orders 3001-3003
        const placed = JSON.parse(localStorage.getItem("slicepilot_demo_orders") || "[]");
        const orderNumber = 3004 + placed.length;

        // Never save card details: only the payment method name is saved.
        placed.push({
            order_id: orderNumber,
            customer: name,
            address: address,
            apt_demo: apt,
            city_demo: city,
            zip_code_demo: zip,
            billing_address_demo: billingText,
            total: cartTotal(),
            payment_method_demo: payMethod,
            delivery_provider_demo: deliveryProvider,
            placed_at: new Date().toISOString()
        });
        localStorage.setItem("slicepilot_demo_orders", JSON.stringify(placed));

        // Clear the cart and clear the demo card fields
        localStorage.removeItem(CART_KEY);
        updateCartBadge();
        ["cardName", "cardNumber", "cardExpiry", "cardCvv"].forEach(function (id) {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });

        document.getElementById("checkoutSummary").classList.add("hidden");
        const demoOptions = document.getElementById("demoOptionsGrid");
        if (demoOptions) demoOptions.classList.add("hidden");
        form.classList.add("hidden");
        const confirmBox = document.getElementById("orderConfirm");
        document.getElementById("confirmOrderNumber").textContent = "#" + orderNumber;
        document.getElementById("confirmName").textContent = name;
        document.getElementById("confirmPayment").textContent = payMethod + " (demo — no payment taken)";
        document.getElementById("confirmDelivery").textContent = deliveryProvider + " (demo — no courier booked)";
        document.getElementById("confirmCity").textContent = city;
        document.getElementById("confirmZip").textContent = zip;
        document.getElementById("confirmBilling").textContent = billingText + " (demo)";
        const aptLine = document.getElementById("confirmAptLine");
        if (apt) {
            document.getElementById("confirmApt").textContent = apt;
            aptLine.classList.remove("hidden");
        } else {
            aptLine.classList.add("hidden");
        }
        confirmBox.classList.remove("hidden");
    });
});
