/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   HELP & SUPPORT — tickets are browser-local only.
   Nothing is sent to the restaurant.
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("supportForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("supName").value.trim();
        const category = document.getElementById("supCategory").value;
        const desc = document.getElementById("supDesc").value.trim();

        // Demo ticket number — browser-local only, not sent anywhere
        const ticket = "TKT-3001";

        // Store the demo ticket locally so it can be referenced in this browser
        const tickets = JSON.parse(localStorage.getItem("slicepilot_demo_tickets") || "[]");
        tickets.push({ ticket: ticket, name: name, category: category, issue: desc, at: new Date().toISOString() });
        localStorage.setItem("slicepilot_demo_tickets", JSON.stringify(tickets));

        document.getElementById("ticketNumber").textContent = "#" + ticket;
        document.getElementById("ticketName").textContent = name;
        document.getElementById("ticketCategory").textContent = category;
        form.classList.add("hidden");
        document.getElementById("ticketSuccess").classList.remove("hidden");
    });

    const copyBtn = document.getElementById("copyTicket");
    if (copyBtn) {
        copyBtn.addEventListener("click", function () {
            const num = document.getElementById("ticketNumber").textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(num);
                copyBtn.textContent = "Copied!";
            }
        });
    }

    const againBtn = document.getElementById("anotherRequest");
    if (againBtn) {
        againBtn.addEventListener("click", function () {
            document.getElementById("ticketSuccess").classList.add("hidden");
            form.reset();
            form.classList.remove("hidden");
        });
    }
});
