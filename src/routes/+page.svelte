<script>
  import { onMount } from 'svelte';

  /**
	 * @type {import("leaflet").Map | import("leaflet").LayerGroup<any>}
	 */
  let map;
  let locations = [];

  onMount(async () => {
    const res = await fetch('http://localhost:5173/api/getalocation');
    const data = await res.json();

    locations = data.map((/** @type {{ lat: any; long: any; title: string; }} */ loc) => ({
      lat: loc.lat,
      lng: loc.long,
      label: loc.title === "Tokyo" ? "Tokyo Station" : loc.title
    }));

    const L = await import('leaflet');
    await import('leaflet/dist/leaflet.css');

    map = L.map('map').setView([35.6812, 139.7671], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    locations.forEach((/** @type {{ lat: number; lng: number; label: ((layer: import("leaflet").Layer) => import("leaflet").Content) | import("leaflet").Content | import("leaflet").Popup | import("leaflet").PopupOptions | undefined; }} */ loc) => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        // @ts-ignore
        .bindPopup(loc.label,loc.description)
        
        .on('click', () => {
      window.location.href = "https://example.com"; // Replace with your URL
    });
        
    });
  });
</script>


<style>
  #map {
    height: 500px;
    width: 100%;
  }
</style>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div id="map"></div>
