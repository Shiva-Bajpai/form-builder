import React from "react";

function PlusIcon({ ...props }) {
  return (
    <svg
      {...props}
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      className=" cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.83337 7.99992H8.50004M13.1667 7.99992H8.50004M8.50004 7.99992V3.33325M8.50004 7.99992V12.6666"
        stroke="#24292E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PlusIcon;
