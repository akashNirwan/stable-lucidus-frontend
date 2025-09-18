import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCareer } from "../../redux/actions/dashboard-action";

const CareerCard = ({
  careerId,
  title,
  tags,
  description,
  image,
  savedCareerCount = 0,
}) => {
  const [saved, setSaved] = useState(savedCareerCount > 0);
  const [activeBtn, setActiveBtn] = useState("experience");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleSaveClick = () => {
  //   setSaved(!saved);
  //   dispatch(saveCareer({ careerId }));
  // };

  const handleSaveClick = () => {
    dispatch(saveCareer({ careerId }))
      .then((response) => {
        if (response.payload?.code === 200 || response.payload?.code === 201) {
          setSaved((prev) => !prev);
        } else {
          console.error("Career not saved, code:", response.payload?.code);
        }
      })
      .catch((error) => {
        console.error("Error saving career:", error);
      });
  };
  const colors = [
    { bg: "bg-orange-200", text: "text-amber-800" },
    { bg: "bg-blue-200", text: "text-blue-700" },
    { bg: "bg-green-200", text: "text-green-700" },
    { bg: "bg-purple-200", text: "text-purple-700" },
    { bg: "bg-pink-200", text: "text-pink-700" },
    { bg: "bg-yellow-200", text: "text-yellow-700" },
    { bg: "bg-teal-200", text: "text-teal-700" },
    { bg: "bg-red-200", text: "text-red-700" },
    { bg: "bg-indigo-200", text: "text-indigo-700" },
    { bg: "bg-lime-200", text: "text-lime-700" },
  ];

  const getColorForTag = (tag) => {
    const hash = [...tag].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const tagColors = useMemo(() => {
    return tags.map((tag) => getColorForTag(tag));
  }, [tags]);
  const handleExperienceClick = () => {
    navigate(`/micro-intro?careerId=${careerId}`);
  };

  const handleMore = () => {
    navigate(`/encyclopedia/purpose?careerId=${careerId}`);
  };
  return (
    <div className="text-white h-[531px] grid  rounded-2xl overflow-hidden relative min-w-[315px] mx-auto">
      <div className=" flex items-center justify-center relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-[54%] absolute top-0 left-0"
          />
        ) : (
          "1"
        )}
      </div>

      <div className="border-0 border-t  rounded-t-3xl bg-white absolute flex flex-col gap-2 bottom-0 w-full h-[280px] p-4">
        <div className="flex justify-between items-center ">
          <h4 className="text-[#042119] text-[20px] line-clamp-1 font-semibold">
            {title}
          </h4>

          <button onClick={handleSaveClick} className="cursor-pointer">
            {saved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#0F8864"
                viewBox="0 0 32 32"
              >
                <path d="M22.6665 4H9.33317C7.8665 4 6.6665 5.2 6.6665 6.66667V28L15.9998 24L25.3332 28V6.66667C25.3332 5.2 24.1332 4 22.6665 4Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
              >
                <path
                  d="M22.6665 4H9.33317C7.8665 4 6.6665 5.2 6.6665 6.66667V28L15.9998 24L25.3332 28V6.66667C25.3332 5.2 24.1332 4 22.6665 4ZM22.6665 24L15.9998 21.0933L9.33317 24V8C9.33317 7.26667 9.93317 6.66667 10.6665 6.66667H21.3332C22.0665 6.66667 22.6665 7.26667 22.6665 8V24Z"
                  fill="#0F8864"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Tags */}
        <div className="flex gap-2 my-2">
          {tags.map((tag, i) => {
            const color = tagColors[i];
            return (
              <span
                key={i}
                className={`px-4 py-1 text-[14px] rounded-full font-medium ${color.bg} ${color.text}`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-[#042119] text-sm  h-[150px] line-clamp-4">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleMore}
            className={`py-[12px] px-[32px] rounded-xl cursor-pointer flex items-center justify-center ${
              activeBtn === "more"
                ? "bg-[#0F8864] text-white"
                : "text-[#0F8864]"
            }`}
          >
            More
          </button>

          <button
            onClick={handleExperienceClick}
            className={`py-[12px] px-[32px] rounded-xl cursor-pointer flex items-center justify-center ${
              activeBtn === "experience"
                ? "bg-[#0F8864] text-white"
                : "text-[#0F8864]"
            }`}
          >
            Experience It
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
