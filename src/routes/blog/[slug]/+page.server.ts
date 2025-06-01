import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export async function load({ params }) {
    try {
        const blogDir = path.join(process.cwd(), 'src/routes/blog');
        const filePath = path.join(blogDir, `${params.slug}.md`);

        if (!fs.existsSync(filePath)) {
            throw error(404, 'Blog post not found');
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        const html = marked(content);

        return {
            post: {
                slug: params.slug,
                content: html
            }
        };
    } catch (e) {
        if (e.status === 404) throw e;
        throw error(500, 'Error loading blog post');
    }
} 