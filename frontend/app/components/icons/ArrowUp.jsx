import React from "react";

const ArrowUp = ({ width = 24, height = 24 }) => {
    return (
        <svg
            className="feather feather-arrow-up-right"
            fill="none"
            height={height}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
        >
            <line x1="7" x2="17" y1="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    );
};
export default ArrowUp;
