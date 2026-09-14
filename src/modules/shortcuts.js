import {getItem, setItem} from "./storage.js";

const DEFAULTS = [
  { id: "yt", label: "YouTube", url: "https://youtube.com" },
  { id: "gh", label: "GitHub", url: "https://github.com" },
  { id: "gmail", label: "Gmail", url: "https://mail.google.com" },
  { id: "slack", label: "Slack", url: "https://slack.com" },
  { id: "stardance", label: "Stardance", url: "https://stardance.hackclub.com/home" },
];

let shortcuts = getItem("shortcuts", DEFAULTS);

function save(){
    setItem("shortcuts", shortcuts);
}

function favicon(url){
    try{
        return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
    }catch {
        return "";
    }
    }
export function getShortcuts(){
    return shortcuts;
}

export function initShortcuts(){
    render(document.getElementById("shortcuts"));
}

function render(container){
    container.innerHTML = "";
    shortcuts.forEach((s,index) => {
        const el = document.createElement("a")
        el.href = s.url;
        el.className = "shortcut";
        el.draggable = true;
        el.innerHTML = `<img src="${favicon(s.url)}" alt="" /><span>${s.label}</span><button class="shortcut-remove" title="Remove">×</button>`;

        el.querySelector(".shortcut-remove").addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            shortcuts.splice(index, 1);
            save();
            render(container);
        });
        el.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", index);
            e.classList.add("dragging");
        });
         el.addEventListener("dragend", () => el.classList.remove("dragging"));
        el.addEventListener("dragover", (e) => e.preventDefault());
        el.addEventListener("drop", (e) => {
            e.preventDefault();
            const from = Number(e.dataTransfer.getData("text/plain"));
            const [moved] = shortcuts.splice(from, 1);
            shortcuts.splice(index, 0, moved);
            save();
            render(container);
        });
        container.appendChild(el);
        
    });

    const addBtn = document.createElement("button");
    addBtn.className = "shortcut shortcut-add";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", () => {
        const label = prompt("Shortcut name:");
        if (!label) return;
        let url = prompt("URL:");
        if (!url) return;
        if (!/^https?:\/\//.test(url)) url = "https://" + url;
        shortcuts.push({id:crypto.randomUUID(), label,url});
        save();
        render(container);
    });
    container.appendChild(addBtn);
}