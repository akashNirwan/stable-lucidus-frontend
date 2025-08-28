import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center text-white p-4">
      <div>
        <img
          src="/assets/logo.svg"
          alt="Lucidus Logo"
          width={128}
          height={24}
        />
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <g clip-path="url(#clip0_112_2331)">
            <path
              d="M16.0003 2.66669C8.64033 2.66669 2.66699 8.64002 2.66699 16C2.66699 23.36 8.64033 29.3334 16.0003 29.3334C23.3603 29.3334 29.3337 23.36 29.3337 16C29.3337 8.64002 23.3603 2.66669 16.0003 2.66669ZM16.0003 6.66669C18.2137 6.66669 20.0003 8.45335 20.0003 10.6667C20.0003 12.88 18.2137 14.6667 16.0003 14.6667C13.787 14.6667 12.0003 12.88 12.0003 10.6667C12.0003 8.45335 13.787 6.66669 16.0003 6.66669ZM16.0003 25.6C12.667 25.6 9.72032 23.8934 8.00033 21.3067C8.04033 18.6534 13.3337 17.2 16.0003 17.2C18.6537 17.2 23.9603 18.6534 24.0003 21.3067C22.2803 23.8934 19.3337 25.6 16.0003 25.6Z"
              fill="#A187FF"
            />
          </g>
          <defs>
            <clipPath id="clip0_112_2331">
              <rect width="32" height="32" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Header;
