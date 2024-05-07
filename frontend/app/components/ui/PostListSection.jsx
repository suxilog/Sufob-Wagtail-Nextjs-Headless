import PageHeader from "@components/pages/PageHeader";
import PostList from "@components/pages/PostList";
import Pagination from "@components/ui/Pagination";

export default function PostListSection({
    listSlug,
    posts,
    navTags,
    listName,
    total,
    limit,
    offset,
    isTag,
}) {
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    let basePath = `/category/${listSlug}/page`;
    if (listSlug === "latest-articles") {
        basePath = `/blog/latest-articles/page`;
    }

    // const getPageLink = (page) => `${basePath}/${page}`;

    return (
        <div className="mb-20 ">
            <div className="container pt-12 pb-20">
                <PageHeader title={listName} />
                <PostList
                    currentPage={currentPage}
                    navTags={navTags}
                    posts={posts}
                    isTag={isTag}
                />
                <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
        </div>
    );
}
