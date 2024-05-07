"use client";
import { useState, useEffect } from "react";

export default function FlashText() {
    const messages = [
        "优化你的SEO策略",
        "掌握你的搜索引擎技巧",
        "提升你的SEO执行力",
        "精简你的SEO流程",
        "完善你的SEO方法",
    ];

    const [currentMessage, setCurrentMessage] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);

            setTimeout(() => {
                setCurrentMessage(
                    (prevMessage) => (prevMessage + 1) % messages.length,
                );
                setVisible(true);
            }, 1000); // 等待文字消失后再切换消息
        }, 4000); // 每条消息显示的时间

        return () => clearInterval(interval);
    }, [messages.length]); // Including messages.length in the dependency array

    const characters = Array.from(messages[currentMessage]);
    return (
        <span className="relative font-headings font-bold text-4xl lg:text-6xl 2xl:text-7xl">
            <div
                style={{
                    opacity: visible ? "1" : "0",
                    transition: "opacity 1000ms ease-in-out",
                }}
            >
                {characters.map((char, index) => (
                    <span
                        key={index}
                        className="inline-block"
                        style={{
                            transition: "transform 1000ms ease-out",
                            transform: visible
                                ? "translateX(0)"
                                : "translateX(-100%)",
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </span>
    );
}
