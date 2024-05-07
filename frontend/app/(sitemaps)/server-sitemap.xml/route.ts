import { getServerSideSitemap } from "next-sitemap";

export async function GET(request: Request) {
  return getServerSideSitemap([]);
}
