const PROCEDURE_FILES = [
    "procedures/abcess_drainage.html",
    "procedures/biliary_drain_placement.html",
    "procedures/dialysis_catheter_placement.html",
    "procedures/gallbladder_drain_placement.html",
    "procedures/nephrostomy_tube_placement.html",
    "procedures/percutaneous_biopsy.html",
    "procedures/percutaneous_gastrostomy.html",
    "procedures/picc_line_placement.html",
    "procedures/vertebroplasty.html"
];

async function fetchProcedureTitle(url) {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const titleEl = doc.querySelector("title");
    const title = titleEl ? titleEl.textContent.trim() : url;
    const summaryEl = doc.querySelector(".accordion-content p");
    const summary = summaryEl ? summaryEl.textContent.trim() : "";
    return { title, url, summary };
}

async function loadProcedures() {
    const results = await Promise.all(PROCEDURE_FILES.map(fetchProcedureTitle));
    return results;
}

let tooltip = null;

function createTooltip() {
    tooltip = document.createElement("div");
    tooltip.id = "procedure-tooltip";
    tooltip.style.display = "none";
    document.body.appendChild(tooltip);
}

function showTooltip(item, summary) {
    if (!summary) return;
    tooltip.textContent = summary;
    tooltip.style.display = "block";

    const rect = item.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY + 6}px`;
    tooltip.style.left = `${rect.left}px`;

    const tipRect = tooltip.getBoundingClientRect();
    if (tipRect.bottom > window.innerHeight) {
        tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 6}px`;
    }
    if (tipRect.right > window.innerWidth) {
        tooltip.style.left = `${window.innerWidth - tooltip.offsetWidth - 12}px`;
    }
}

function hideTooltip() {
    if (tooltip) tooltip.style.display = "none";
}

function makeProcedureItem(p) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = p.url;
    link.textContent = p.title;
    item.appendChild(link);
    item.addEventListener("mouseenter", () => showTooltip(item, p.summary));
    item.addEventListener("mouseleave", hideTooltip);
    return item;
}

function renderResults(procedures, query, listEl) {
    listEl.innerHTML = "";

    if (!query) {
        listEl.style.display = "none";
        return;
    }

    const lower = query.toLowerCase();
    const matches = procedures.filter((p) => p.title.toLowerCase().includes(lower));

    if (matches.length === 0) {
        const item = document.createElement("li");
        item.className = "search-no-results";
        item.textContent = "No procedures found.";
        listEl.appendChild(item);
    } else {
        matches.forEach((p) => listEl.appendChild(makeProcedureItem(p)));
    }

    listEl.style.display = "block";
}

function renderAllProcedures(procedures, listEl) {
    const sorted = [...procedures].sort((a, b) => a.title.localeCompare(b.title));
    listEl.innerHTML = "";
    sorted.forEach((p) => listEl.appendChild(makeProcedureItem(p)));
}

async function initSearch() {
    createTooltip();
    const wrapper = document.getElementById("procedure-search-wrapper");
    const input = document.getElementById("procedure-search-input");
    const list = document.getElementById("procedure-search-results");
    const allBtn = document.getElementById("all-procedures-btn");
    const allList = document.getElementById("all-procedures-list");

    if (!wrapper || !input || !list) return;

    const procedures = await loadProcedures();

    input.addEventListener("input", () => {
        renderResults(procedures, input.value.trim(), list);
    });

    if (allBtn && allList) {
        renderAllProcedures(procedures, allList);
        allBtn.addEventListener("click", () => {
            const isVisible = allList.style.display === "block";
            allList.style.display = isVisible ? "none" : "block";
            allBtn.textContent = isVisible ? "All Procedures" : "Hide Procedures";
        });
    }
}

document.addEventListener("DOMContentLoaded", initSearch);
