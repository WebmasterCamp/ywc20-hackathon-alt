<script lang="ts">
  import { goto } from '$app/navigation';
  
  let email = $state('');
  let password = $state('');
  let message = $state('');
  let error = $state('');

  const thaiEmailRegex = /[a-zA-Z\u0E00-\u0E7F]+@[a-zA-Z\u0E00-\u0E7F]/;

  function validateEmail(email: string): boolean {
    return thaiEmailRegex.test(email);
  }

  async function login() {
    error = '';
    message = '';

    // Client-side validation
    if (!validateEmail(email)) {
      error = 'Please enter a valid Thai email address (example@domain.ไทย)';
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        message = 'Login successful!';
        
        // Redirect to home page after successful login
        setTimeout(() => {
          window.location.href = "/"; 
                }, 1000);
      } else {
        error = data.error || 'Login failed';
      }
    } catch (e) {
      error = 'Failed to connect to server';
    }
  }
</script>

<div class="login-container">
  <h1>Login</h1>
  <form on:submit|preventDefault={login}>
    <div class="form-group">
      <input 
        type="text"
        placeholder="Thai Email (example@domain.ไทย)" 
        bind:value={email} 
        required 
      />
      <small class="hint">Enter a Thai email address (example@domain.ไทย)</small>
    </div>
    <div class="form-group">
      <input 
        type="password" 
        placeholder="Password" 
        bind:value={password} 
        required 
      />
    </div>
    <button type="submit">Login</button>
  </form>
  {#if message}<p class="success">{message}</p>{/if}
  {#if error}<p class="error">{error}</p>{/if}
</div>

<style>
  .login-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .hint {
    display: block;
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    padding: 0.8rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #45a049;
  }

  .success {
    color: #4CAF50;
    text-align: center;
    margin-top: 1rem;
  }

  .error {
    color: #f44336;
    text-align: center;
    margin-top: 1rem;
  }
</style>
