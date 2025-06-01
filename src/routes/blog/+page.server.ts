import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export async function load() {
    try {
        const blogDir = path.join(process.cwd(), 'src/routes/blog');
        const files = fs.readdirSync(blogDir);
        const markdownFiles = files.filter(file => file.endsWith('.md'));

        const posts = markdownFiles.map(file => {
            const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
            const html = marked(content);
            return {
                slug: file.replace('.md', ''),
                content: html
            };
        });

        return {
            posts
        };
    } catch (e) {
        throw error(500, 'Error loading blog posts');
    }
} 