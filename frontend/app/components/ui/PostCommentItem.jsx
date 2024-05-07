import { FormattedDateTime } from "@components/features/FormattedDate";
import { useEffect, useState } from "react";
import PostCommentForm from "@components/ui/PostCommentForm";
import Image from "next/image";
export default function PostCommentItem({
    comment,
    blogId,
    onNewComment,
    showReplyModal,
    replyingId,
    csrfToken,
}) {
    const currentReplied = replyingId === comment.id;
    const renderReplies = (replies) => {
        if (!replies || !Array.isArray(replies) || replies.length === 0) {
            return null;
        }
        return replies.map((child) => (
            <PostCommentItem
                key={child.id}
                comment={child}
                blogId={blogId}
                showReplyModal={showReplyModal}
                replyingId={replyingId}
                onNewComment={onNewComment}
                csrfToken={csrfToken}
            />
        ));
    };

    return (
        <article
            id={`comment-${comment.id}`}
            className="pb-3 text-base bg-white rounded-lg dark:bg-gray-900 transition-all duration-700 translate-y-3 ease-in-out"
        >
            <div className="flex mb-2">
                <div>
                    <Image
                        src="/avatars/avatar.png"
                        alt="avatar"
                        width={40}
                        height={40}
                        className="mr-2 w-10 h-10"
                    />
                </div>
                <div className="ml-3 w-full">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            {comment.author}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <time>
                                <FormattedDateTime date={comment.created_at} />
                            </time>
                        </div>
                    </footer>

                    <div className="p-3 text-gray-500 w-full bg-gray-100 dark:text-gray-400">
                        {comment.content}
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => showReplyModal(comment.id)}
                            type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        >
                            <svg
                                className="mr-1.5 w-3.5 h-3.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 18"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                />
                            </svg>
                            {currentReplied ? "取消回复" : "回复"}
                        </button>
                    </div>
                </div>
            </div>

            {currentReplied && (
                <div className="py-1">
                    <PostCommentForm
                        parentId={comment.id}
                        blogId={blogId}
                        onNewComment={onNewComment}
                        csrfToken={csrfToken}
                        replyTo={comment.author}
                    />
                </div>
            )}
            <hr />
            {comment.replies && (
                <div className="children mb-3 ml-12 lg:ml-12">
                    {renderReplies(comment.replies)}
                </div>
            )}
        </article>
    );
}
