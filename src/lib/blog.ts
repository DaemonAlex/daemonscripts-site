import { getCollection } from 'astro:content';

/** Published posts, newest first. Drafts never reach the build. */
export async function getPosts() {
    const posts = await getCollection('blog', ({ data }) => !data.draft);
    return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

const dateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** "October 24, 2026". Dates are read as UTC so a post never shows the day before. */
export function formatDate(date: Date): string {
    return dateFormat.format(date);
}
