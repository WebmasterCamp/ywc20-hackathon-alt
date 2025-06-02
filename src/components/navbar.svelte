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

<header class="header">
  <div class="logo">
      <div class="logo-icon"></div>
      <span>ไลก์</span>
  </div>

  <nav>
      <ul class="nav-menu">
          <li><a href="#" >หน้าหลัก</a></li>
          <li><a href="#" >บทความ</a></li>
          <li><a href="#" >ข้อมูลดวงดาว</a></li>
          <li><a href="#" >กิจกรรม</a></li>
      </ul>
  </nav>
	{#if data.user}
  <button class="login-btn" onclick={handleLogout}>
			<h2>Welcome, {data.user.username}!</h2>
			<p>Your email: {data.user.email}</p>
  </button>
	{:else}
  <a class="login-btn" href="/login">
      ล็อคอิน/สมัครสมาชิก
  </a>
  {/if}
</header>

<style>
  .header {
      background-color: #1a1a1a;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #333;
      position: sticky;
      top: 0;
      z-index: 1000;
      flex-wrap: wrap;
  }

  .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 500;
      font-size: 1.1rem;
      color: white;
  }

  .logo-icon {
      width: 24px;
      height: 24px;
      background-color: white;
      border-radius: 50%;
  }

  .nav-menu {
      display: flex;
      gap: 1rem;
      list-style: none;
      flex-wrap: wrap;
      margin: 0;
      padding: 0;
  }

  .nav-menu a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 0.8rem;
      border-radius: 4px;
      transition: background-color 0.3s;
      font-size: 14px;
      white-space: nowrap;
      cursor: pointer;
  }

  .nav-menu a:hover {
      background-color: rgba(255, 255, 255, 0.1);
  }

  .login-btn {
      background-color: #4a90e2;
      color: white;
      padding: 0.6rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;
      white-space: nowrap;
      font-family: inherit;
  }

  .login-btn:hover {
      background-color: #357abd;
  }

  @media (max-width: 768px) {
      .header {
          padding: 0.8rem;
          flex-direction: column;
          gap: 1rem;
      }

      .nav-menu {
          order: 3;
          width: 100%;
          justify-content: center;
          gap: 0.5rem;
      }

      .nav-menu a {
          padding: 0.4rem 0.6rem;
          font-size: 12px;
      }

      .login-btn {
          order: 2;
          padding: 0.5rem 1rem;
          font-size: 12px;
      }
  }

  @media (max-width: 480px) {
      .header {
          padding: 0.6rem;
      }

      .logo {
          font-size: 1rem;
      }

      .nav-menu {
          gap: 0.3rem;
      }

      .nav-menu a {
          padding: 0.3rem 0.5rem;
          font-size: 11px;
      }

      .login-btn {
          padding: 0.4rem 0.8rem;
          font-size: 11px;
      }
  }
</style>
