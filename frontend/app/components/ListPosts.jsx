import React from "react";
import PostCard from "@components/PostCard";
import cn from "@utils/cn";

const PostSection = ({ posts, FirstTWOBig = false }) => {
    return (
        <section className="col-span-12 md:col-span-10 md:col-start-2 grid grid-cols-1 gap-6 mt-12">
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    meta={post.meta}
                    title={post.title}
                    tags={post.tags}
                    categories={post.categories}
                    header_image={post.header_image}
                    content={post.content}
                    md_content={post.md_content}
                />
            ))}
        </section>
    );
};

export default PostSection;
