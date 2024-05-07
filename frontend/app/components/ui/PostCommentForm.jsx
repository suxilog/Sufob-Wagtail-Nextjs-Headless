"use client";
import { useEffect, useState } from "react";

export default function PostCommentForm({
    blogId,
    parentId,
    onNewComment,
    csrfToken,
    replyTo,
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // 添加用于存储错误消息的状态

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        const formData = new FormData(event.target);
        formData.append("csrfmiddlewaretoken", csrfToken);
        try {
            const response = await fetch(`/comments/${blogId}/add/`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                onNewComment();

                event.target.reset();
            } else {
                console.error(
                    "Failed to submit comment",
                    await response.text(),
                );
                throw new Error("提交评论失败，请稍后再试");
            }
        } catch (error) {
            console.error("Failed to submit comment", error);
            setErrorMessage(error.message || "提交评论失败，请稍后再试");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="flex gap-4 flex-col mt-6 relative"
            onSubmit={handleSubmit}
        >
            <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
            {parentId && <input type="hidden" name="parent" value={parentId} />}
            <div className="grid sm:grid-cols-3 gap-4 w-full">
                <div className="w-full">
                    <input
                        type="text"
                        name="author"
                        required
                        placeholder="昵称(必填)"
                        className="rounded-lg border-2 px-4 py-2 leading-7 focus:outline-none focus:ring-4 focus:ring-tertiary-purple w-full bg-white border-gray-900"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="邮箱(必填)"
                        className="rounded-lg border-2 px-4 py-2 leading-7 focus:outline-none focus:ring-4 focus:ring-tertiary-purple w-full bg-white border-gray-900"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="url"
                        name="website"
                        placeholder="网址"
                        className="rounded-lg border-2 px-4 py-2 leading-7 focus:outline-none focus:ring-4 focus:ring-tertiary-purple w-full bg-white border-gray-900"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 items-start">
                <div className="rounded-xl w-full relative z-10">
                    <textarea
                        required
                        placeholder={` ${replyTo ? "回复 " + replyTo : "评论需要审核"}...`}
                        rows={6}
                        type="text"
                        name="content"
                        className="w-full rounded-xl border-2 px-4 py-2 leading-7 focus:outline-none focus:ring-4 focus:ring-tertiary-purple bg-white border-gray-900"
                    />
                </div>

                <button
                    className="rounded-lg font-bold whitespace-nowrap focus:outline-none focus:ring-tertiary-purple disabled:opacity-50 group border-2 focus:ring-4 transition-opacity transition-colors hover:bg-opacity-75 disabled:hover:bg-opacity-100 border-gray-900 py-3 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5 bg-gray-900 text-white px-6"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <svg
                            className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-gray-100 rounded-full"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0012 20v-4a4 4 0 00-4-4V7.709L6.709 9.29z"
                            />
                        </svg>
                    ) : (
                        "提交"
                    )}
                </button>
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div> // 显示错误消息
                )}
            </div>
        </form>
    );
}
