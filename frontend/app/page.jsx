import Image from "next/image";
import Link from "next/link";
import FormattedDate from "@components/features/FormattedDate";
import { getPosts } from "@lib/data";
import FlashText from "@components/home/FlashText";
import ViewCountShow from "@components/features/ViewCountShow";

export default async function Page() {
    const posts = await getPosts(7);
    return (
        <>
            <div className="container my-12">
                <h1 className="font-bold text-base md:text-md mb-4 block text-primary-purple">
                    Charlie Sue外贸站
                </h1>

                {/*  */}
                <FlashText />
            </div>
            <div className="slice-layout w-full text-gray-900 pb-12 md:pb-20 2xl:pb-24">
                <div className="container grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <div className="hidden md:grid grid-cols-1 col-span-1 md:grid-cols-3 lg:col-span-3 xl:col-span-1 xl:grid-cols-1 gap-6 order-2 xl:order-1 xl:row-span-2">
                        {/* 最新文章2-4 */}
                        {posts.items.slice(1, 4).map((post, index) => (
                            <article
                                key={post.id}
                                className="overflow-hidden flex w-full grow h-full relative border-2 rounded-xl flex-col bg-white  border-gray-200 text-gray-900"
                            >
                                <div className="">
                                    <div className="aspect-[258/145] overflow-hidden relative">
                                        <Image
                                            alt=""
                                            width="517"
                                            height="290"
                                            className="object-cover w-full h-full"
                                            style={{ color: "transparent" }}
                                            src={
                                                post.header_image.meta
                                                    .download_url
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex h-full gap-4 f p-4 flex-col">
                                    <div className="flex justify-between items-center gap-4">
                                        <span className="flex tracking-tight items-center gap-1.5 h-6 font-bold text-sm-flat overflow-auto relative z-10 text-gray-900">
                                            {post.categories.map(
                                                (category, index) => (
                                                    <Link
                                                        key={
                                                            category.id + index
                                                        }
                                                        className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray"
                                                        href={`/category/${category.slug}/`}
                                                    >
                                                        <svg
                                                            width="64"
                                                            height="64"
                                                            viewBox="0 0 64 64"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 shrink-0 text-primary-blue"
                                                        >
                                                            <path
                                                                opacity="0.2"
                                                                d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                                fill="currentColor"
                                                            ></path>
                                                            <path
                                                                d="M20 18C17.7938 18 16 19.7938 16 22V26C16 28.2063 17.7938 30 20 30H44C46.2063 30 48 28.2063 48 26V22C48 19.7938 46.2063 18 44 18H20ZM20 34C17.7938 34 16 35.7938 16 38V42C16 44.2063 17.7938 46 20 46H44C46.2063 46 48 44.2063 48 42V38C48 35.7938 46.2063 34 44 34H20Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                        <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                            {category.name}
                                                        </span>
                                                    </Link>
                                                )
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <a
                                            className="after:absolute after:inset-0"
                                            href={`/blog/${post.meta.slug}`}
                                        >
                                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-md-tight 2xl:text-lg font-medium wrap-balance">
                                                {post.title}
                                            </h2>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 order-1 xl:order-2 xl:row-span-1">
                        {/* 最新文章 1 */}
                        <div className="col-span-1 md:col-span-5 lg:col-span-3 grid">
                            <article className="overflow-hidden flex w-full grow h-full relative border-2 rounded-xl flex-col bg-white  border-gray-200 text-gray-900">
                                <div className="">
                                    <div className="aspect-[258/145] overflow-hidden relative">
                                        <Image
                                            alt=""
                                            width="517"
                                            height="290"
                                            className="object-cover w-full h-full"
                                            style={{ color: "transparent" }}
                                            src={
                                                posts.items[0].header_image.meta
                                                    .download_url
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex h-full gap-4 f p-8 flex-col">
                                    <div className="flex justify-between items-center gap-4">
                                        <span className="flex tracking-tight items-center gap-1.5 h-6 font-bold text-sm-flat overflow-auto relative z-10 text-gray-900">
                                            {posts.items[0].categories.map(
                                                (category, index) => (
                                                    <Link
                                                        key={
                                                            category.id + index
                                                        }
                                                        className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray"
                                                        href={`/category/${category.slug}/`}
                                                    >
                                                        <svg
                                                            width="64"
                                                            height="64"
                                                            viewBox="0 0 64 64"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 shrink-0 text-primary-pink"
                                                        >
                                                            <path
                                                                opacity="0.2"
                                                                d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                                fill="currentColor"
                                                            ></path>
                                                            <path
                                                                d="M23 22.5C23.8313 22.5 24.5 21.8313 24.5 21C24.5 20.1688 23.8313 19.5 23 19.5C22.1688 19.5 21.5 20.1688 21.5 21C21.5 21.8313 22.1688 22.5 23 22.5ZM28 21C28 23.05 26.7688 24.8125 25 25.5813V31.0688C26.175 30.3875 27.5438 30 29 30H35C37.2063 30 39 28.2063 39 26V25.5813C37.2313 24.8125 36 23.05 36 21C36 18.2375 38.2375 16 41 16C43.7625 16 46 18.2375 46 21C46 23.05 44.7688 24.8125 43 25.5813V26C43 30.4188 39.4188 34 35 34H29C26.7938 34 25 35.7938 25 38V38.4188C26.7688 39.1875 28 40.95 28 43C28 45.7625 25.7625 48 23 48C20.2375 48 18 45.7625 18 43C18 40.95 19.2313 39.1875 21 38.4188V25.5813C19.2313 24.8125 18 23.05 18 21C18 18.2375 20.2375 16 23 16C25.7625 16 28 18.2375 28 21ZM42.5 21C42.5 20.1688 41.8313 19.5 41 19.5C40.1688 19.5 39.5 20.1688 39.5 21C39.5 21.8313 40.1688 22.5 41 22.5C41.8313 22.5 42.5 21.8313 42.5 21ZM23 44.5C23.8313 44.5 24.5 43.8313 24.5 43C24.5 42.1688 23.8313 41.5 23 41.5C22.1688 41.5 21.5 42.1688 21.5 43C21.5 43.8313 22.1688 44.5 23 44.5Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                        <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                            {category.name}
                                                        </span>
                                                    </Link>
                                                )
                                            )}
                                        </span>
                                        <span className="shrink-0 text-gray-600">
                                            <FormattedDate
                                                date={
                                                    posts.items[0].meta
                                                        .first_published_at
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <a
                                            className="after:absolute after:inset-0"
                                            href={`/blog/${posts.items[0].meta.slug}`}
                                        >
                                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-2xl lg:text-3xl 2xl:text-4xl font-medium wrap-balance">
                                                {posts.items[0].title}
                                            </h2>
                                        </a>
                                        <p className="text-gray-600">
                                            {
                                                posts.items[0].meta
                                                    .search_description
                                            }
                                        </p>
                                    </div>
                                    <footer className="flex items-center">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 text-sm-flat">
                                                {/* <a
                                                    className="flex items-center gap-2 text-sm-flat focus:outline-none focus:ring-2 ring-offset-4 rounded-2xl ring-offset-white ring-gray"
                                                    href="/blog/authors/coner-murphy"
                                                >
                                                    <img
                                                        alt="Coner Murphy profile picture."
                                                        loading="lazy"
                                                        width="64"
                                                        height="64"
                                                        decoding="async"
                                                        data-nimg="1"
                                                        className="rounded-full w-8 h-8"
                                                        style={{
                                                            color: "transparent",
                                                        }}
                                                        src="https://images.prismic.io/prismic-main/Mjc2N2Y2N2QtYTk4Zi00MzA1LWFmYmQtZmFiZGUyOWI3Mjk1_4a5c8696-86bf-4f89-9fa3-31318133e5f3_coner_murphy.jpg?auto=compress%2Cformat&amp;rect=0%2C0%2C1200%2C1126&amp;w=128&amp;fit=max"
                                                    />
                                                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                                                        By Coner Murphy
                                                    </span>
                                                </a> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end grow text-sm-flat font-bold gap-3">
                                            <ViewCountShow
                                                currentViewCount={
                                                    posts.items[0].view_count
                                                }
                                            />
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        </div>
                        {/* 侧边栏 */}
                        {/* <div className="grid grid-cols-1 md:col-span-4 lg:col-span-1 border-2  border-gray-200 rounded-xl overflow-hidden">
                            <div className="border-b-2  border-gray-200 last:border-b-0">
                                <article className="overflow-hidden flex w-full grow h-full relative rounded-xl sm:flex-row bg-white  border-gray-200 text-gray-900">
                                    <div className="flex h-full gap-4 f p-4 justify-between w-full flex-col">
                                        <div className="flex flex-col gap-4 flex-grow">
                                            <a
                                                className="after:absolute after:inset-0"
                                                href="/blog/react-component-libraries"
                                            >
                                                <h2 className="font-headings tracking-tight scroll-mt-[120px] text-base 2xl:md-tight font-medium max-w-md wrap-balance">
                                                    Best 15 React UI Component
                                                    Libraries of 2024
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden m-4">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-teal-200"
                                            style={{ height: "12.8px" }}
                                        ></div>
                                        <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Upvote post
                                            </span>
                                        </button>
                                        <span className="relative z-10">
                                            317
                                        </span>
                                        <button className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Downvote post
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                            <div className="border-b-2  border-gray-200 last:border-b-0">
                                <article className="overflow-hidden flex w-full grow h-full relative rounded-xl sm:flex-row bg-white  border-gray-200 text-gray-900">
                                    <div className="flex h-full gap-4 f p-4 justify-between w-full flex-col">
                                        <div className="flex flex-col gap-4 flex-grow">
                                            <a
                                                className="after:absolute after:inset-0"
                                                href="/blog/nextjs-fonts"
                                            >
                                                <h2 className="font-headings tracking-tight scroll-mt-[120px] text-base 2xl:md-tight font-medium max-w-md wrap-balance">
                                                    How to Add Fonts in Next.js
                                                    13 (Google Fonts, Local
                                                    Fonts, Tailwind CSS)
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden m-4">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-teal-200"
                                            style={{ height: "25.6px" }}
                                        ></div>
                                        <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Upvote post
                                            </span>
                                        </button>
                                        <span className="relative z-10">
                                            271
                                        </span>
                                        <button className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Downvote post
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                            <div className="border-b-2  border-gray-200 last:border-b-0 md:border-b-2">
                                <article className="overflow-hidden flex w-full grow h-full relative rounded-xl sm:flex-row bg-white  border-gray-200 text-gray-900">
                                    <div className="flex h-full gap-4 f p-4 justify-between w-full flex-col">
                                        <div className="flex flex-col gap-4 flex-grow">
                                            <a
                                                className="after:absolute after:inset-0"
                                                href="/blog/what-is-react-suspense"
                                            >
                                                <h2 className="font-headings tracking-tight scroll-mt-[120px] text-base 2xl:md-tight font-medium max-w-md wrap-balance">
                                                    Understanding React Suspense
                                                    with Visuals and Code
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden m-4">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-teal-200"
                                            style={{ height: "0px" }}
                                        ></div>
                                        <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Upvote post
                                            </span>
                                        </button>
                                        <span className="relative z-10">
                                            134
                                        </span>
                                        <button
                                            className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20"
                                            disabled=""
                                        >
                                            <span className="sr-only">
                                                Downvote post
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                            <div className="border-b-2  border-gray-200 last:border-b-0 hidden md:block">
                                <article className="overflow-hidden flex w-full grow h-full relative rounded-xl sm:flex-row bg-white  border-gray-200 text-gray-900">
                                    <div className="flex h-full gap-4 f p-4 justify-between w-full flex-col">
                                        <div className="flex flex-col gap-4 flex-grow">
                                            <a
                                                className="after:absolute after:inset-0"
                                                href="/blog/slice-machine-empowers-developers"
                                            >
                                                <h2 className="font-headings tracking-tight scroll-mt-[120px] text-base 2xl:md-tight font-medium max-w-md wrap-balance">
                                                    6 Ways Slice Machine
                                                    Empowers Developers to Build
                                                    Better Websites
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden m-4">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-teal-200"
                                            style={{ height: "0px" }}
                                        ></div>
                                        <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Upvote post
                                            </span>
                                        </button>
                                        <span className="relative z-10">
                                            121
                                        </span>
                                        <button className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Downvote post
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                            <div className="border-b-2  border-gray-200 last:border-b-0 hidden md:block">
                                <article className="overflow-hidden flex w-full grow h-full relative rounded-xl sm:flex-row bg-white  border-gray-200 text-gray-900">
                                    <div className="flex h-full gap-4 f p-4 justify-between w-full flex-col">
                                        <div className="flex flex-col gap-4 flex-grow">
                                            <a
                                                className="after:absolute after:inset-0"
                                                href="/blog/tailwind-vs-bootstrap"
                                            >
                                                <h2 className="font-headings tracking-tight scroll-mt-[120px] text-base 2xl:md-tight font-medium max-w-md wrap-balance">
                                                    Tailwind CSS vs. Bootstrap:
                                                    Which is better?
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden m-4">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-teal-200"
                                            style={{ height: "0px" }}
                                        ></div>
                                        <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Upvote post
                                            </span>
                                        </button>
                                        <span className="relative z-10">
                                            117
                                        </span>
                                        <button className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Downvote post
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                            <div className="border-b-2  border-gray-200 last:border-b-0 hidden md:block">
                                <article className="overflow-hidden flex w-full grow h-full relative rounded-xl sm:flex-row bg-white  border-gray-200 text-gray-900">
                                    <div className="flex h-full gap-4 f p-4 justify-between w-full flex-col">
                                        <div className="flex flex-col gap-4 flex-grow">
                                            <a
                                                className="after:absolute after:inset-0"
                                                href="/blog/nextjs-13-app-directory"
                                            >
                                                <h2 className="font-headings tracking-tight scroll-mt-[120px] text-base 2xl:md-tight font-medium max-w-md wrap-balance">
                                                    Understanding the Next.js
                                                    App Directory and How to Use
                                                    It
                                                </h2>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden m-4">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-teal-200"
                                            style={{ height: "0px" }}
                                        ></div>
                                        <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Upvote post
                                            </span>
                                        </button>
                                        <span className="relative z-10">
                                            111
                                        </span>
                                        <button className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                            <span className="sr-only">
                                                Downvote post
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </div> */}
                    </div>
                    {/* footer */}
                    <div className="hidden md:grid col-span-1 lg:col-span-3 grid-cols-1 md:grid-cols-3 gap-6 mt-6  order-3 xl:row-span-1">
                        {posts.items.slice(4, 7).map((post, index) => (
                            <article
                                key={index}
                                className="overflow-hidden flex w-full grow h-full relative border-b-2 pb-6 flex-col bg-white  border-gray-200 text-gray-900"
                            >
                                <div className="flex h-full gap-4 f mt-6 sm:mt-0 flex-col">
                                    <div className="flex justify-between items-center gap-4">
                                        <span className="flex tracking-tight items-center gap-1.5 relative h-6 font-bold text-sm-flat overflow-auto z-10 text-gray-900">
                                            {post.categories.map(
                                                (category, index) => (
                                                    <Link
                                                        key={
                                                            category.id + index
                                                        }
                                                        className="flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full ring-offset-white ring-gray"
                                                        href={`/category/${category.slug}/`}
                                                    >
                                                        <svg
                                                            width="64"
                                                            height="64"
                                                            viewBox="0 0 64 64"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="w-5 h-5 shrink-0 text-primary-orange"
                                                        >
                                                            <path
                                                                opacity="0.2"
                                                                d="M0 16C0 7.16344 7.16344 0 16 0H48C56.8366 0 64 7.16344 64 16V48C64 56.8366 56.8366 64 48 64H16C7.16344 64 0 56.8366 0 48V16Z"
                                                                fill="currentColor"
                                                            ></path>
                                                            <path
                                                                d="M34.9985 19C34.9985 20.6562 33.6548 22 31.9985 22C30.3423 22 28.9985 20.6562 28.9985 19C28.9985 17.3438 30.3423 16 31.9985 16C33.6548 16 34.9985 17.3438 34.9985 19ZM31.4985 38V46C31.4985 47.1063 30.6048 48 29.4985 48C28.3923 48 27.4985 47.1063 27.4985 46V32.0562L25.711 35.0312C25.1423 35.975 23.911 36.2812 22.9673 35.7125C22.0235 35.1437 21.7173 33.9125 22.286 32.9688L25.9298 26.9062C27.0173 25.1 28.9673 23.9938 31.0735 23.9938H32.9298C35.036 23.9938 36.986 25.1 38.0735 26.9062L41.7173 32.9688C42.286 33.9125 41.9798 35.1437 41.036 35.7125C40.0923 36.2812 38.861 35.975 38.2923 35.0312L36.4985 32.0562V46C36.4985 47.1063 35.6048 48 34.4985 48C33.3923 48 32.4985 47.1063 32.4985 46V38H31.4985Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                        <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                                                            {category.name}
                                                        </span>
                                                    </Link>
                                                )
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-4 flex-grow">
                                        <a
                                            className="after:absolute after:inset-0"
                                            href={`/blog/${post.meta.slug}`}
                                        >
                                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-md-tight 2xl:text-lg font-medium wrap-balance">
                                                {post.title}
                                            </h2>
                                        </a>
                                    </div>
                                    <footer className="flex items-center">
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 text-sm-flat"></div>
                                        </div>
                                        <div className="flex items-center justify-end grow text-sm-flat font-bold gap-3">
                                            <div className="flex items-center">
                                                <ViewCountShow
                                                    currentViewCount={
                                                        post.view_count
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </footer>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
