import React from "react";

const HeadingComponent = ({ heading, isActive }) => {
    // heading tag is h1 to h6
    const paddingLeftClass =
        {
            h2: "pl-2",
            h3: "pl-6 ",
            h4: "pl-8",
        }[heading.tag] || "pl-2";
    const textBaseClass =
        {
            h2: "text-base",
            h3: "text-sm py-0.5",
            h4: "text-xs py-0.5",
        }[heading.tag] || "text-base";

    return (
        <>
            <li
                id={`toc-item-${heading.id}`}
                className={`first:pt-0 last:pb-6 ${textBaseClass}`}
            >
                <a
                    href={`#${heading.id}`}
                    className={`inline-block lg:ml-8 rounded-sm text-gray-900 dark:text-gray-500 leading-6 px-2 relative transition-colors duration-200 focus:outline-none focus:ring-2 ring-gray-200 ${paddingLeftClass} ${isActive ? "underline" : "text-opacity-50"} hover:text-purple-600 hover:text-opacity-100`}
                >
                    {heading.text}
                </a>
            </li>
        </>
    );
};

export default HeadingComponent;
