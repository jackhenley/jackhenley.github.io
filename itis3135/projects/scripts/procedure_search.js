const PROCEDURE_FILES = [
    "procedures/abcess_drainage.html",
    "procedures/biliary_drain_placement.html",
    "procedures/dialysis_catheter_placement.html",
    "procedures/gallbladder_drain_placement.html",
    "procedures/nephrostomy_tube_placement.html",
    "procedures/percutaneous_biopsy.html",
    "procedures/percutaneous_gastrostomy.html",
    "procedures/picc_line_placement.html",
    "procedures/vertebroplasty.html",
];

async function fetchProcedureTitle(url) {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const title = doc.querySelector("title")?.textContent.trim() ?? url;
    return { title, url };
}

async function loadProcedures() {
    const results = await Promise.all(PROCEDURE_FILES.map(fetchProcedureTitle));
    return results;
}

function renderResults(procedures, query, listEl) {
    listEl.innerHTML = "";

    if (!query) {
        listEl.style.display = "none";
        return;
    }

    const lower = query.toLowerCase();
    const matches = procedures.filter(p => p.title.toLowerCase().includes(lower));

    if (matches.length === 0) {
        const item = document.createElement("li");
        item.className = "search-no-results";
        item.textContent = "No procedures found.";
        listEl.appendChild(item);
    } else {
        matches.forEach(p => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = p.url;
            link.textContent = p.title;
            item.appendChild(link);
            listEl.appendChild(item);
        });
    }

    listEl.style.display = "block";
}

async function initSearch() {
    const wrapper = document.getElementById("procedure-search-wrapper");
    const input = document.getElementById("procedure-search-input");
    const list = document.getElementById("procedure-search-results");

    if (!wrapper || !input || !list) return;

    const procedures = await loadProcedures();

    input.addEventListener("input", () => {
        renderResults(procedures, input.value.trim(), list);
    });
}

document.addEventListener("DOMContentLoaded", initSearch);
