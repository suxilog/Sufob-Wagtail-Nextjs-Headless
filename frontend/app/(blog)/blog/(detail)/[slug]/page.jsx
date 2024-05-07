import TableOfContents from "@components/ui/TableOfContents";
import FormattedDate from "@components/features/FormattedDate";
import Image from "next/image";
import Tag from "@components/Tag";
import Link from "next/link";
import ViewCountShow from "@components/features/ViewCountShow";
import { ViewCountUpdate } from "@components/features/ViewCountShow";
import PostCommentSection from "@components/ui/PostCommentSection";
import MarkdownContent from "@components/pages/MarkdownContent";
import { getPosts, getPostBySlug, getDraftByToken } from "@lib/data";
import { draftMode } from "next/headers";
import { request } from "http";
// export async function generateStaticParams() {
//     const posts = await getPosts();

//     return posts.items.map((post) => ({
//         slug: post.slug,
//     }));
// }
export async function generateMetadata({ params, searchParams }, parent) {
    const { isEnabled } = draftMode();
    const slug = params.slug;
    // get current URL search params

    const token = searchParams.token;
    const contentType = searchParams.content_type;

    const decodeSlug = decodeURIComponent(slug);

    const post = isEnabled
        ? await getDraftByToken(contentType, token)
        : await getPostBySlug(decodeSlug);

    const title = post.meta.seo_title || post.title;
    const description = post.meta.search_description || null;
    const previousImages = (await parent).openGraph?.images || [];

    const result = {
        title: title,
        openGraph: {
            images: [
                {
                    url:
                        process.env.metadataBase +
                        post.header_image.meta.download_url,
                    width: post.header_image.width || 517,
                    height: post.header_image.height || 290,
                    alt: `图片：${post.title}`,
                },
                ...previousImages,
            ],
        },
    };

    if (description) {
        result.description = description;
        result.openGraph.description = description;
    }

    return result;
}

