import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const data = [
  {
    title: "Subjects to Take in School",
    icon: "📚",
    items: [
      { label: "Mathematics", color: "bg-indigo-100 text-indigo-900" },
      { label: "Economics", color: "bg-indigo-100 text-indigo-900" },
      { label: "Business Management", color: "bg-indigo-200 text-indigo-900" },
      { label: "Psychology", color: "bg-indigo-100 text-indigo-900" },
      { label: "English", color: "bg-orange-200 text-orange-900" },
      {
        label: "Information Technology (IGST)",
        color: "bg-green-200 text-green-900",
      },
    ],
  },
  {
    title: "Skills to Develop",
    icon: "🧠",
    items: [
      { label: "Mathematics", color: "bg-indigo-100 text-indigo-900" },
      { label: "Economics", color: "bg-indigo-100 text-indigo-900" },
      { label: "Business Management", color: "bg-indigo-200 text-indigo-900" },
      { label: "Psychology", color: "bg-indigo-100 text-indigo-900" },
      { label: "English", color: "bg-orange-200 text-orange-900" },
      {
        label: "Information Technology (IGST)",
        color: "bg-green-200 text-green-900",
      },
    ],
  },
  {
    title: "Extracurriculars to Try",
    icon: "🌍",
    items: [
      "fkfjewifjewfewfew",
      "dasdasdasdsadsa",
      "lorem fswsafwesf fewfwefwefew",
      "dwadwqafjklwefkewf",
    ],
  },
  {
    title: "Online Courses to Explore",
    icon: "💻",
    items: [
      "fkfjewifjewfewfew",
      "dasdasdasdsadsa",
      "lorem fswsafwesf fewfwefwefew",
      "dwadwqafjklwefkewf",
    ],
  },
  {
    title: "College & University Degrees",
    icon: "🏫",
    items: [
      "fkfjewifjewfewfew",
      "dasdasdasdsadsa",
      "lorem fswsafwesf fewfwefwefew",
      "dwadwqafjklwefkewf",
    ],
  },
  {
    title: "Vocational Pathways",
    icon: "🛠️",
    items: [
      "fkfjewifjewfewfew",
      "dasdasdasdsadsa",
      "lorem fswsafwesf fewfwefwefew",
      "dwadwqafjklwefkewf",
    ],
  },
];

const Roadmap = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-sm relative h-fit">
        {data.map((section, index) => (
          <div key={index} className="relative">
            {index !== data.length - 1 && (
              <div className="absolute left-5 top-10 w-0.5 bg-purple-700 bottom-0 transform -translate-x-1/2"></div>
            )}

            <div className="relative pb-6">
              <div className="flex items-center gap-2 relative z-10">
                {/* bubble */}
                <div className="flex items-center  w-full bg-[#261172] p-2 rounded-full">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7B56FF]  relative">
                    {section.icon}
                  </div>

                  <div
                    className="flex-1  px-4 py-3 rounded-full text-white font-medium cursor-pointer shadow-md truncate"
                    onClick={() => toggle(index)}
                  >
                    {section.title}
                  </div>
                </div>

                {/* arrow button */}
                <button
                  onClick={() => toggle(index)}
                  className={`w-10 h-10 flex items-center cursor-pointer justify-center rounded-full shadow-md  ${
                    openIndex === index ? "bg-[#24A57F]" : "bg-[#5E35F1]"
                  }`}
                >
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                    >
                      <path
                        d="M0.709563 1.71L3.29956 4.3C3.68956 4.69 4.31956 4.69 4.70956 4.3L7.29956 1.71C7.92956 1.08 7.47956 0 6.58956 0H1.40956C0.519563 0 0.0795632 1.08 0.709563 1.71Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                    >
                      <path
                        d="M0.709563 3.29L3.29956 0.7C3.68956 0.31 4.31956 0.31 4.70956 0.7L7.29956 3.29C7.92956 3.92 7.47956 5 6.58956 5H1.40956C0.519563 5 0.0795632 3.92 0.709563 3.29Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* expanded dropdown */}
              {openIndex === index && section.items.length > 0 && (
                <div className="ml-12 mt-4">
                  {typeof section.items[0] === "string" ? (
                    <ul className="list-disc list-inside text-white space-y-2 overflow-x-hidden">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm leading-relaxed break-words"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-wrap gap-3 overflow-x-hidden">
                      {section.items.map((item, i) => (
                        <span
                          key={i}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium ${item.color}`}
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
