const DEFAULT_LOCATION = { lat: 25.276987, lon: 55.296249 }; // Dubai fallback

export async function initIss() {
  const body = document.getElementById("iss-body");
  const location = await getLocation();

  try {
    const res = await fetch(`https://api.g7vrd.co.uk/v1/satellite-passes/25544/${location.lat}/${location.lon}.json?hours=72`);
    if (!res.ok) throw new Error("ISS pass request failed");
    const data = await res.json();
    const pass = data.passes?.[0];

    if (!pass) {
      body.textContent = "No ISS passes visible from your location in the next 72 hours.";
      return;
    }

    const start = new Date(pass.start);
    const end = new Date(pass.end);
    const durationMin = Math.round((end - start) / 60000);

    body.innerHTML = `
      <div class="status-line">${start.toLocaleString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })}</div>
      <div class="status-sub">~${durationMin} min · max elevation ${Math.round(pass.max_elevation)}°</div>
    `;
  } catch (err) {
    console.error(err);
    body.textContent = "ISS pass data unavailable.";
  }
}

function getLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(DEFAULT_LOCATION);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => resolve(DEFAULT_LOCATION),
      { timeout: 5000 }
    );
  });
}