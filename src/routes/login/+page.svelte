<script lang="ts">
  let username = $state('');;
  let password = $state('');;
  let message = $state('');;
  let error = $state('');;

  async function login() {
    error = '';
    message = '';
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
      message = 'Login successful!';
      // TODO: Redirect or set session
    } else {
      error = data.error || 'Login failed';
    }
  }
</script>

<h1>Login</h1>
<form on:submit|preventDefault={login}>
  <input placeholder="Username" bind:value={username} required />
  <input type="password" placeholder="Password" bind:value={password} required />
  <button type="submit">Login</button>
</form>
{#if message}<p style="color:green">{message}</p>{/if}
{#if error}<p style="color:red">{error}</p>{/if}
