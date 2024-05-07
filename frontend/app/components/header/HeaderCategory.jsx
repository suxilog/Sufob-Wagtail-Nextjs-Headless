"use client";
import Link from "next/link";
import Search from "@components/Search";
import clsx from "clsx";
import { useState } from "react";
export default function HeaderCategory({ categories }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const toggleSearch = () => setSearchOpen(!searchOpen);
    if (!Array.isArray(categories)) return null;

    return (
        <>
            <div className="sticky z-30 top-0 w-full ">
                <div className="py-6 border-b border-gray-200 bg-white  dark:bg-gray-900 dark:text-white relative z-20">
                    <div
                        className={`container flex items-center relative justify-between ${searchOpen ? "md:gap-2" : "gap-2"}`}
                    >
                        <div
                            className={`overflow-hidden relative transition-all ${searchOpen ? " w-0 md:w-auto" : "w-auto"}`}
                        >
                            <div className="absolute top-0 bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-transparent to-white dark:to-gray-900 z-10"></div>
                            <div className="relative overflow-x-auto overflow-y-hidden py-2">
                                <div className="flex z-30 gap-6 items-center  border-gray-200 whitespace-nowrap">
                                    <Link className="last:pr-10" href="/blog">
                                        最新文章
                                    </Link>
                                    {categories.map((category, index) => (
                                        <Link
                                            key={index}
                                            className="last:pr-10"
                                            href={`/category/${category.slug}`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Search
                            searchOpen={searchOpen}
                            toggleSearch={toggleSearch}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
