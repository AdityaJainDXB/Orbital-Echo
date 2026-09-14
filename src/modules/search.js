export const ENGINES = {
  google: "https://www.google.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  bing: "https://www.bing.com/search?q=",
};

export function initSearch() {
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const select = document.getElementById("engine-select");

    const saved = localStorage.getItem("orbitalEcho:engine");
    if (saved) select.value = saved;

    select.addEventListener("change", () => localStorage.setItem("orbitalEcho:engine", select.value));

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (!query) return;
        window.location.href = (ENGINES[select.value] || ENGINES.google) + encodeURIComponent(query);
    });
    input.focus();
}