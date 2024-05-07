import PostListSection from "@components/ui/PostListSection";
import { getPostByTag, getTag } from "@lib/data";
import { LIMIT } from "@constants";

export async function generateMetadata({ params, searchParams }, parent) {
    const slug = params.slug;

    const tagDetails = await getTag(slug);

    const name = tagDetails.name || "Unknown Tag";
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

    return result;
}

export default async function Page({ params }) {
    const { slug } = params;
    const pageInt = 1;
    const offset = (pageInt - 1) * LIMIT;

    const posts = await getPostByTag(LIMIT, offset, slug);
    // from posts get tag name by slug
    const { name } = await getTag(slug);
    const { meta, items } = posts;

    return (
        <>
            <PostListSection
                listSlug={slug}
                posts={items}
                total={meta.total_count}
                limit={LIMIT}
                offset={offset}
                listName={name}
                isTag={true}
            />
            {/* <div className="mb-20">
                <div className="container pt-12 pb-20">
                    <PageHeader title={name} />

                    <PostList slug={slug} isTag={true} posts={posts} />
                    <button
                        className="rounded-lg font-bold whitespace-nowrap focus:outline-none focus:ring-tertiary-purple disabled:opacity-50 group border-2 focus:ring-4 transition-opacity transition-colors hover:bg-opacity-75 disabled:hover:bg-opacity-100 border-gray-900 py-3 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5 bg-gray-900 text-white px-6 mt-12 mx-auto block border transition-all"
                        type="button"
                    >
                        Load more
                    </button>
                </div>
            </div> */}
        </>
    );
}
