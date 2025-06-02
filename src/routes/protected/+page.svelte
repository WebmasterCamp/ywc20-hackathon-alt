<script lang="ts">
	import type { PageData } from './$types'
	import { goto } from '$app/navigation'
	export let data: PageData;

	async function handleLogout() {
		try {
			const res = await fetch('/api/auth/logout', {
				method: 'POST'
			});
			
			if (res.ok) {
				// Redirect to login page after successful logout
				goto('/login');
			}
		} catch (e) {
			console.error('Logout failed:', e);
		}
	}
</script>

<div class="container">
	<h1>Protected Page</h1>
	{#if data.user}
		<div class="user-info">
			<h2>Welcome, {data.user.username}!</h2>
			<p>Your email: {data.user.email}</p>
			<button on:click={handleLogout} class="logout-btn">Logout</button>
		</div>
	{:else}
		<p>Please log in to view this page.</p>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	.user-info {
		background-color: #f5f5f5;
		padding: 1rem;
		border-radius: 8px;
		margin-top: 1rem;
	}

	h1 {
		color: #333;
		margin-bottom: 1rem;
	}

	h2 {
		color: #444;
		margin-bottom: 0.5rem;
	}

	.logout-btn {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #dc2626;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.logout-btn:hover {
		background-color: #b91c1c;
	}
</style>

<div class="grid">

 
</div>