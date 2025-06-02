<script lang="ts">
	import { redirect } from "@sveltejs/kit";

  let isMobileMenuOpen = $state(false);

  function toggleMobileMenu() {
      isMobileMenuOpen = !isMobileMenuOpen;
  }

  let { data } = $props();

  function handleLoginClick() {
      // Add login functionality here
      console.log('Login clicked');
     throw redirect(303,'/login ');

  }

	async function handleLogout() {
		try {
			const res = await fetch('/api/auth/logout', {
				method: 'POST'
			});
			
				// Redirect to login page after successful logout
        throw redirect(303,'/');
    
		} catch (e) {
			console.error('Logout failed:', e);
		}
	}
  
</script>



<header class="bg-gray-900 text-white backdrop-blur-sm border-b border-gray-800">
    <div class="container mx-auto px-4 py-4">
      <nav class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8  rounded-full flex items-center justify-center">
            <img class="text-gray-900 font-bold text-sm" src="/Stargaze_logo.png">
          </div>
          <span class="text-xl font-bold">stargaze</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="/blog" class="text-gray-300 hover:text-white transition-colors">บทความ</a>
          <a href="/search" class="text-gray-300 hover:text-white transition-colors">ค้นหาสถานที่ดูดาว</a>
          <a href="/stargaze" class="text-gray-300 hover:text-white transition-colors">แกลลอรี่</a>
          <a href="/search" class="text-gray-300 font-medium">ทริปดูดาว</a>
        </div>
        {#if data.user}
        <button onclick={handleLogout} class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition-colors">
			<h2>Welcome, {data.user.username}!</h2>
			<p>Your email: {data.user.email}</p>
                  </button>
        {:else}
        <a href="/login" class="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-medium transition-colors">
          ลงทะเบียน/สมัครสมาชิก
        </a>
        {/if}
      </nav>
    </div>
  </header>

