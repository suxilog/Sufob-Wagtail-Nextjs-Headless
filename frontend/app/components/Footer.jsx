const today = new Date();
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 2xl:py-10 print:hidden">
            {/* <div className="container flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-12 grid-rows-2 lg:grid-rows-1">
                <div className="col-span-1">
                    <div className="group mt-12 first:mt-0">
                        <div>
                            <div className="font-copy font-medium print:text-[10px] print:text-justify opacity-75 text-base">
                                <p className="my-6 first:mt-0 last:mb-0 print:my-2 text-gray-15">
                                    版权所有
                                </p>
                            </div>
                            <nav className="flex gap-4 mt-6">
                                <a
                                    className="block focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm "
                                    rel="noreferrer"
                                    href="https://twitter.com/#"
                                >
                                    <svg
                                        width="32"
                                        height="33"
                                        viewBox="0 0 32 33"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22.2439 7.25H25.5519L18.3249 15.51L26.8269 26.75H20.1699L14.9559 19.933L8.98991 26.75H5.67991L13.4099 17.915L5.25391 7.25H12.0799L16.7929 13.481L22.2439 7.25ZM21.0829 24.77H22.9159L11.0839 9.126H9.11691L21.0829 24.77Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">X</span>
                                </a>
                                <a
                                    className="block focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm "
                                    rel="noreferrer"
                                    href="https://youtube.com/#"
                                >
                                    <span className="sr-only">YouTube</span>
                                </a>
                                <a
                                    className="block focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm "
                                    rel="noreferrer"
                                    href="https://www.linkedin.com/#"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className="group mt-12 first:mt-0">
                        <div>
                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium mb-8 wrap-balance text-white">
                                博客
                            </h2>
                            <a className="block text-gray-100 opacity-75 mt-4 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm hover:opacity-100 hover:text-white transition-colors">
                                关于
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <div className="group mt-12 first:mt-0">
                        <div>
                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium mb-8 wrap-balance text-white">
                                对比
                            </h2>
                            <a
                                className="block text-gray-100 opacity-75 mt-4 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm hover:opacity-100 hover:text-white transition-colors"
                                href="/vs"
                            >
                                Wagtail
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="group mt-12 first:mt-0">
                        <div>
                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium mb-8 wrap-balance text-white">
                                产品
                            </h2>
                            <a
                                className="block text-gray-100 opacity-75 mt-4 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm hover:opacity-100 hover:text-white transition-colors"
                                href="/slice-machine"
                            >
                                Slice Machine
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="group mt-12 first:mt-0">
                        <div>
                            <h2 className="font-headings tracking-tight scroll-mt-[120px] text-xl-tight 2xl:2xl-tight font-medium mb-8 wrap-balance text-white">
                                框架
                            </h2>
                            <a
                                className="block text-gray-100 opacity-75 mt-4 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-15 ring-gray-50 rounded-sm hover:opacity-100 hover:text-white transition-colors"
                                href="/nextjs-cms"
                            >
                                Wagtail CMS
                            </a>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="container md:flex md:items-center md:justify-between">
                <div className="font-copy font-medium opacity-75 text-base">
                    <span className="my-3 text-gray-15">
                        © {today.getFullYear()} 保留所有权利
                    </span>
                </div>
                <div className="font-copy font-medium print:text-[10px] print:text-justify opacity-75 text-base">
                    <span className="my-3 text-gray-15">
                        Email:<a href="mailto:sue@sufob.com">sue@sufob.com</a>
                    </span>
                </div>
                <div className="font-copy font-medium print:text-[10px] print:text-justify opacity-75 text-base">
                    <span className="my-3 text-gray-15">
                        <a
                            className="text-gray-15 hover:text-white transition-colors"
                            href="https://beian.miit.gov.cn/"
                        >
                            鲁ICP备20025184号-1
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    );
}
