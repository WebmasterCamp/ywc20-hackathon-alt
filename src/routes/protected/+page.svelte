<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData

</script>

<div class="container">
	<h1>Protected Page</h1>
	{#if data.user}
		<div class="user-info">
			<h2>Welcome, {data.user.username}!</h2>
			<p>Your email: {data.user.email}</p>
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
</style>

<div class="grid">

	{#if data.user}
        <h1>Hello Sekai!</h1>
        <form method="POST">
            <li><a href="/">Home</a></li>
            {#if !data.user}
                <li><a href="/register">Register</a></li>
                <li><a href="/login" role="button">Login</a></li>
            {:else}
                <li>
                    <button formaction="/api/auth/logout" type="submit" role="button">Logout</button>
                </li>
            {/if}
        </form>
	{/if}
</div>