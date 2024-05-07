import PostListSection from "@components/ui/PostListSection";
import { getPosts, getTags } from "../../../lib/data";
import { LIMIT } from "@constants";
export const metadata = {
    title: "最新SEO资讯与技巧",
    openGraph: {
        description:
            "探索Charlie Sue外贸站的最新文章，获取SEO行业最新动态、算法更新和专家指南。无论是提升个人技能还是优化企业网站，这里的内容都能帮你保持领先。",
        images: [
            {
                url: "https://www.sufob.com/logo.png",
                width: 100,
                height: 100,
                alt: "Charlie Sue外贸站",
            },
        ],
    },
    description:
        "探索Charlie Sue外贸站的最新文章，获取SEO行业最新动态、算法更新和专家指南。无论是提升个人技能还是优化企业网站，这里的内容都能帮你保持领先。",
};
export default async function LatestArticlesPage({ params, searchParams }) {
    const currentPage = searchParams?.page || 1;
    const pageInt = currentPage ? parseInt(currentPage, 10) : 1;
    const offset = (pageInt - 1) * LIMIT;

    const postData = await getPosts(LIMIT, offset);
    const { meta, items } = postData;
    const navTags = await getTags();
    return (
        <PostListSection
            listSlug="latest-articles"
            navTags={navTags}
            posts={items}
            total={meta.total_count}
            limit={LIMIT}
            offset={offset}
            listName="最新文章"
        />
    );
}
