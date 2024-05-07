export const PostCommentListSkeleton = () => {
    return (
        <article className="animate-pulse pb-3 text-base bg-white rounded-lg dark:bg-gray-900 transition-all duration-700 translate-y-3 ease-in-out">
            <div className="flex mb-2">
                <div className="mr-2 w-10 h-10 rounded-full bg-gray-200"></div>{" "}
                {/* 头像 */}
                <div className="ml-3 w-full">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="inline-flex items-center mr-3">
                            <div className="h-4 bg-gray-200 rounded w-1/3"></div>{" "}
                            {/* 昵称 */}
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
                            {/* 日期 */}
                        </div>
                    </footer>
                    <div className="p-3 w-full bg-gray-100 dark:bg-gray-700 rounded"></div>{" "}
                    {/* 评论内容 */}
                    <div className="flex items-center space-x-4 mt-2">
                        <div className="h-6 w-12 bg-gray-200 rounded"></div>{" "}
                        {/* 回复按钮 */}
                    </div>
                </div>
            </div>
            <hr />
            <div className="children mb-3 ml-12 lg:ml-12"></div>{" "}
            {/* 评论子回复区域 */}
        </article>
    );
};

export const PostDetailSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6 p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/12"></div>
            </div>
            <div className="h-64 bg-gray-300 rounded-md"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
            <div className="flex gap-2">
                <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            </div>
        </div>
    );
};
