<script>
  import { onMount } from 'svelte';
  import Navbar from '../components/navbar.svelte';
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


    
  const cards = [
    {
      id: 1,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้',
      hasSpecialBadge: true
    },
    {
      id: 2,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 3,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 4,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 5,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    },
    {
      id: 6,
      title: 'ชื่อสถานที่',
      description: 'รายละเอียดของสถานที่นี้'
    }
  ];

  function handleRegister() {
    // Handle registration logic here
  }


</script>


<style>
  #map {
    height: 25vh;
    width: 80vh;
  }
</style>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div  id="map"></div>


<div class="min-h-screen bg-gray-900 text-white">
  <!-- Header -->
  <header class="bg-gray-800 px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 bg-white rounded-full"></div>
          <span class="text-white font-medium">โลก</span>
        </div>
        <nav class="flex space-x-8">
          <a href="/menu1" class="text-blue-400 border-b-2 border-blue-400 pb-1">ชื่อเมนู</a>
          <a href="/menu2" class="text-gray-300 hover:text-white">ชื่อเมนู</a>
          <a href="/menu3" class="text-gray-300 hover:text-white">ชื่อเมนู</a>
          <a href="/menu4" class="text-gray-300 hover:text-white">ชื่อเมนู</a>
        </nav>
      </div>
      <button onclick={handleRegister} class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        ลงทะเบียน/สมัครสมาชิก
      </button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative h-96 flex items-center justify-center bg-cover bg-center" style="background-image: url('/placeholder.svg?height=400&width=800');">
    <img class="absolute inset-0 bg-black" src="back.png">
    <div class="relative text-center z-10">
      <h1 class="text-4xl md:text-5xl font-bold mb-2">คำพูดเซียบชวนมากดูปุ่ม</h1>
      <h2 class="text-4xl md:text-5xl font-bold mb-8">คำพูดเซียบชวนมากดูปุ่ม</h2>
      <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors">
        ปุ่มไปพิงค์ขันแนบ
      </button>
    </div>
  </section>

  <!-- Search Section -->
  <section class="px-6 py-8">
    <div class="max-w-md mx-auto relative">
      <!-- <form onsubmit={handleSearch}>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ค้นหา"
            bind:value={searchQuery}
            class="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </form> -->
    </div>
    
    <div class="flex justify-center space-x-8 mt-6">
      <a href="/top-rated" class="text-blue-400 hover:text-blue-300 text-sm">สถานที่ดูดาวที่ดีที่สุด</a>
      <a href="/family-friendly" class="text-blue-400 hover:text-blue-300 text-sm">สถานที่ดูดาวและน่าสำหรับครอบครัว</a>
    </div>
  </section>

  <!-- Cards Grid -->
  <section class="px-6 pb-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {#each cards as card}
        <div class="bg-gray-800 rounded-lg overflow-hidden">
          <div class="relative h-48 bg-gray-600">
            <img 
              src="/placeholder.svg?height=200&width=300" 
              alt="สถานที่ดูดาว"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{card.title}</h3>
            <p class="text-gray-400 text-sm mb-4">{card.description}</p>
            <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              อ่านเพิ่มเติม
            </button>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
