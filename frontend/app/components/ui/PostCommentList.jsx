import { useCallback, useEffect, useState } from "react";
import PostCommentItem from "@components/ui/PostCommentItem";
import { PostCommentListSkeleton } from "@ui/skeletons";
import { getPosts } from "@lib/data";
export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        blogId: post.id,
    }));
}

export default function PostCommentList({
    blogId,
    onNewComment,
    csrfToken,
    hasNewComment,
}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalComments, setTotalComments] = useState(0);
    const [replyingId, setReplyingId] = useState(null); // 用于标记当前回复的评论 id

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/comments/${blogId}/list/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setComments(data.data.comments || []);
                    setTotalComments(data.total_comments || 0);
                } else {
                    throw new Error("Failed to fetch comments");
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        setReplyingId(null);
    }, [blogId, hasNewComment]); // 仅依赖 blogId

    const showReplyModal = useCallback((commentId) => {
        setReplyingId((prev) => {
            if (prev === commentId) {
                return null;
            }
            return commentId;
        });
    }, []);

    if (loading) {
        return <PostCommentListSkeleton />;
    }

    return (
        <section className="bg-white dark:bg-gray-900 py-3 lg:py-6 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-stretch">
                    <h2
                        id="commentsSection"
                        className="font-headings self-center tracking-tight scroll-mt-[120px] font-medium wrap-balance"
                    >
                        评论
                    </h2>
                    <span className="self-center">总数：{totalComments}</span>
                </div>
                {comments.map((comment) => (
                    <PostCommentItem
                        key={comment.id}
                        comment={comment}
                        blogId={blogId}
                        onNewComment={onNewComment}
                        csrfToken={csrfToken}
                        showReplyModal={showReplyModal}
                        replyingId={replyingId}
                    />
                ))}
            </div>
        </section>
    );
}
