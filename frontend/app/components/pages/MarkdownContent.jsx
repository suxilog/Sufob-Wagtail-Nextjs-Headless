"use client";
import Prism from "prismjs";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-shell-session";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-apacheconf";

import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";

import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
// import "prismjs/plugins/line-numbers/prism-line-numbers";
// import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "prismjs/themes/prism-okaidia.css";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

function highlightCodeInHTML(html) {
    if (typeof document !== "undefined") {
        const container = document.createElement("div");
        // container class set to
        container.innerHTML = html;
        Prism.highlightAllUnder(container);
        return container.innerHTML;
    }
    return html; // Return the original HTML if document is not available
}
export default function MarkdownContent({ content }) {
    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            ref.current
                .querySelectorAll("SufobMDImagePlaceholder")
                .forEach((img) => {
                    const src = img.getAttribute("src");
                    const alt = img.getAttribute("alt");
                    const nextImg = document.createElement("span"); // Create a container for the React component

                    const root = createRoot(nextImg); // Create a root for this element
                    root.render(
                        <Image src={src} alt={alt} width={700} height={400} />
                    );
                    img.replaceWith(nextImg);
                });
        }
    }, [content]);
    return (
        <div
            ref={ref}
            className="md-content my-12 first:mt-0 last:mb-0 max-w-none line-numbers"
            dangerouslySetInnerHTML={{
                __html: highlightCodeInHTML(content),
            }}
        ></div>
    );
}
