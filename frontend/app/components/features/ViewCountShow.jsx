"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
export function ViewCountUpdate({ blogId }) {
    useEffect(() => {
        if (blogId) {
            fetch(`/view-api/update_view_count/${blogId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ blog_id: blogId }),
            })
                .then((res) => res.json())
                .then((data) => {});
        }
    }, [blogId]);

    return null;
}
export default function ViewCountShow({ currentViewCount }) {
    const formatViewCount = (count) => {
        if (count >= 1000 && count < 10000) {
            // For thousands, show one decimal place if less than 10,000 for more precise reading
            return (count / 1000).toFixed(1) + "K";
        } else if (count >= 10000 && count < 1000000) {
            // For ten thousands to less than a million, no decimal places for conciseness
            return Math.round(count / 1000) + "K";
        } else if (count >= 1000000 && count < 10000000) {
            // For millions, show one decimal place if less than 10 million for precision
            return (count / 1000000).toFixed(1) + "M";
        } else if (count >= 10000000) {
            // For ten millions and above, no decimal places for conciseness
            return Math.round(count / 1000000) + "M";
        } else {
            return count.toString();
        }
    };
    if (currentViewCount) {
        return (
            <div className="flex items-center">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-6 h-6 mr-1"
                >
                    <path
                        d="M2.958 12.251c-.001 0 .001-.006.007-.02a.125.125 0 0 1-.007.02ZM3.096 12c.12-.19.301-.446.542-.75A18.495 18.495 0 0 1 5.775 9C7.598 7.374 9.86 6 12 6c2.15 0 4.417 1.332 6.231 2.924.888.779 1.622 1.58 2.127 2.228a7.39 7.39 0 0 1 .583.848 7.39 7.39 0 0 1-.583.848 16.89 16.89 0 0 1-2.127 2.228C16.417 16.668 14.151 18 12 18c-2.14 0-4.402-1.374-6.225-3a18.5 18.5 0 0 1-2.137-2.25 8.932 8.932 0 0 1-.542-.75Zm17.927.173-.003-.012a.087.087 0 0 1 .003.012Zm-.003-.334a.096.096 0 0 1 0 0Zm-18.055-.07a.105.105 0 0 1-.007-.02l.007.02Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    ></path>
                    <path
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        stroke="currentColor"
                        strokeWidth="2"
                    ></path>
                </svg>
                {formatViewCount(currentViewCount)}
            </div>
        );
    } else {
        return null;
    }
}
