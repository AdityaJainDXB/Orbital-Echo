import { getItem, setItem } from "./storage.js";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export async function initApodBackground(){
    const img = document.getElementById("apod-bg");
    const credit = document.getElementById("apod-credit");
    const today = new Date().toISOString().slice(0, 10);
    const cached = getItem("apod");

    if (cached && cached.date === today){
        apply(cached, img, credit);
        return;
    }

    try{
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        if (!res.ok) throw new Error("Failed to fetch APOD");
        const data = await res.json();
        const entry = {
             date: today,
            url: data.media_type === "image" ? data.hdurl || data.url : null,
            title: data.title,
            copyright: data.copyright || "NASA",
        }
        setItem("apod", entry);
        apply(entry, img, credit);
    } catch (err){
        console.error(err);
    if (cached) apply(cached, img, credit);
    else credit.textContent = "Background unavailable — check your NASA API key.";
  }
}

function apply(entry, img, credit){
    if (entry.url){
        img.src = entry.url;
        img.alt = entry.title || "NASA Astronomy Picture of the Day";
  }
  credit.textContent = entry.title ? `"${entry.title}" — ${entry.copyright} / NASA APOD` : "";
}
