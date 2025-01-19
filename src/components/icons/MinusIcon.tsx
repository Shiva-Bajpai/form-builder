import React from "react";

function MinusIcon({ ...props }) {
  return (
    <svg
      {...props}
      width="17"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className=" cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      ></path>
    </svg>
  );
}

export default MinusIcon;
