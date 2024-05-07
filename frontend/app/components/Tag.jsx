const Tag = ({ tag }) => {
    return (
        <a href={`/tags/${tag.slug.toLowerCase()}`}>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-700/10">
                <svg
                    className="w-2 h-2 me-1.5 text-indigo-700"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                    fill="currentColor"
                >
                    <circle cx="3" cy="3" r="3"></circle>
                </svg>
                {tag.name.toUpperCase() ?? "Blog Tag"}
            </span>
            {/* <span className="bg-indigo-600 font-semibold text-white dark:bg-indigo-900 dark:text-white shadow text-sm w-fit px-2 py-1 md:px-5 md:py-2 rounded-full">
                
            </span> */}
        </a>
    );
};

export default Tag;
