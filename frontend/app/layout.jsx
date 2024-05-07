import "@ui/globals.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { getCategories } from "./lib/data";
import { GoogleTagManager } from "@next/third-parties/google";
import { draftMode } from "next/headers";

export const metadata = {
    metadataBase: new URL("https://www.sufob.com"),
    alternates: {},
    title: {
        template: "%s | Charlie Sue外贸站",

        default: "Charlie Sue外贸站",
    },
    openGraph: {
        template: "%s | Charlie Sue外贸站",
        description: "跟Charlie Sue一起探索外贸SEO从基础到高级的最佳实践",
        images: [
            {
                url: "https://www.sufob.com/logo.png",
                width: 100,
                height: 100,
                alt: "Charlie Sue外贸站",
            },
        ],
    },
    description: "跟Charlie Sue一起探索外贸SEO从基础到高级的最佳实践",
};
export const revalidate = 3600;
export default async function RootLayout({ children }) {
    const categories = await getCategories();
    const { isEnabled } = draftMode();
    return (
        <html lang="en" className="scroll-smooth">
            <GoogleTagManager gtmId="GTM-M94J2477" />
            <body
                className={`bg-white text-stone-950 dark:bg-[#0a0910] dark:text-white  antialiased windows`}
            >
                <div className="relative z-10 flex flex-col min-h-screen">
                    <div className="font-copy font-medium antialiased selection:bg-purple-600 selection:text-white">
                        <div className="relative z-10 flex flex-col min-h-screen">
                            <Header
                                categories={categories}
                                isEnabled={isEnabled}
                            />
                            {/* <HeaderCategory categories={categories} /> */}

                            <main className="grow flex flex-col">
                                {children}
                            </main>
                            <slot />
                            <Footer />
                        </div>
                    </div>
                </div>
                <style>
                    {`
                    body {
                        marginLeft: calc(100vw - 100%); /* prevent layout shift */
                    }
                    `}
                </style>
            </body>
        </html>
    );
}
