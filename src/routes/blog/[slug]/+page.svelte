<script lang="ts">
    export let data;
</script>

<div class="blog-container">
    <article class="blog-post">
        <div class="content">
            {@html data.post.content}
        </div>
    </article>
</div>

<style>
    .blog-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .blog-post {
        margin-bottom: 3rem;
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