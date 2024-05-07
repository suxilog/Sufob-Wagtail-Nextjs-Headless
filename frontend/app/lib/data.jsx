const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const indexPages = async () => {
    return await fetch(
        `http://backend:9000/api/v2/pages/?${new URLSearchParams({
            type: "blog.BlogPageIndex",
            slug: "blog",
            fields: "intro",
        })}`,
        {
            cache: "no-store",
            headers: {
                Accept: "application/json",
            },
        }
    ).then((response) => response.json());
};
export const fetchPosts = async (
    limit,
    offset,
    categories = null,
    tags = null
) => {
    const index = await indexPages();
    const params = {
        type: "blog.BlogPage",
        child_of: index["items"][0].id,
        fields: [
            "id",
            "title",
            "tags",
            "categories(name,slug)",
            "header_image",
            "content",
            "md_content",
            "view_count",
            "seo_title",
            "search_description",
            "md_headings",
            "last_published_at",
        ].join(","),
        order: "-first_published_at",
    };
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;
    if (categories) params.categories = categories;
    if (tags) params.tags = tags;
    const data = await fetch(
        `http://backend:9000/api/v2/pages/?${new URLSearchParams(params)}`,
        {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
    return data;
};

export const getPostBySlug = async (slug) => {
    const posts = await fetch(
        `http://backend:9000/api/v2/pages/?${new URLSearchParams({
            type: "blog.BlogPage",
            slug: slug,
            fields: [
                "id",
                "title",
                "tags",
                "categories(name,slug)",
                "header_image",
                "content",
                "md_content",
                "view_count",
                "headings",
                "seo_title",
                "search_description",
                "md_headings",
                "last_published_at",
            ].join(","),
        })}`,
        {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
    return posts.items[0];
};

export const getDraftByToken = async (content_type, token) => {
    const post = await fetch(
        `http://backend:9000/api/v2/page_preview/?content_type=${content_type}&token=${token}&format=json`,
        {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
    return post;
};

export const getCategories = async () => {
    const categories = await fetch(`http://backend:9000/api/v2/categories/`, {
        cache: "no-store",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return categories.items;
};
export const getCategory = async (slug) => {
    const categories = await getCategories();
    const category = categories.filter((c) => c.slug === slug);
    return category[0];
};

export const getPosts = async (limit, offset) => {
    const posts = await fetchPosts(limit, offset);
    // let filteredPosts = posts.items.filter((post) => !post.draft);
    return posts;
};

export const getTags = async (limit) => {
    const posts = await fetchPosts(limit);
    const tags = new Set();

    posts.items.forEach((post) => {
        post.tags.forEach((tag) => {
            // 将tag对象转换为字符串
            const tagString = JSON.stringify(tag);
            tags.add(tagString);
        });
    });

    // 将字符串转换回对象并返回
    return Array.from(tags).map((tagString) => JSON.parse(tagString));
};

export const getTag = async (slug) => {
    const tag = await fetch(
        `http://backend:9000/api/v2/tags/?${new URLSearchParams({
            slug: slug,
            fields: ["id", "name", "slug"].join(","),
        })}`,
        {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
    return tag.items[0];
};
export const getPostByTag = async (limit, offset, slug) => {
    const posts = await fetchPosts(limit, offset, null, slug);
    return posts;
};

export const filterPostsByCategory = async (limit, offset, categorySlug) => {
    const category = await getCategory(categorySlug);
    const filteredPosts = await fetchPosts(limit, offset, category.id);
    return filteredPosts;
};

export const searchPosts = async (query) => {
    return await fetch(
        `${PUBLIC_API_URL}/v2/pages/?${new URLSearchParams({
            search: query,
            fields: [
                "id",
                "title",
                // "tags",
                // "categories(name,slug)",
                // "header_image",
                // "content",
                // "md_content",
            ].join(","),
        })}`,
        {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());
};
