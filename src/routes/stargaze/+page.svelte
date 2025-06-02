<script>
    import { Search } from 'lucide-svelte';
    import Footer from '../../components/footer.svelte';
	import Navbar from 'components/navbar.svelte';
    let searchQuery = $state('');
    let { data } = $props();
    
    const tripPackages = [
      {
        title: 'พรานดารา พาไปส่ายดาว โครงการ',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        linkText: 'ไม่มีค่าใช้จ่าย',
        price: null
      },
      {
        title: 'ทริปดูดาว 3 วัน 2 คืน อุทยานแห่งชาติเขาใหญ่',
        description: 'ทริปที่ท่องรอบทาง พร้อมกิจกรรมดูดาว ณ อุทยานแห่งชาติเขาใหญ่ ภายในทริปมีกิจกรรมรักษาสิ่งแวดล้อม ส่องดาวน้ำตกอนามัยดิน เรียนรู้การดูดาวและการหาดาวดีที่ดองดิน',
        linkText: 'อ่านเพิ่มเติม',
        price: '5,700 บาท'
      },
      {
        title: 'ทริปดูดาว 4 วัน 3 คืน พร้าว เชียงใหม่',
        description: 'ทริปที่ท่องรอบทาง พร้อมกิจกรรมดูดาว ณ จ.พร้าว จ.เชียงใหม่ ฝาไปดูวิถีชีวิตชาวบ้าน หยุ่นในสินค้าที่คนในท้องถิ่น กลางคืนชมดูดาว ดูทางช่างเลือก',
        linkText: 'อ่านเพิ่มเติม',
        price: '8,500 บาท'
      }
    ];
  </script>
  
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
<Navbar data={data} />
  
    <!-- Hero Section -->
    <section class="relative min-h-[70vh] flex items-center justify-center">
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/hero-bg.png')"></div>
      <div class="absolute inset-0 bg-black/40"></div>
      
      <div class="relative z-10 text-center px-4">
        <h1 class="text-5xl md:text-7xl font-bold mb-12">ทริปดูดาว</h1>
        
        <!-- Search Bar -->
        <div class="max-w-md mx-auto">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              bind:value={searchQuery}
              placeholder="หาทริปดูดาวที่คุณสนใจ"
              class="w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
              ค้นหา
            </button>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Trip Packages -->
    <section class="py-16 px-4">
      <div class="container mx-auto max-w-4xl">
        <div class="space-y-8">
          {#each tripPackages as trip, index}
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700">
              <div class="md:flex">
                <div class="md:w-1/3">
                  <img 
                    src="/{index+1}.png" 
                    alt="Observatory" 
                    class="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div class="md:w-2/3 p-8">
                  <h3 class="text-2xl font-bold mb-4">{trip.title}</h3>
                  <p class="text-gray-300 mb-6 leading-relaxed">{trip.description}</p>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      {#if trip.price}
                        <span class="text-2xl font-bold text-blue-400">{trip.price}</span>
                      {:else}
                        <span class="text-blue-400 font-medium">{trip.linkText}</span>
                      {/if}
                    </div>
                    <button class="border border-gray-500 hover:border-white text-white px-6 py-2 rounded-full transition-colors">
                      อ่านเพิ่มเติม
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
    </div>
  <Footer />