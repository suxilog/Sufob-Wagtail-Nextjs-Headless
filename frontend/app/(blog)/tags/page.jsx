import { getTags } from "../../lib/data";

export default async function Page() {
    const tags = await getTags();
    return (
        <>
            <div className="flex justify-center flex-wrap gap-4">
                {tags.map((tag) => (
                    <a
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        className="inline-block bg-gray-200  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                        #{tag}
                    </a>
                ))}
            </div>
        </>
    );
}
