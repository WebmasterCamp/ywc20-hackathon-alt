<script lang="ts">
    export let data;
</script>

<div class="blog-container">
    <h1>Blog Posts</h1>
    {#each data.posts as post}
        <article class="blog-post">
            <h2><a href="/blog/{post.slug}">{post.slug}</a></h2>
            <div class="content">
                {@html post.content}
            </div>
        </article>
    {/each}
</div>

<style>
    .blog-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .blog-post {
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid #eee;
    }

    .content {
        line-height: 1.6;
    }

    :global(.blog-post h1) {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    :global(.blog-post h2) {
        font-size: 2rem;
        margin: 2rem 0 1rem;
    }

    :global(.blog-post h2 a) {
        color: #333;
        text-decoration: none;
    }

    :global(.blog-post h2 a:hover) {
        color: #666;
    }

    :global(.blog-post p) {
        margin-bottom: 1rem;
    }

    :global(.blog-post code) {
        background-color: #f4f4f4;
        padding: 0.2rem 0.4rem;
        border-radius: 3px;
    }

    :global(.blog-post pre) {
        background-color: #f4f4f4;
        padding: 1rem;
        border-radius: 5px;
        overflow-x: auto;
    }
</style> 