export default async function BlogPage({ params, searchParams }) {
    const { isEnabled } = draftMode();
    const slug = params.slug;
    // get current URL search params

    const token = searchParams.token;
    const contentType = searchParams.content_type;

    const decodeSlug = decodeURIComponent(slug);

    const post = isEnabled
        ? await getDraftByToken(contentType, token)
        : await getPostBySlug(decodeSlug);
    const firstPublishedDate = new Date(post.meta.first_published_at);
    const tags = post.tags;
    const headings = post.headings;
    const mdHeadings = post.md_headings;
    const combinedHeadings = headings.concat(mdHeadings);
    const categories = post.categories;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.meta.seo_title ? post.meta.seo_title : post.title,
        image: post.header_image.meta.download_url,
        datePublished: firstPublishedDate,
        dateModified: new Date(post.last_published_at),
        author: [
            {
                "@type": "Person",
                name: "Charlie Sue",
            },
        ],
    };

    return (
        <article className="text-base">
            <header className="container grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 lg:mb-20 items-center">
                <div className="col-span-6 flex flex-col pr-12 gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-base">
                        <span className="flex tracking-tight items-center gap-1.5 relative font-bold text-sm text-gray-15">
                            {categories.map((category, index) => (
                                <Link
                                    className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray"
                                    key={category.id + index}
                                    href={`/category/${category.slug}/`}
                                >
                                    <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                        {category.name}
                                    </span>
                                </Link>
                            ))}
                        </span>
                        <div className="flex gap-2">
                            <time className="text-gray-600">
                                <FormattedDate date={firstPublishedDate} />
                            </time>
                            {/* ·<span>13 min read</span> */}
                        </div>
                    </div>
                    <h1 className="font-headings tracking-tight scroll-mt-[120px] wrap-balance text-3xl  font-bold max-w-lg lg:max-w-none break-words">
                        {post.meta.seo_title ? post.meta.seo_title : post.title}
                        {isEnabled && " (Draft)"}
                    </h1>
                    <div className="flex items-center text-gray-600 text-base gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Image
                                src="/avatars/charlie-sue.png"
                                width={64}
                                height={64}
                                className="rounded-full w-8 h-8"
                                alt="Charlie Sue avatar"
                                priority
                            />

                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                By Charlie Sue
                            </span>
                        </div>

                        <div className="w-0.5 h-6 bg-gray"></div>
                        <ViewCountShow currentViewCount={post.view_count} />
                        <ViewCountUpdate blogId={post.id} />
                    </div>
                    <div className=" gap-2 gap-y-4 md:gap-5">
                        {tags && tags.length > 0 && (
                            <div className="flex gap-2">
                                <span className="text-gray-600">Tags:</span>
                                {tags.map((tag) => (
                                    <Tag key={tag} tag={tag} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-6 relative">
                    <div className="rounded-2xl border-2 border-gray-15 overflow-hidden">
                        <div className="-m-px">
                            {post.header_image && (
                                <Image
                                    src={post.header_image.meta.download_url}
                                    width={517}
                                    height={290}
                                    className="w-full"
                                    alt={`image of ${post.title}`}
                                    priority
                                />
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className="container flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-6 pt-10">
                <div className="lg:col-span-8 lg:max-w-[46rem] pb-12 xl:pl-11 xl:pr-16 order-2">
                    <div id="post-content">
                        {post.content.map((block, index) => {
                            switch (block.type) {
                                case "richtext":
                                    // Use a regular expression to replace <h> tags with versions that include an id
                                    const updatedHtml = block.value.replace(
                                        /<h([1-6])[^>]*>(.*?)<\/h\1>|<p[^>]*>(.*?)<\/p>/g,
                                        (match, level, content, pContent) => {
                                            if (level && content) {
                                                const cleanContent = content
                                                    .replace(/<[^>]+>/g, "")
                                                    .trim();
                                                // 使用正则表达式移除特殊字符
                                                const id = cleanContent
                                                    .toLowerCase()
                                                    .replace(/[^\w\s-]/g, "")
                                                    .replace(/\s+/g, "-");

                                                if (level === "2") {
                                                    return `<h${level} class="font-headings wrap-balance tracking-tight font-bold my-12 first:mt-0 scroll-mt-[120px]" id="${id}">${content}</h${level}>`;
                                                } else if (level === "3") {
                                                    return `<h${level} class="font-headings tracking-tight font-medium mb-6 mt-12 first:mt-0 scroll-mt-[120px]" id="${id}">${content}</h${level}>`;
                                                } else {
                                                    return `<h${level} class="font-headings tracking-tight font-medium mb-6 mt-12 first:mt-0 scroll-mt-[120px]" id="${id}">${content}</h${level}>`;
                                                }
                                            } else if (pContent) {
                                                return `<p class="my-6 text-gray-600">${pContent}</p>`;
                                            }
                                            return match;
                                        }
                                    );

                                    return (
                                        <div
                                            key={block.id || index}
                                            className="my-12 first:mt-0 last:mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: updatedHtml,
                                            }}
                                        ></div>
                                    );
                                case "paragraph":
                                    return (
                                        <p
                                            className="my-6 text-gray-600"
                                            key={block.id || index}
                                        >
                                            {block.value}
                                        </p>
                                    );
                                default:
                                    return null;
                            }
                        })}
                        {post.md_content ? (
                            <MarkdownContent content={post.md_content} />
                        ) : (
                            <p></p>
                        )}
                    </div>
                    <footer>
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 dark-copy flex gap-4 my-12">
                            <div>
                                <span className="text-base">作者：</span>
                                <h3 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium mt-1 wrap-balance">
                                    Charlie Sue
                                </h3>
                                <div className="font-copy text-base 2xl:text-md font-medium print:text-[12px] print:text-justify mt-4">
                                    <p className="my-6 first:mt-0 last:mb-0 print:my-2 text-gray-500">
                                        SEO专家兼数据分析师，具备深厚的编程知识。擅长利用Python和前端技术（JavaScript、HTML、CSS）开发优化策略，提升网站排名和用户体验。精通GA4和谷歌标签管理器，熟练进行数据分析和解读，以数据驱动决策，优化SEO成效。结合技术能力和市场洞察，为电子商务和在线品牌打造全方位的增长解决方案。
                                    </p>
                                </div>
                                <a
                                    className="rounded-lg font-bold whitespace-nowrap focus:outline-none focus:ring-tertiary-purple disabled:opacity-50 group underline underline-offset-8 focus:ring-4 hover:underline-offset-4 border-gray-15 py-3 text-sm leading-5 2xl:text-base 2xl:leading-5 -mx-2.5 px-2.5 mt-4 inline-block -mb-2"
                                    href="/blog"
                                >
                                    更多文章
                                </a>
                            </div>
                            <Image
                                alt="Charlie Sue profile picture."
                                width={100}
                                height={100}
                                className="w-20 h-20 rounded-full"
                                style={{ color: "transparent" }}
                                src="/avatars/charlie-sue.png"
                                priority
                            />
                        </div>
                        <PostCommentSection blogId={post.id} />
                    </footer>
                </div>
                <TableOfContents headings={combinedHeadings} />
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </article>
    );
}
