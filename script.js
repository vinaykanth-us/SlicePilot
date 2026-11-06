/* ==========================================
   SlicePilot — Kent Pizzeria (Demo)
   Shared scripts: nav + AI call placeholder
   ========================================== */

/* Call Us (AI agent) — placeholder for now.
   No Retell link exists yet. When the Retell AI calling
   agent is created, this function will open its public
   orb link in a new tab. Never paste a private
   dashboard/test-panel link here. */
function callRestaurant() {
    const note = document.getElementById("aiCallNote");
    if (note) {
        note.classList.remove("hidden");
        note.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
        alert("The SlicePilot AI calling agent is not connected yet in this demo. It will be added here once it is set up in Retell.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Highlight the current page in the nav
    const page = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
        if (a.getAttribute("href") === page) a.classList.add("active");
    });
});
