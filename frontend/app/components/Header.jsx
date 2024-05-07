"use client";
import React, { useEffect, useState } from "react";
import HeaderCategory from "@components/header/HeaderCategory";
import MenuItem from "@components/header/MenuItem";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = ({ categories, isEnabled }) => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState(0);
    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    // useEffect(() => {
    //     const handleDocumentClick = (event) => {
    //         const menu = document.getElementById("sufob-nav-menu");
    //         const menuButton = document.getElementById("sufob-nav-menu-button");
    //         const isClickInside =
    //             menu?.contains(event.target) ||
    //             menuButton?.contains(event.target);

    //         if (isClickInside) {
    //             menu?.classList.toggle("translate-x-96");
    //         } else {
    //             menu?.classList.add("translate-x-96");
    //         }
    //     };

    //     document.addEventListener("click", handleDocumentClick);
    //     return () => {
    //         document.removeEventListener("click", handleDocumentClick);
    //     };
    // }, []);
    useEffect(() => {
        if (isMenuOpen) {
            document.documentElement.classList.add("overflow-hidden");
        }
        return () => {
            document.documentElement.classList.remove("overflow-hidden");
        };
    }, [isMenuOpen]);
    useEffect(() => {
        const navbar = document.getElementById("main-header");
        setNavbarHeight(navbar.offsetHeight);
    }, []);

    return (
        <>
            <header
                id="main-header"
                className="top-0 z-40 py-6 lg:py-0 bg-white dark:bg-gray-900 dark:text-white print:hidden relative"
            >
                <span className="z-20 border-b w-full absolute bottom-0 left-0 border-[#EEEEEE] dark:border-[#505050]"></span>
                <div className="container flex items-center justify-between">
                    <div className="absolute left-0 top-0 bottom-0 bg-white dark:bg-gray-900 z-10 w-1/12 2xl:w-2/12"></div>
                    <div className="absolute right-0 top-0 bottom-0 bg-white dark:bg-gray-900 z-10 w-1/12 2xl:w-2/12"></div>
                    <div className="relative flex flex-wrap items-center z-10 bg-white justify-between dark:bg-gray-900 lg:pr-8 ">
                        <a
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                            href="/"
                        >
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={45}
                                height={45}
                                className="rounded-md focus:outline-none lg:py-[34px]"
                            />
                            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                                Charlie Sue
                            </span>
                        </a>
                    </div>
                    <button
                        onClick={handleToggleMenu}
                        className="lg:hidden w-12 h-12 relative -mr-2 z-20"
                        aria-label="Toggle menu"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-8 w-8 absolute top-2 left-2 transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}
                        >
                            <path
                                d="M4 7h16M4 12h16M4 17h16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            ></path>
                        </svg>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-8 w-8 absolute top-2 left-2 transition-opacity ${isMenuOpen ? "" : "opacity-0"}`}
                        >
                            <path
                                d="m7.757 7.757 8.486 8.486M7.757 16.243l8.486-8.486"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            ></path>
                        </svg>
                    </button>
                    <nav
                        className={`${isMenuOpen ? "fixed flex-grow overflow-auto bottom-0 max-lg:transition-all lg:transition-opacity duration-200 right-0 lg:w-auto lg:p-0 border-l lg:border-none flex flex-col lg:items-center lg:flex-row lg:static lg:space-x-8 bg-white dark:bg-gray-900 border-[#EEEEEE] dark:border-[#505050] opacity-100 w-full mr-0" : "fixed flex-grow overflow-auto bottom-0 max-lg:transition-all lg:transition-opacity duration-200 right-0 lg:p-0 border-l lg:border-none flex flex-col lg:items-center lg:flex-row lg:static lg:space-x-8 bg-white dark:bg-gray-900 border-[#EEEEEE] dark:border-[#505050] opacity-0 w-full pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:w-auto lg:mr-0"}`}
                        style={{ top: `${navbarHeight}px` }}
                    >
                        <div className="order-2 grow lg:order-1 container lg:px-0 lg:mx-0 lg:w-auto">
                            <ul className="flex flex-col lg:items-center lg:flex-row lg:justify-center">
                                <MenuItem title="首页" slug="/" />
                                <MenuItem title="SEO教程">
                                    <div> </div>
                                </MenuItem>
                                <MenuItem title="联系" slug="/contact" />
                                {/* <MenuItem title="Solutions" slug="see-this" /> */}
                            </ul>
                        </div>
                        <div className="container lg:mx-0 lg:w-auto lg:max-w-none justify-end order-1 lg:order-2 flex flex-col sm:flex-row sm:items-center sm:gap-x-4 p-6 lg:p-0 bg-white dark:bg-gray-900 relative z-10">
                            {/* <div className="flex flex-col-reverse gap-y-2 sm:flex-row lg:space-y-0 sm:gap-x-4 order-2 sm:order-1 mt-4 sm:mt-0 text-left lg:py-9">
                                <a href="https://prismic.io/dashboard/login">
                                    Login
                                </a>
                                <a data-intellimize-id="demo-cta" href="/demo">
                                    Request a demo
                                </a>
                            </div> */}
                            {isEnabled && (
                                <a
                                    className="rounded-lg font-bold whitespace-nowrap focus:outline-none focus:ring-tertiary-purple disabled:opacity-50 group border-2 focus:ring-4 transition-opacity transition-colors hover:bg-opacity-75 disabled:hover:bg-opacity-100 border-gray-15 py-3 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5 bg-gray-900 text-white px-6 order-1 lg:order-2 block text-center"
                                    href={`/api/disable-draft/?next=${pathname}`}
                                    data-intellimize-id="signup-cta"
                                >
                                    Exit Preview Mode
                                </a>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <HeaderCategory categories={categories} />
        </>
    );
};

export default Header;
