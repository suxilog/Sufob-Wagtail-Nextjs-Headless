"use client";
import FormattedDate from "@components/features/FormattedDate";
import ViewCountShow from "@components/features/ViewCountShow";
import Image from "next/image";
import FilterByTagButton from "@components/ui/FilterByTagButton";

import { useState, useEffect, useCallback } from "react";

export default function PostList({
    navTags,
    posts,
    currentPage = null,
    isTag = false,
}) {
    const [selectedTag, setSelectedTag] = useState("all");
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const filterPosts = useCallback(
        (tag) => {
            setSelectedTag(tag);
            if (tag === "all") {
                setFilteredPosts(posts);
            } else {
                setFilteredPosts(
                    posts.filter((post) =>
                        post.tags.some((postTag) => postTag.slug === tag)
                    )
                );
            }
        },
        [posts]
    ); // Notice posts is a dependency here

    useEffect(() => {
        filterPosts(selectedTag);
    }, [filterPosts, selectedTag, posts]); // Now includes all necessary dependencies

    return (
        <>
            {/* {!isTag && (
                <nav className="mb-12 relative">
                    <h2 className="font-bold mb-3">按标签过滤</h2>
                    <div className="w-6 bg-gradient-to-r from-transparent to-white absolute z-10 right-0 top-0 bottom-4"></div>
                    <div className="overflow-auto">
                        <div className="flex mb-4 text-sm font-semibold gap-2">
                            <button
                                onClick={() => filterPosts("all")}
                                className={`leading-4 whitespace-nowrap transition-all ${selectedTag == "all" ? "text-white bg-purple-600" : "bg-gray-100"} p-4  rounded-xl`}
                            >
                                All
                            </button>
                            {navTags.map((tag) => (
                                <FilterByTagButton
                                    key={tag.slug}
                                    tag={tag}
                                    filterPosts={filterPosts}
                                    selectedTag={selectedTag}
                                />
                            ))}

                            <span className="last:pr-6"></span>
                        </div>
                    </div>
                </nav>
            )} */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transform transition-opacity duration-300 ease-in-out">
                {currentPage === 1 &&
                    filteredPosts.slice(0, 2).map((post, index) => (
                        <div
                            key={index}
                            className={`flex w-full  ${filteredPosts.includes(post) ? "opacity-100" : "opacity-0"}`}
                        >
                            <article className="overflow-hidden flex w-full grow h-full relative border-2 rounded-xl flex-col bg-white border-gray-200 text-gray-900">
                                <div className="">
                                    <div className="aspect-[258/145] overflow-hidden relative">
                                        <Image
                                            alt=""
                                            width="517"
                                            height="290"
                                            className="object-cover w-full h-full"
                                            src={
                                                post.header_image.meta
                                                    .download_url
                                            }
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                                <div className="flex h-full gap-4 f p-8 flex-col">
                                    <div className="flex justify-between items-center gap-4">
                                        <span className="flex tracking-tight items-center gap-1.5 relative h-6 font-bold text-sm-flat overflow-auto relative z-10 text-gray-900">
                                            <a
                                                className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray-200"
                                                href={`/category/${post.categories[0].slug}/`}
                                            >
                                                <svg
                                                    width="64"
                                                    height="64"
                                                    viewBox="0 0 64 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 shrink-0 text-primary-purple"
                                                >
                                                    <path
                                                        opacity="0.2"
                                                        d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        d="M39.8394 18.788C40.2081 17.9317 39.9331 16.9318 39.1769 16.3818C38.4207 15.8318 37.3895 15.8818 36.6833 16.4943L20.6838 30.4938C20.0588 31.0438 19.8338 31.925 20.1276 32.7C20.4213 33.4749 21.1713 33.9999 22.0025 33.9999H28.971L24.1649 45.212C23.7962 46.0683 24.0712 47.0682 24.8274 47.6182C25.5836 48.1682 26.6149 48.1182 27.3211 47.5057L43.3205 33.5062C43.9455 32.9562 44.1705 32.075 43.8767 31.3C43.583 30.5251 42.8393 30.0063 42.0018 30.0063H35.0333L39.8394 18.788Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                                <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                    {post.categories[0].name}
                                                </span>
                                            </a>
                                        </span>
                                        <span className="shrink-0 text-gray-600">
                                            <FormattedDate
                                                date={
                                                    post.meta.first_published_at
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <a
                                            className="after:absolute after:inset-0"
                                            href={`/blog/${post.meta.slug}`}
                                        >
                                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium wrap-balance">
                                                {post.title}
                                            </h2>
                                        </a>
                                    </div>
                                    <footer className="flex items-center">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 text-sm-flat">
                                                {/* <Image
                                                    src="/avatars/charlie-sue.png"
                                                    width={64}
                                                    height={64}
                                                    className="rounded-full w-8 h-8"
                                                    alt="Charlie Sue avatar"
                                                    priority
                                                    style={{
                                                        color: "transparent",
                                                    }}
                                                />

                                                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                    By Charlie Sue
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end grow text-sm-flat font-bold gap-3">
                                            <ViewCountShow
                                                currentViewCount={
                                                    post.view_count
                                                }
                                            />
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>

            <div className="col-span-12 md:col-span-10 md:col-start-2 grid grid-cols-1 gap-6 mt-12">
                {currentPage === 1 &&
                    filteredPosts.slice(2).map((post, index) => (
                        <div
                            key={index}
                            className="flex w-full"
                            style={{ opacity: 1, transform: "none" }}
                        >
                            <article className="overflow-hidden flex w-full grow h-full relative border-2 rounded-xl py-6 px-8 sm:flex-row flex-col bg-white border-gray-200 text-gray-900">
                                <div className="shrink-0 sm:w-[160px] xl:w-[260px] ">
                                    <div className="aspect-[258/145] overflow-hidden relative rounded-md">
                                        <Image
                                            alt=""
                                            width="517"
                                            height="290"
                                            className="object-cover w-full h-full"
                                            src={
                                                post.header_image.meta
                                                    .download_url
                                            }
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                                <div className="flex h-full gap-4 f justify-between w-full mt-6 sm:mt-0 flex-col sm:ml-12">
                                    <div className="flex justify-between items-center gap-4">
                                        <span className="flex tracking-tight items-center gap-1.5 relative h-6 font-bold text-sm-flat overflow-auto relative z-10 text-gray-900">
                                            <a
                                                key={index}
                                                className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray-200"
                                                href={`/category/${post.categories[0].slug}/`}
                                            >
                                                <svg
                                                    width="64"
                                                    height="64"
                                                    viewBox="0 0 64 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 shrink-0 text-primary-purple"
                                                >
                                                    <path
                                                        opacity="0.2"
                                                        d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        d="M39.8394 18.788C40.2081 17.9317 39.9331 16.9318 39.1769 16.3818C38.4207 15.8318 37.3895 15.8818 36.6833 16.4943L20.6838 30.4938C20.0588 31.0438 19.8338 31.925 20.1276 32.7C20.4213 33.4749 21.1713 33.9999 22.0025 33.9999H28.971L24.1649 45.212C23.7962 46.0683 24.0712 47.0682 24.8274 47.6182C25.5836 48.1682 26.6149 48.1182 27.3211 47.5057L43.3205 33.5062C43.9455 32.9562 44.1705 32.075 43.8767 31.3C43.583 30.5251 42.8393 30.0063 42.0018 30.0063H35.0333L39.8394 18.788Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                                <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                    {post.categories[0].name}
                                                </span>
                                            </a>
                                        </span>
                                        <span className="shrink-0 text-gray-600 mr-2">
                                            <FormattedDate
                                                date={
                                                    post.meta.first_published_at
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <a
                                            className="after:absolute after:inset-0"
                                            href={`/blog/${post.meta.slug}`}
                                        >
                                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium max-w-md wrap-balance">
                                                {post.title}
                                            </h2>
                                        </a>
                                    </div>
                                    <footer className="flex items-center">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 text-sm-flat">
                                                {" "}
                                                {/* <Image
                                                    src="/avatars/charlie-sue.png"
                                                    width={64}
                                                    height={64}
                                                    className="rounded-full w-8 h-8"
                                                    alt="Charlie Sue avatar"
                                                    priority
                                                    style={{
                                                        color: "transparent",
                                                    }}
                                                />
                                                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                    By Charlie Sue
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end grow text-sm-flat font-bold gap-3">
                                            <ViewCountShow
                                                currentViewCount={
                                                    post.view_count
                                                }
                                            />
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>

            {currentPage != 1 && (
                <div className="col-span-12 md:col-span-10 md:col-start-2 grid grid-cols-1 gap-6 mt-12">
                    {filteredPosts.map((post, index) => (
                        <div
                            key={index}
                            className="flex w-full"
                            style={{ opacity: 1, transform: "none" }}
                        >
                            <article className="overflow-hidden flex w-full grow h-full relative border-2 rounded-xl py-6 px-8 sm:flex-row flex-col bg-white border-gray-200 text-gray-900">
                                <div className="shrink-0 sm:w-[160px] xl:w-[260px] ">
                                    <div className="aspect-[258/145] overflow-hidden relative rounded-md">
                                        <Image
                                            alt=""
                                            width="517"
                                            height="290"
                                            className="object-cover w-full h-full"
                                            src={
                                                post.header_image.meta
                                                    .download_url
                                            }
                                            style={{ color: "transparent" }}
                                        />
                                    </div>
                                </div>
                                <div className="flex h-full gap-4 f justify-between w-full mt-6 sm:mt-0 flex-col sm:ml-12">
                                    <div className="flex justify-between items-center gap-4">
                                        <span className="flex tracking-tight items-center gap-1.5 relative h-6 font-bold text-sm-flat overflow-auto relative z-10 text-gray-900">
                                            <a
                                                key={index}
                                                className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray-200"
                                                href={`/category/${post.categories[0].slug}/`}
                                            >
                                                <svg
                                                    width="64"
                                                    height="64"
                                                    viewBox="0 0 64 64"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 shrink-0 text-primary-purple"
                                                >
                                                    <path
                                                        opacity="0.2"
                                                        d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        d="M39.8394 18.788C40.2081 17.9317 39.9331 16.9318 39.1769 16.3818C38.4207 15.8318 37.3895 15.8818 36.6833 16.4943L20.6838 30.4938C20.0588 31.0438 19.8338 31.925 20.1276 32.7C20.4213 33.4749 21.1713 33.9999 22.0025 33.9999H28.971L24.1649 45.212C23.7962 46.0683 24.0712 47.0682 24.8274 47.6182C25.5836 48.1682 26.6149 48.1182 27.3211 47.5057L43.3205 33.5062C43.9455 32.9562 44.1705 32.075 43.8767 31.3C43.583 30.5251 42.8393 30.0063 42.0018 30.0063H35.0333L39.8394 18.788Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                                <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                    {post.categories[0].name}
                                                </span>
                                            </a>
                                        </span>
                                        <span className="shrink-0 text-gray-600 mr-2">
                                            <FormattedDate
                                                date={
                                                    post.meta.first_published_at
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <a
                                            className="after:absolute after:inset-0"
                                            href={`/blog/${post.meta.slug}`}
                                        >
                                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium max-w-md wrap-balance">
                                                {post.title}
                                            </h2>
                                        </a>
                                    </div>
                                    <footer className="flex items-center">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 text-sm-flat">
                                                {" "}
                                                {/* <Image
                                                    src="/avatars/charlie-sue.png"
                                                    width={64}
                                                    height={64}
                                                    className="rounded-full w-8 h-8"
                                                    alt="Charlie Sue avatar"
                                                    priority
                                                    style={{
                                                        color: "transparent",
                                                    }}
                                                />
                                                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                    By Charlie Sue
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end grow text-sm-flat font-bold gap-3">
                                            <ViewCountShow
                                                currentViewCount={
                                                    post.view_count
                                                }
                                            />
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
