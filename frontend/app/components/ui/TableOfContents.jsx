"use client";
import { useEffect, useState } from "react";
import TableOfContentsHeading from "@components/ui/TableOfContentsHeading";

export default function TableOfContents({ headings }) {
    const [tocIsExpanded, setTocIsExpanded] = useState(false);
    const [activeId, setActiveId] = useState("");
    const [barHeight, setBarHeight] = useState(0);

    // Immediately return null if headings are undefined to prevent further execution
    // if (!headings) {
    //     console.error("Headings is undefined");
    //     return null;
    // }

    function handleClick() {
        setTocIsExpanded(!tocIsExpanded);
    }

    useEffect(() => {
        const navbar = document.getElementById("main-header");
        // if (!navbar) return;

        const navbarHeight = navbar.offsetHeight;
        const handleScroll = () => {
            let currentActiveId = "";
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (
                    element &&
                    window.scrollY + navbarHeight + 100 >= element.offsetTop
                ) {
                    currentActiveId = heading.id;
                }
            });
            setActiveId(currentActiveId);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [headings]);

    useEffect(() => {
        if (activeId !== "") {
            const activeItemElement = document.getElementById(
                `toc-item-${activeId}`,
            );
            if (activeItemElement) {
                setBarHeight(
                    activeItemElement.offsetTop +
                        activeItemElement.offsetHeight,
                );
            }
        }
    }, [activeId]);

    return (
        <>
            <aside
                className="lg:col-span-4 order-1"
                aria-label="Table of contents and sharing"
            >
                <div className="sticky pb-6 top-[120px]">
                    <div className="bg-white dark:bg-slate-900 dark:text-white overflow-hidden pt-6 px-6 pb-2.5 relative border-2 rounded-xl border-gray-200">
                        <header className="pb-4" onClick={handleClick}>
                            <button className="flex justify-between items-center w-full">
                                <h3 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium wrap-balance">
                                    目录
                                </h3>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-7 h-7 -mr-2 transition-transform ${tocIsExpanded ? "-rotate-90" : "rotate-90"} `}
                                >
                                    <path
                                        d="M7 11.25h-.75v1.5H7v-1.5Zm9.75 1.5h.75v-1.5h-.75v1.5Zm-3.22-5.78L13 6.44 11.94 7.5l.53.53 1.06-1.06ZM17.5 12l.53.53.53-.53-.53-.53-.53.53Zm-5.03 3.97-.53.53L13 17.56l.53-.53-1.06-1.06ZM7 12.75h9.75v-1.5H7v1.5Zm5.47-4.72 4.5 4.5 1.06-1.06-4.5-4.5-1.06 1.06Zm4.5 3.44-4.5 4.5 1.06 1.06 4.5-4.5-1.06-1.06Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </button>
                        </header>
                        <div className="relative">
                            <div
                                className="overflow-hidden"
                                style={{
                                    height: tocIsExpanded ? "auto" : "120px",
                                }}
                            >
                                <div
                                    className="relative"
                                    style={
                                        !tocIsExpanded
                                            ? {
                                                  transform:
                                                      barHeight === 0
                                                          ? "none"
                                                          : `translateY(-${barHeight - 54}px) translateZ(0px)`,
                                              }
                                            : undefined
                                    }
                                >
                                    <div className="w-1 bg-purple-100 absolute top-0 left-4 bottom-0 hidden lg:block"></div>
                                    <div
                                        style={{ height: `${barHeight}px` }}
                                        className="w-1 origin-top bg-purple-600 absolute top-0 left-4 hidden lg:block transition-all duration-700 ease-in-out"
                                    ></div>
                                    <ul className="list-none" id="toc">
                                        {headings.map((heading, index) => {
                                            if (
                                                heading.tag == "h2" ||
                                                heading.tag == "h3"
                                            ) {
                                                return (
                                                    <TableOfContentsHeading
                                                        key={heading.id + index}
                                                        heading={heading}
                                                        isActive={
                                                            heading.id ===
                                                            activeId
                                                        }
                                                    />
                                                );
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="absolute transition-opacity w-full inset-0 lg:left-7 bottom-auto hidden lg:block h-4 bg-gradient-to-b from-white to-transparent pointer-events-none opacity-0"></div>
                            <div className="absolute transition-opacity w-full inset-0 lg:left-7 top-auto h-4 bg-gradient-to-t from-white to-transparent pointer-events-none opacity-0"></div>
                        </div>
                        {/* <div className="items-center bg-gray-100 rounded-lg z-10 relative -mx-3.5 py-2.5 pl-16 -mt-2 hidden lg:flex">
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-0 top-0"
                            >
                                <path
                                    d="M32 0C32 0 32 7.92318 32 13C21 13 12 22 12 33C12 44 21 53 32 53C43 53 52 44 52 33C52 22 43 13 32.5 13"
                                    stroke="#EEE3FC"
                                    strokeWidth="4"
                                ></path>
                                <path
                                    d="M32 0C32 0 32 7.92318 32 13C21 13 12 22 12 33C12 44 21 53 32 53C43 53 52 44 52 33C52 22 43 13 32.5 13"
                                    stroke="#8E44EC"
                                    strokeWidth="4"
                                    pathLength="1"
                                    strokeDashoffset="0px"
                                    strokeDasharray="0px 1px"
                                ></path>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M25 30.5C24.4477 30.5 24 30.9477 24 31.5V39.5C24 40.0523 24.4477 40.5 25 40.5H39C39.5523 40.5 40 40.0523 40 39.5V31.5C40 30.9477 39.5523 30.5 39 30.5H25ZM31.5 33.5C30.9477 33.5 30.5 33.9477 30.5 34.5V37.5C30.5 38.0523 30.9477 38.5 31.5 38.5H32.5C33.0523 38.5 33.5 38.0523 33.5 37.5V34.5C33.5 33.9477 33.0523 33.5 32.5 33.5H31.5Z"
                                    fill="#8E44EC"
                                ></path>
                                <path
                                    d="M36.5 30.5V29C36.5 26.5147 34.4853 24.5 32 24.5V24.5C29.5147 24.5 27.5 26.5147 27.5 29V30.5"
                                    stroke="#8E44EC"
                                    strokeWidth="3"
                                    pathLength="1"
                                    strokeDashoffset="0px"
                                    strokeDasharray="1px 1px"
                                ></path>
                            </svg>
                            <div className="text-base-tight flex flex-col">
                                <span className="font-bold">
                                    Congratulations!
                                </span>
                                <span className="text-gray-600">
                                    You’ve thoroughly explored this topic!
                                </span>
                            </div>
                        </div> */}
                        <div className="absolute bottom-10 left-10">
                            <div></div>
                        </div>
                    </div>
                    <div className="mt-6 hidden flex items-center justify-between">
                        <nav className="flex gap-2.5 items-center flex-wrap">
                            <h4 className="font-semibold leading-tight">
                                分享
                            </h4>
                            <div className="flex gap-2.5 items-center">
                                <a
                                    className="block cursor-pointer w-10 h-10 hover:text-gray-600 p-2"
                                    href="http://twitter.com/share?text=Enjoyed%20reading%20What%20is%20Composability%20for%20Websites?,%20from%20the%20Prismic%20blog.%0ACheck%20it%20out%20%F0%9F%91%89&amp;url=https://prismic.io/blog/what-is-composability"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Share on Twitter"
                                >
                                    <svg
                                        viewBox="0 0 64 64"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 mx-auto pointer-events-none"
                                    >
                                        <path
                                            d="M51.066 21.716c.03.426.03.853.03 1.279 0 13.005-9.898 27.99-27.99 27.99-5.573 0-10.75-1.614-15.106-4.416.792.091 1.553.121 2.376.121 4.599 0 8.832-1.553 12.213-4.203a9.855 9.855 0 0 1-9.198-6.822c.609.091 1.218.152 1.858.152.883 0 1.766-.122 2.589-.335a9.839 9.839 0 0 1-7.889-9.655v-.121a9.907 9.907 0 0 0 4.447 1.248 9.83 9.83 0 0 1-4.386-8.193c0-1.827.487-3.502 1.34-4.964A27.963 27.963 0 0 0 31.635 24.09a11.103 11.103 0 0 1-.244-2.253c0-5.422 4.386-9.838 9.837-9.838a9.814 9.814 0 0 1 7.188 3.107 19.369 19.369 0 0 0 6.244-2.376 9.81 9.81 0 0 1-4.325 5.421c1.98-.213 3.899-.761 5.665-1.523a21.146 21.146 0 0 1-4.934 5.087Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </a>
                                <a
                                    className="block cursor-pointer w-10 h-10 hover:text-gray-600 p-2"
                                    href="https://www.linkedin.com/sharing/share-offsite/?url=https://prismic.io/blog/what-is-composability"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Share on LinkedIn"
                                >
                                    <svg
                                        viewBox="0 0 64 64"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 mx-auto pointer-events-none -mt-0.5"
                                    >
                                        <path
                                            d="M18.744 56H8.793V23.953h9.951V56Zm-4.98-36.419C10.58 19.581 8 16.946 8 13.763a5.763 5.763 0 0 1 11.527 0c0 3.183-2.582 5.818-5.764 5.818ZM55.99 56h-9.93V40.4c0-3.718-.075-8.486-5.174-8.486-5.174 0-5.967 4.04-5.967 8.218V56h-9.94V23.953h9.544v4.371h.139c1.329-2.518 4.574-5.175 9.416-5.175C54.15 23.15 56 29.782 56 38.396V56h-.01Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </a>
                                <a
                                    className="block cursor-pointer w-10 h-10 hover:text-gray-600 p-2"
                                    href="mailto:?subject=What%20is%20Composability%20for%20Websites?&amp;body=Hey!%0ACheck%20out%20this%20article%20on%20What%20is%20Composability%20for%20Websites?%20from%20the%20Prismic%20Blog:%20https://prismic.io/blog/what-is-composability"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Share by email"
                                >
                                    <svg
                                        viewBox="0 0 64 64"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 mx-auto pointer-events-none"
                                    >
                                        <path
                                            d="M12.5 14a4.501 4.501 0 0 0-2.7 8.1l20.4 15.3a3.01 3.01 0 0 0 3.6 0l20.4-15.3a4.501 4.501 0 0 0-2.7-8.1h-39ZM8 24.5V44c0 3.31 2.69 6 6 6h36c3.31 0 6-2.69 6-6V24.5L35.6 39.8a5.99 5.99 0 0 1-7.2 0L8 24.5Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </nav>
                        <div className="w-14 h-16 relative rounded-lg shrink-0 bg-gray-100 font-headings flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 bg-quaternary-green"></div>
                            <button className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                <span className="sr-only">Upvote post</span>
                            </button>
                            <span className="relative z-10">6</span>
                            <button className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20">
                                <span className="sr-only">Downvote post</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
