import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
export default function MenuItem({ title, slug, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const handleToggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const submenuClassName = clsx(
        "relative lg:h-auto lg:absolute lg:-z-10 overflow-hidden lg:left-0 lg:top-[95px] w-full lg:px-6 transition-all duration-200 lg:border-b border-[#EEEEEE] dark:border-[#505050] bg-white text-gray-900 dark:bg-gray-900 dark:text-white opacity-0 pointer-events-none -translate-y-1/2 h-0 max-h-0",
        `${isOpen ? "opacity-100 pointer-events-auto translate-y-0 h-auto max-h-[1200px]" : "opacity-0 pointer-events-none -translate-y-1/2 h-0 max-h-0"}`,
    );
    <li className="relative bg-white dark:bg-gray-900 border-[#EEEEEE] dark:border-[#505050] last:border-b lg:border-none z-10 lg:px-3 lg:py-9">
        <a
            className="font-medium flex items-center border-t border-[#EEEEEE] dark:border-[#505050] w-full py-4 lg:py-0 lg:border-none underline-offset-8 focus:outline-none focus:underline"
            data-intellimize-id="menu-item-showcase"
            href="/showcase"
        >
            Showcase
        </a>
    </li>;
    if (children) {
        return (
            <li
                ref={menuRef}
                className="border-[#EEEEEE] dark:border-[#505050] last:border-b lg:border-none"
            >
                <div className="bg-white dark:bg-gray-900 lg:px-3 lg:py-9 relative z-10 lg:static lg:z-0">
                    <button
                        className="sub-menu-trigger-button font-medium flex focus:outline-none group items-center border-t border-[#EEEEEE] dark:border-[#505050] w-full py-4 lg:py-0 lg:border-none z-10"
                        aria-expanded={isOpen}
                        aria-controls="submenu-0"
                        aria-haspopup="true"
                        type="button"
                        data-intellimize-id="menu-item-product"
                        onClick={handleToggle}
                    >
                        <span
                            className={`pointer-events-none underline-offset-8 ${isOpen ? "underline" : "no-underline group-focus:underline"}`}
                        >
                            {title}
                        </span>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform pointer-events-none -mr-2 w-6 h-6 ${isOpen ? "rotate-180" : ""}`}
                        >
                            <path
                                d="m8 10 4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="square"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div
                    id="submenu-0"
                    className={submenuClassName}
                    aria-expanded={isOpen}
                >
                    <div className="px-0 container lg:px-8 flex flex-col lg:flex-row">
                        <div className="flex flex-col lg:w-[26.6666666667%] lg:py-12 gap-3 my-6 lg:my-0">
                            <span className="font-headings tracking-tight text-lg font-semibold mb-3 mt-9 first:mt-0">
                                基础SEO教程
                            </span>
                            {/* <a
                                className="font-bold flex justify-between group flex-col px-6 py-4 border rounded-lg space-y-1 transition-colors border-[#EEEEEE] dark:border-[#505050] hover:bg-gray-900 hover:border-gray-900 hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-gray-900"
                                href="/slice-machine"
                            >
                                <span className="flex items-center">
                                    Slice Machine
                                </span>
                                <span className="font-normal">
                                    Deliver a visual page builder fast
                                </span>
                            </a>
                            <a
                                className="font-bold flex justify-between group flex-col px-6 py-4 border rounded-lg space-y-1 transition-colors border-[#EEEEEE] dark:border-[#505050] hover:bg-gray-900 hover:border-gray-900 hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-gray-900"
                                href="/page-builder"
                            >
                                <span className="flex items-center">
                                    Visual Page Builder
                                </span>
                                <span className="font-normal">
                                    Build a page like a slide deck
                                </span>
                            </a>
                            <a
                                target="_blank"
                                className="font-bold px-6 py-4 mx-6 lg:mx-0 border rounded-lg space-y-1 transition-colors border-[#EEEEEE] dark:border-[#505050] hover:bg-gray-900 hover:border-gray-900 hover:text-white dark:hover:bg-white dark:hover:border-white dark:hover:text-gray-900"
                                rel="noreferrer"
                                href="https://prismic.io/try"
                            >
                                <span className="flex items-center justify-between">
                                    <span>Try editing a page with Prismic</span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </span>
                            </a> */}
                            <span className="font-headings tracking-tight text-lg font-semibold mb-3 mt-9 first:mt-0">
                                工具与软件
                            </span>
                            <Link
                                target=""
                                className="font-bold flex justify-between group leading-6"
                                rel="noreferrer nofollow"
                                href="https://analytics.google.com/analytics/web/"
                            >
                                <span className="flex items-center">
                                    Google Analytics
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </Link>
                            <Link
                                target=""
                                className="font-bold flex justify-between group leading-6"
                                rel="noreferrer nofollow"
                                href="https://search.google.com/"
                            >
                                <span className="flex items-center">
                                    Search Console
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </Link>
                            <Link
                                target=""
                                className="font-bold flex justify-between group leading-6"
                                rel="noreferrer nofollow"
                                href="https://www.screamingfrog.co.uk/seo-spider/"
                            >
                                <span className="flex items-center">
                                    Screaming Frog
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </Link>
                        </div>
                        <div className="w-[10%] shrink-0 justify-center hidden lg:flex">
                            <div className="h-full w-px bg-[#EEEEEE] dark:bg-[#505050]"></div>
                        </div>
                        <div className="flex flex-col lg:w-[26.6666666667%] lg:py-12 gap-3 my-6 lg:my-0">
                            <span className="font-headings tracking-tight text-lg font-semibold mb-3 mt-9 first:mt-0">
                                技术SEO
                            </span>
                            <span
                                className="font-bold flex justify-between group leading-6"
                                // href="/features/slices"
                            >
                                <span className="flex items-center">
                                    结构化数据
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span
                                className="font-bold flex justify-between group leading-6"
                                // href="/features/slices"
                            >
                                <span className="flex items-center">
                                    网站速度提升
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span
                                className="font-bold flex justify-between group leading-6"
                                // href="/features/slices"
                            >
                                <span className="flex items-center">
                                    服务器优化
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>

                            <span className="block h-2"></span>
                            <a
                                className="font-bold flex justify-between group underline underline-offset-8"
                                href="/features"
                            >
                                <span className="flex items-center">
                                    浏览更多技术SEO
                                </span>
                            </a>
                        </div>
                        <div className="w-[10%] shrink-0 justify-center hidden lg:flex">
                            <div className="h-full w-px bg-[#EEEEEE] dark:bg-[#505050]"></div>
                        </div>
                        <div className="flex flex-col lg:w-[26.6666666667%] lg:py-12 gap-3 my-6 lg:my-0">
                            <span className="font-headings tracking-tight text-lg font-semibold mb-3 mt-9 first:mt-0">
                                内容优化
                            </span>
                            <span className="font-bold flex justify-between group leading-6">
                                <span className="flex items-center">
                                    用户需求分析
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span className="font-bold flex justify-between group leading-6">
                                <span className="flex items-center">
                                    关键词研究及应用
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span className="font-headings tracking-tight text-lg font-semibold mb-3 mt-9 first:mt-0">
                                链接建设
                            </span>
                            <span className="font-bold flex justify-between group leading-6">
                                <span className="flex items-center">
                                    外链策略
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span className="font-bold flex justify-between group leading-6">
                                <span className="flex items-center">
                                    内链策略
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                            <span className="font-headings tracking-tight text-lg font-semibold mb-3 mt-9 first:mt-0">
                                案例分析
                            </span>
                            {/* <a
                                className="font-bold flex justify-between group leading-6"
                                href="/features/slices"
                            >
                                <span className="flex items-center">
                                    Slices
                                </span>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transition-opacity opacity-30 group-hover:opacity-100 w-6 h-6"
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </a> */}
                        </div>
                    </div>
                </div>
            </li>
        );
    } else {
        return (
            <li className="relative bg-white dark:bg-gray-900 border-[#EEEEEE] dark:border-[#505050] last:border-b lg:border-none z-10 lg:px-3 lg:py-9">
                <a
                    className="font-medium flex items-center border-t border-[#EEEEEE] dark:border-[#505050] w-full py-4 lg:py-0 lg:border-none underline-offset-8 focus:outline-none focus:underline"
                    data-intellimize-id="menu-item-showcase"
                    href={slug}
                >
                    {title}
                </a>
            </li>
        );
    }
}
