/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   Shared scripts: nav
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
    // Highlight the current page in the nav
    const page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
        if (a.getAttribute("href") === page) a.classList.add("active");
    });
});
