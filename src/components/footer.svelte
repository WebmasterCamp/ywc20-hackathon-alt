<script lang="ts">
    // Navigation items
    const navItems = [
      { href: '#about', text: 'หน้าหลัก' },
      { href: '#services', text: 'บทความ' },
      { href: '#gallery', text: 'แกลลอรี่' },
      { href: '#booking', text: 'จองตัวอย่าง' },
      { href: '#contact', text: 'ติดต่อเรา' },
      { href: '#privacy', text: 'นโยบายความเป็นส่วนตัว' }
    ];
  
    // Handle navigation clicks
    function handleNavClick(href: string) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  </script>
  
  <svelte:head>
    <title>Navigation - Stargaze</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </svelte:head>
  
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo Section -->
      <div class="navbar-logo">
        <div class="logo-icon"></div>
        <span class="logo-text">ไลก์</span>
      </div>
  
      <!-- Navigation Links -->
      <div class="navbar-links">
        {#each navItems as item}
          <a 
            href={item.href} 
            on:click|preventDefault={() => handleNavClick(item.href)}
          >
            {item.text}
          </a>
        {/each}
      </div>
  
      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" on:click={() => document.querySelector('.navbar-links')?.classList.toggle('active')}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
  
  <style>
  
    .navbar {
      background-color: #0f0f0f;
      border-bottom: 1px solid #333;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
  
    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    /* Logo Section */
    .navbar-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }
  
    .logo-icon {
      width: 32px;
      height: 32px;
      background-color: white;
      border-radius: 50%;
    }
  
    .logo-text {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      transition: color 0.3s ease;
    }
  
    /* Navigation Links */
    .navbar-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
  
    .navbar-links a {
      color: #ccc;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 400;
      transition: color 0.3s ease;
      padding: 0.5rem 0;
    }
  
    .navbar-links a:hover {
      color: #4a90e2;
    }
  
    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
    }
  
    .mobile-menu-btn span {
      display: block;
      width: 25px;
      height: 2px;
      background-color: white;
      transition: all 0.3s ease;
    }
  
    /* Hover effects */
    .navbar-logo:hover .logo-text {
      color: #4a90e2;
    }
  
    /* Responsive Design */
    @media (max-width: 768px) {
      .navbar-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #0f0f0f;
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
        border-bottom: 1px solid #333;
      }
  
      .navbar-links.active {
        display: flex;
      }
  
      .mobile-menu-btn {
        display: flex;
      }
  
      .navbar-links a {
        width: 100%;
        text-align: center;
        padding: 0.75rem 0;
      }
    }
  
    @media (max-width: 480px) {
      .navbar-container {
        padding: 0.75rem;
      }
  
      .logo-icon {
        width: 28px;
        height: 28px;
      }
  
      .logo-text {
        font-size: 1.2rem;
      }
    }
  </style>
  