# 🛰️ Orbital Echo

A custom browser new tab page with live NASA Backgrounds, astronomy information as well as a Windows XP style look . Instead of a blank tab or a generic dashboard, Orbital Echo turns every new tab into a live mission briefing , pulling live NASA data into a fast, distraction-free workspace.

**Live site:** https://adityajaindxb.github.io/Orbital-Echo/


---

## What it does

- **Live NASA background** — Astronomy Picture of the Day (APOD) as the wallpaper, refreshed daily based on APOD, with full credit/attribution
- **Space weather** — real-time solar flare and geomagnetic storm data from NASA's  Free DONKI API
- **ISS next pass** — calculates the next visible ISS pass over your location using live orbital data
-  **Multi-engine search** — quick switch between Google, DuckDuckGo, and Bing
-  **Customizable shortcuts** — add, remove, and drag-to-reorder your own quick links
-  **Mission log (todo list)** — lightweight task tracker/to-do list, persisted locally
- ⌘K **Command palette** — keyboard-driven quick actions (open shortcuts, search, switch themes, export settings)
-  **Theming** — Nebula / Solar Flare / Deep Space color palettes
-  **Local persistence** — everything (shortcuts, tasks, theme, settings) saved via `localStorage`, with JSON export function to save settings and come back the next day!

---

## Tech stack

- **HTML, CSS, JavaScript** — vanilla, no framework
- **Vite** — dev server and build tool
- **NASA APIs:**
  - [APOD](https://api.nasa.gov/) — Astronomy Picture of the Day
  - [DONKI](https://ccmc.gsfc.nasa.gov/tools/DONKI/) — solar flares (FLR) and geomagnetic storms (GST)
- **[G7VRD Satellite Pass API](https://g7vrd.co.uk/public-satellite-pass-rest-api)** — ISS pass predictions

---

## Running it locally

1. Clone the repo:
```bash
   git clone https://github.com/<your-username>/orbital-echo.git
   cd orbital-echo
```

2. Install dependencies:
```bash
   npm install
```

3. Get a free NASA API key at [api.nasa.gov](https://api.nasa.gov/), then create a `.env` file in the project root:
