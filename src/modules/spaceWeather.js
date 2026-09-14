const API_KEY = import.meta.env.VITE_NASA_API_KEY;

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export async function initSpaceWeather() {
  const body = document.getElementById("spaceweather-body");
  const startDate = daysAgo(7);
  const endDate = daysAgo(0);

  try {
    const [flrRes, gstRes] = await Promise.all([
      fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`),
      fetch(`https://api.nasa.gov/DONKI/GST?startDate=${startDate}&endDate=${endDate}&api_key=${API_KEY}`),
    ]);
    const flares = flrRes.ok ? await flrRes.json() : [];
    const storms = gstRes.ok ? await gstRes.json() : [];
    const latestFlare = flares.at(-1);
    const latestStorm = storms.at(-1);

    if (!latestFlare && !latestStorm) {
      body.innerHTML = `<div class="status-line status-ok">Quiet — no notable flares or storms in the last 7 days</div>`;
      return;
    }

    let html = "";
    if (latestFlare) {
      const cls = latestFlare.classType || "Unknown";
      html += `<div class="status-line ${severityClass(cls)}">Solar flare — class ${cls} · ${formatDate(latestFlare.beginTime)}</div>`;
    }
    if (latestStorm) {
      const kp = latestStorm.allKpIndex?.at(-1)?.kpIndex ?? "?";
      html += `<div class="status-line">Geomagnetic storm — Kp ${kp} · ${formatDate(latestStorm.startTime)}</div>`;
    }
    body.innerHTML = html;
  } catch (err) {
    console.error(err);
    body.textContent = "Space weather data unavailable.";
  }
}

function severityClass(classType) {
  const letter = classType?.[0]?.toUpperCase();
  if (letter === "X") return "status-severe";
  if (letter === "M") return "status-warning";
  return "status-minor";
}

function formatDate(iso) {
  return iso ? new Date(iso).toLocaleDateString([], { month: "short", day: "numeric" }) : "";
}