import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/blog';

/** The blog as an RSS feed at /rss.xml, for feed readers and Discord feed bots. */
export async function GET(context: APIContext) {
    const posts = await getPosts();

    return rss({
        title: 'DaemonScripts blog',
        description: 'News, releases and build notes from DaemonScripts: DPS scripts, APEX and our tools.',
        site: context.site!,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.summary,
            pubDate: post.data.date,
            link: `/blog/${post.id}/`,
            categories: post.data.tags,
        })),
    });
}
