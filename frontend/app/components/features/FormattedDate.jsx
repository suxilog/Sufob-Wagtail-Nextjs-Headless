import React from "react";
export const FormattedDateTime = ({ date }) => {
    const dateObj = new Date(date);
    return (
        <span className="text-gray-600 mr-2">
            {dateObj.getFullYear()}-
            {(dateObj.getMonth() + 1).toString().padStart(2, "0")}-
            {dateObj.getDate().toString().padStart(2, "0")}{" "}
            {dateObj.getHours().toString().padStart(2, "0")}:
            {dateObj.getMinutes().toString().padStart(2, "0")}
        </span>
    );
};
const FormattedDate = ({ date }) => {
    const dateObj = new Date(date);

    return (
        <span className="text-gray-600 mr-2">
            {dateObj.getFullYear()}年
            {(dateObj.getMonth() + 1).toString().padStart(2, "0")}月
            {dateObj.getDate().toString().padStart(2, "0")}日{" "}
            {dateObj.getHours().toString().padStart(2, "0")}:
            {dateObj.getMinutes().toString().padStart(2, "0")}
        </span>
    );
};

export default FormattedDate;
