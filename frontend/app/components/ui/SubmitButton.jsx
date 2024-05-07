"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {/* <button
                type="submit"
                className={`bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg transition-all ${
                    pending
                        ? "bg-blue-300 cursor-not-allowed"
                        : "hover:bg-blue-600"
                }`}
                disabled={pending}
            >
                {pending ? "Submitting..." : "Submit"}
            </button> */}
            <button
                className={`rounded-lg font-bold whitespace-nowrap focus:outline-none focus:ring-tertiary-purple disabled:opacity-50 group border-2 focus:ring-4 transition-opacity transition-colors hover:bg-opacity-75 disabled:hover:bg-opacity-100 border-gray-900 py-3 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5 bg-gray-900 text-white px-6 ${pending ? "cursor-not-allowed" : ""} `}
                type="submit"
                disabled={pending}
            >
                {pending ? "提交中..." : "提交"}
            </button>
        </>
    );
}
