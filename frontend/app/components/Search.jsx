// Import React and necessary components
"use client";
import React, { useRef, useEffect, useState } from "react";
import SearchIcon from "@components/icons/SearchIcon";
import { searchPosts } from "../lib/data";
import { useSearchParams } from "next/navigation";

const SiteSearch = ({ searchOpen, toggleSearch }) => {
    const openBtnRef = useRef(null);
    const closeBtnRef = useRef(null);
    const dialogRef = useRef(null);
    const dialogFrameRef = useRef(null);
    const searchInputRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const performSearch = async (query) => {
        if (!query.trim()) return;

        setIsSearching(true); // 开始搜索前，设置 isSearching 为 true
        try {
            const data = await searchPosts(query);
            setSearchResults(data.items || []);
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setIsSearching(false); // 无论搜索成功或失败，完成后设置 isSearching 为 false
        }
    };

    return (
        <>
            <div
                className={`flex justify-end transition-all ${searchOpen ? "w-full lg:w-[576px]" : "w-10"}`}
            >
                <button onClick={toggleSearch} className="relative z-10">
                    <span className="sr-only">Search</span>
                    <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-gray-400"
                    >
                        <path
                            opacity="0.2"
                            d="M0 16C0 7.163 7.163 0 16 0h32c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H16C7.163 64 0 56.837 0 48V16Z"
                            fill="currentColor"
                        ></path>
                        <path
                            d="M41.996 28.998c0 2.868-.93 5.518-2.5 7.668l7.912 7.917a2.003 2.003 0 0 1-2.83 2.831l-7.912-7.917c-2.15 1.574-4.8 2.5-7.668 2.5-7.18 0-12.998-5.819-12.998-12.999C16 21.818 21.818 16 28.998 16s12.998 5.818 12.998 12.998Zm-12.998 8.999a8.999 8.999 0 1 0 0-17.998 8.999 8.999 0 0 0 0 17.998Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`flex flex-col transition-all w-full -ml-10 ${searchOpen ? "" : "opacity-0 pointer-events-none"}`}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            performSearch(searchQuery);
                        }}
                    >
                        <input
                            className="blog-search w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-100 pl-12 pr-2 h-10 rounded-[10px] focus:outline-none focus:ring-4 focus:ring-tertiary-purple"
                            placeholder="想知道如何提升网站流量？搜索看看。"
                            type="search"
                            required
                            value={searchQuery}
                            onChange={(e) => {
                                setIsSearching(true);
                                setSearchQuery(e.target.value);
                            }}
                            autoCapitalize="none"
                            enterKeyHint="search"
                        />
                    </form>
                    <div style={{ opacity: 1, transform: "none" }}>
                        {searchQuery && !isSearching && (
                            <div className="relative w-full text-left font-headings">
                                <div className="bg-white border border-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-xl absolute top-1 right-0 left-0 shadow-2xl max-h-[70vh] overflow-auto">
                                    {searchResults.length === 0 ? (
                                        <div className="py-3 px-6">
                                            未找到! 不妨换个关键词试试？
                                        </div>
                                    ) : (
                                        <>
                                            {searchResults.map(
                                                (result, index) => (
                                                    <a
                                                        key={index}
                                                        className="flex leading-tight gap-4 border-t border-gray-200 first:rounded-t-xl last:rounded-b-xl first:border-0 py-3 px-3 focus:outline-none focus:ring-4 ring-inset ring-tertiary-purple transition-colors hover:bg-gray-100 dark:hover:bg-gray-900 items-start"
                                                        href={`/blog/${result.meta.slug}`}
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="lg:text-md">
                                                                <span className="">
                                                                    <span className="">
                                                                        {
                                                                            result.title
                                                                        }
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </a>
                                                ),
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SiteSearch;
