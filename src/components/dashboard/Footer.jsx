import React from "react";

const Footer = ({ setMenu, menu }) => {
  return (
    <div className="py-4 rounded-t-3xl bg-white border border-b-0 flex justify-between items-center w-full max-w-[750px] mx-auto">
      <div
        className="flex flex-1 flex-col items-center cursor-pointer"
        onClick={() => setMenu(1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
        >
          <path
            d="M4.8335 18H1.3335C0.783496 18 0.333496 17.55 0.333496 17V7C0.333496 6.45 0.783496 6 1.3335 6H4.8335C5.3835 6 5.8335 6.45 5.8335 7V17C5.8335 17.55 5.3835 18 4.8335 18ZM12.0835 0H8.5835C8.0335 0 7.5835 0.45 7.5835 1V17C7.5835 17.55 8.0335 18 8.5835 18H12.0835C12.6335 18 13.0835 17.55 13.0835 17V1C13.0835 0.45 12.6335 0 12.0835 0ZM19.3335 8H15.8335C15.2835 8 14.8335 8.45 14.8335 9V17C14.8335 17.55 15.2835 18 15.8335 18H19.3335C19.8835 18 20.3335 17.55 20.3335 17V9C20.3335 8.45 19.8835 8 19.3335 8Z"
            fill={menu === 1 ? "#24A57F" : "#A187FF"}
          />
        </svg>
        <h4>DashBoard</h4>
      </div>
      <div
        className="flex flex-1 flex-col items-center cursor-pointer"
        onClick={() => setMenu(2)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_991_3089)">
            <path
              d="M12 10.9C11.39 10.9 10.9 11.39 10.9 12C10.9 12.61 11.39 13.1 12 13.1C12.61 13.1 13.1 12.61 13.1 12C13.1 11.39 12.61 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.19 14.19L6 18L9.81 9.81L18 6L14.19 14.19Z"
              fill={menu === 2 ? "#24A57F" : "#A187FF"}
            />
          </g>
          <defs>
            <clipPath id="clip0_991_3089">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h4>Explore</h4>
      </div>
      <div
        className="flex flex-1 flex-col items-center cursor-pointer"
        onClick={() => setMenu(3)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <g clip-path="url(#clip0_991_3094)">
            <path
              d="M19.667 5H17.667V4C17.667 3.45 17.217 3 16.667 3H8.66699C8.11699 3 7.66699 3.45 7.66699 4V5H5.66699C4.56699 5 3.66699 5.9 3.66699 7V8C3.66699 10.55 5.58699 12.63 8.05699 12.94C8.68699 14.44 10.037 15.57 11.667 15.9V19H8.66699C8.11699 19 7.66699 19.45 7.66699 20C7.66699 20.55 8.11699 21 8.66699 21H16.667C17.217 21 17.667 20.55 17.667 20C17.667 19.45 17.217 19 16.667 19H13.667V15.9C15.297 15.57 16.647 14.44 17.277 12.94C19.747 12.63 21.667 10.55 21.667 8V7C21.667 5.9 20.767 5 19.667 5ZM5.66699 8V7H7.66699V10.82C6.50699 10.4 5.66699 9.3 5.66699 8ZM19.667 8C19.667 9.3 18.827 10.4 17.667 10.82V7H19.667V8Z"
              fill={menu === 3 ? "#24A57F" : "#A187FF"}
            />
          </g>
          <defs>
            <clipPath id="clip0_991_3094">
              <rect
                width="24"
                height="24"
                fill="white"
                transform="translate(0.666992)"
              />
            </clipPath>
          </defs>
        </svg>
        <h4>Wins</h4>
      </div>
    </div>
  );
};

export default Footer;
