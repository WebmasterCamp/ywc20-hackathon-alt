<script lang="ts">
  import { onMount } from 'svelte';
  let email = $state('');;
  let password = $state('');
  let Firstname = $state('');
  let Lastname = $state('');
  let username = $state('');
  let description = $state('');
  let message = $state('');
  let error = $state('');

  async function register() {
    error = ''
    message = ''
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, Firstname, Lastname, username, description })
    });
    const data = await res.json();
    if (res.ok) {
      message = 'Registration successful! You can now log in.';
    } else {
      error = data.error || 'Registration failed';
    }
  }
</script>

<h1>Register</h1>
<form on:submit|preventDefault={register}>
  <input placeholder="Email" bind:value={email} required />
  <input placeholder="Username" bind:value={username} required />
  <input placeholder="First Name" bind:value={Firstname} />
  <input placeholder="Last Name" bind:value={Lastname} />
  <input placeholder="Description" bind:value={description} />
  <input type="password" placeholder="Password" bind:value={password} required />
  <button type="submit">Register</button>
</form>
{#if message}<p style="color:green">{message}</p>{/if}
{#if error}<p style="color:red">{error}</p>{/if}