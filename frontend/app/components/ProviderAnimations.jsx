"use client";
import { useEffect } from "react";

const AnimationToggleScript = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!("animations" in localStorage)) {
                localStorage.setItem("animations", "true");
            } else {
                localStorage.setItem("animations", "false");
            }
        }
    }, []);

    return null;
};

export default AnimationToggleScript;
