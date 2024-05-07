export default function FilterByTagButton({
    tag,
    filterPosts,
    posts,
    selectedTag,
}) {
    const buttonClass = `leading-4 whitespace-nowrap transition-all p-4 rounded-xl flex items-center relative ${
        selectedTag === tag.slug ? "bg-purple-600 text-white" : "bg-gray-100"
    }`;
    return (
        <span key={tag.slug} className="last:pr-6">
            <button
                onClick={() => filterPosts(tag.slug)}
                className={buttonClass}
            >
                {tag.name}
            </button>
        </span>
    );
}
