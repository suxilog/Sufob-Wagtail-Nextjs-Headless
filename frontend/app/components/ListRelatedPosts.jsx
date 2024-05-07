import React from "react";
import PostCard from "@components/PostCard"; // 确保路径正确
import { cn } from "@/app/utils"; // 确保路径正确
import Image from "next/image";
const PostsSection = ({ posts }) => {
    return (
        <section
            className={cn(`flex flex-col md:flex-row sm:justify-between gap-8`)}
        >
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div key={index} className="flex flex-wrap gap-2">
                        <div className="min-h-full">
                            {/* 使用 Next.js 的 Image 组件 */}
                            <Image
                                src={post.data.heroImage}
                                width={200}
                                height={200}
                                className="w-16 h-16 object-cover rounded-full"
                                alt={`Image of ${post.data.title}`}
                                priority
                            />
                        </div>
                        <header className="flex justify-center items-center">
                            <a
                                className="font-medium hover:underline"
                                href={`/post/${post.slug}/`}
                            >
                                {post.data.title}
                            </a>
                        </header>
                    </div>
                ))
            ) : (
                <span className="text-gray-6000">
                    There are no related posts yet. 😢
                </span>
            )}
        </section>
    );
};

export default PostsSection;
