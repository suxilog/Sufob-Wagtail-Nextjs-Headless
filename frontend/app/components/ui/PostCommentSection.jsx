"use client";
import { useCallback, useEffect, useState } from "react";
import PostCommentForm from "@components/ui/PostCommentForm";
import PostCommentList from "@components/ui/PostCommentList";
import { PostCommentListSkeleton } from "@ui/skeletons";

export default function PostCommentSection({ blogId }) {
    const [hasNewComment, setHasNewComment] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");

    const handleNewComment = useCallback(() => {
        setHasNewComment((prev) => !prev); // 切换状态来触发更新
    }, []);

    useEffect(() => {
        // 先从sessionStorage尝试获取CSRF token
        const storedCsrfToken = sessionStorage.getItem("csrfToken");
        if (storedCsrfToken) {
            setCsrfToken(storedCsrfToken);
        } else {
            // 如果sessionStorage中没有token，则从服务器获取
            const fetchData = async () => {
                const response = await fetch("/comments/csrf/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setCsrfToken(data.csrftoken);
                sessionStorage.setItem("csrfToken", data.csrftoken); // 存储到sessionStorage
            };
            fetchData();
        }
    }, [blogId]); // 依赖于blogId
    return (
        <div className="border-t-2">
            <PostCommentList
                blogId={blogId}
                onNewComment={handleNewComment}
                csrfToken={csrfToken}
                hasNewComment={hasNewComment}
            />
            <PostCommentForm
                blogId={blogId}
                onNewComment={handleNewComment}
                csrfToken={csrfToken}
            />
        </div>
    );
}
