import { getCategories, filterPostsByCategory, getPosts, getCategory, getTags } from '@lib/data';

import PostListSection from '@components/ui/PostListSection';
import { LIMIT } from '@constants';

export async function generateMetadata({ params, searchParams }, parent) {
    const category = params.category;

    const categoryDetails = await getCategory(category);

    const name = categoryDetails.name || 'Unknown Category';
    const description = categoryDetails.description || null;
    const parentCategory = categoryDetails.parent || null;
    const order = categoryDetails.order || 0;
    const image = categoryDetails.image?.meta.download_url || null;
    const svg = categoryDetails.svg || null;
    const previousImages = (await parent).openGraph?.images || [];

    const result = {
        title: name,
        openGraph: {
            images: [
                // {
                //     url:
                //         process.env.metadataBase +
                //         post.header_image.meta.download_url,
                //     width: post.header_image.width || 517,
                //     height: post.header_image.height || 290,
                //     alt: `图片：${post.title}`,
                // },
                ...previousImages,
            ],
        },
    };
    if (image) {
        result.openGraph.images.push({
            url: image,
            width: 1200,
            height: 630,
            alt: name,
        });
    }
    if (description) {
        result.description = description;
        result.openGraph.description = description;
    }

    return result;
}

export default async function CategoryPage({ params, searchParams }) {
    let { category } = params;
    const currentPage = searchParams?.page || 1;
    let categoryName;
    const pageInt = currentPage ? parseInt(currentPage, 10) : 1;
    const offset = (pageInt - 1) * LIMIT;


    const postsData = await filterPostsByCategory(LIMIT, offset, category);
    const categories = await getCategories();
    const categoryDetails = categories.find((cat) => cat.slug === category);
    categoryName = categoryDetails ? categoryDetails.name : 'Unknown Category';

    const navTags = await getTags();
    const { meta, items } = postsData;
    return (
        <>
            <PostListSection listSlug={category} navTags={navTags} posts={items} total={meta.total_count} limit={LIMIT} offset={offset} listName={categoryName} />

        </>
    )
}
