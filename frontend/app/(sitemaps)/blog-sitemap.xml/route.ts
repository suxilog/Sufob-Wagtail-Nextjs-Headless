// app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from "next-sitemap";
import { getPosts } from "@lib/data";
export async function GET(request: Request) {
  // Method to source urls from cms
  const { meta, items } = await getPosts();

  return getServerSideSitemap(
    items.map((post: any) => ({
      loc: process.env.SITE_URL + "/blog/" + `${post.meta.slug}`,
      lastmod: new Date(post.last_published_at).toISOString(),
    }))
  );
}
