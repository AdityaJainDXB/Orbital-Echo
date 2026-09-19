# Orbital Echo

A custom browser new tab page with a live nasa background, real space data, and a Windows XP-style retro look.

Rather than staring at a blank tab or another generic dashboard, make every new tab a quick mission briefing - with live data straight from NASA into a snappy, distraction-free workspace.



Live site: https://adityajaindxb.github.io/Orbital-Echo/

---

What it does

- Live NASA background - Astronomy Picture of the Day (APOD) as the wallpaper, refreshed daily, with full credit/attribution
- Space weather - real-time solar flare and geomagnetic storm data from NASA's free DONKI API
- ISS next pass - calculates the next visible ISS pass over your location using live orbital data
- Multi-engine search - quick switch between Google, DuckDuckGo, and Bing
- Customizable shortcuts - add, remove, and drag-to-reorder your own quick links
- Mission log - a lightweight to-do list that persists between sessions
- K command palette - keyboard-driven quick actions: open shortcuts, search, switch themes, export/import settings
- Theming - Nebula / Solar Flare / Deep Space color palettes
- Local persistence - shortcuts, tasks, theme, and settings all saved via localStorage, with a JSON export/import so you don't lose anything

---

How it was built

This started as a fairly standard AI-**assisted** build - I worked through the layout, the NASA API integrations, and the initial styling with a lot of back-and-forth debugging (turns out hand-typing a whole codebase produces an impressive number of typos - getShortcut vs getShortcuts, a misspelled <forrm> tag, classname instead of className, that kind of thing. Chasing those down through the browser console was honestly most of the actual work).

Once the functionality was solid, I got feedback that the visual design read as too obviously AI-generated - the glassmorphism, dark-navy-and-gold palette, everything blurred and floating, is a very recognizable default look at this point. So I scrapped that entirely and rebuilt the UI myself around a Windows XP-era aesthetic: real beveled buttons, hard drop shadows instead of blur, opaque title-bar widgets, and shortcuts styled as actual desktop icons rather than glass pills. No blur anywhere in the current version - that was a deliberate reaction to how generic the first pass looked.

The result is a project that's genuinely mine in the parts that matter most: the visual direction, the color choice, and the decisions about what this should actually feel like to use.

---

Tech stack

- HTML, CSS, JavaScript - vanilla, no framework
- Vite - dev server and build tool

- NASA APIs:

- APOD - Astronomy Picture of the Day
 - DONKI - solar flares (FLR) and geomagnetic storms (GST)
- G7VRD Satellite Pass API - ISS pass predictions

---

Running it locally

1. Clone the repo:

``bash

git clone https://github.com/AdityaJainDXB/Orbital-Echo.git

cd Orbital-Echo

`

2. Install dependencies:

`bash

npm install

`

3. Get a free NASA API key at api.nasa.gov, then create a .env file in the project root:

VITENASAAPIKEY=yourkey_here

4. Start the dev server:

`bash

npm run dev

`

5. Open the localhost URL shown in your terminal. Always use that URL - opening index.html directly won't work, since the app relies on Vite's module system and environment variables.

---

Project structure

index.html

src/

main.js # orchestrates all modules

style.css

modules/

theme.js # theme switching + persistence
clock.js # clock + time-based greeting

search.js # multi-engine search

shortcuts.js # custom shortcuts, drag-reorder

todo.js # mission log / task list

apod.js # NASA APOD background

spaceWeather.js # NASA DONKI space weather

iss.js # ISS pass prediction

commandPalette.js # K command palette

storage.js # localStorage helpers

---

Notes

- Space weather and ISS data depend on third-party APIs (NASA DONKI, G7VRD) that occasionally return temporary errors (e.g. 503`) - the app falls back gracefully with a status message instead of breaking.
- ISS pass predictions use the browser's geolocation when permitted, falling back to a default location if denied.
