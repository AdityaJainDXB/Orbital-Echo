import {getItem, setItem} from './storage.js';

export function initTheme() {
    document.body.classList.add(getItem("theme", "nebula"));

    const trigger = document.getElementById("theme-trigger");
    const menu = document.getElementById("theme-menu");
    
    trigger.addEventListener("click", () => menu.classList.toggle("hidden"));

    menu.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.documentElement.dataset.theme = btn.dataset.theme;
            setItem("theme", btn.dataset.theme);
            menu.classList.add("hidden");
        });
    });
document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== trigger) menu.classList,add("hidden");
});

}
