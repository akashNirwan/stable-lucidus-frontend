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
  { title: "Skills to Develop", icon: "🧠", items: [] },
  { title: "Extracurriculars to Try", icon: "🌍", items: [] },
  { title: "Online Courses to Explore", icon: "💻", items: [] },
  { title: "College & University Degrees", icon: "🏫", items: [] },
  { title: "Vocational Pathways", icon: "🛠️", items: [] },
];

const Roadmap = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0b0020] min-h-screen flex justify-center py-8">
      <div className="w-full max-w-sm relative">
        {data.map((section, index) => (
          <div key={index} className="relative pl-8">
            {/* vertical line */}
            {index !== data.length - 1 && (
              <div className="absolute left-7 top-0 h-full w-0.5 bg-purple-700"></div>
            )}

            {/* Row layout */}
            <div className="flex items-center gap-2 relative z-10">
              {/* Icon bubble */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-lg">
                {section.icon}
              </div>

              {/* Title pill */}
              <div
                className="flex-1 bg-purple-900 px-4 py-3 rounded-full text-white font-medium cursor-pointer shadow-md"
                onClick={() => toggle(index)}
              >
                {section.title}
              </div>

              {/* Arrow button */}
              <button
                onClick={() => toggle(index)}
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md ${
                  openIndex === index
                    ? "bg-green-400"
                    : "bg-gradient-to-r from-purple-500 to-purple-700"
                }`}
              >
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-white" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            {/* Expanded content */}
            {openIndex === index && section.items.length > 0 && (
              <div className="ml-12 mt-4 flex flex-wrap gap-3">
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

            <div className="mb-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
