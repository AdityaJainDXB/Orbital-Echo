import {getShortcuts} from './shortcuts.js';
import {ENGINES} from './search.js';
import {exportAll, setItem} from './storage.js';

export function initCommandPalette() {
   const palette = document.getElementById("command-palette");
  const trigger = document.getElementById("palette-trigger");
  const input = document.getElementById("command-input");
  const results = document.getElementById("command-results");

  function open() {
    palette.classList.remove("hidden");
    input.value = "";
    render(buildCommands(""));
    input.focus();
    }
function close() {
    palette.classList.add("hidden");
}
trigger.addEventListener("click", open);
document.addEventListener("keydown",(e) =>{
if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    palette.classList.contains("hidden") ? open() : close();
}
if (e.key === "Escape") close();
});
palette.addEventListener("click", (e) => e.target === palette && close());
  input.addEventListener("input", () => render(buildCommands(input.value)));

function render(commands) {
    results.innerHTML = "";
    if (commands.length === 0) {
        results.innerHTML = "<li class='no-results'>No results found</li>";
        return;
    }
    commands.slice(0, 8).forEach((cmd) => {
        const li = document.createElement("li");
        li.textContent = cmd.label;
        li.addEventListener("click", () => {
            cmd.action();
            close();
        });
        results.appendChild(li);
    });
}

function buildCommands(query) {
    const q = query.trim().toLowerCase();
    const commands = [];

    getShortcut().forEach((s) => commands.push({ label: `Open ${s.label}`, action: () => (window.location.href = s.url) }));

    Object.keys(ENGINES).forEach((engine) =>
        commands.push({
            label: 'Switch theme: ${theme}',
            action: () => {
                document.documentElement.dataset.theme = theme;
                setItem("theme", theme);
            },
        })
    );
    commands.push({label: "Export settings (download JSON)",  action: () => downloadJson(exportAll(), "orbital-echo-settings.json") });

    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
}

function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
}
