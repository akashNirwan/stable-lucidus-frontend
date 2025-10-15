import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const RoadmapData = ({ roadmapData }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getIconForCategory = (title) => {
    const iconMap = {
      "Subjects to Take in School": "📚",
      "Skills to Develop": "🧠",
      "Extracurriculars to Try": "🌍",
      "Online Courses to Explore": "💻",
      "College & University Degrees": "🏫",
      "Vocational Pathways": "🛠️",
    };
    return iconMap[title] || "📋";
  };

  const getColorForItem = (index) => {
    const colors = [
      "bg-indigo-100 text-indigo-900",
      "bg-purple-100 text-purple-900",
      "bg-blue-100 text-blue-900",
      "bg-green-100 text-green-900",
      "bg-orange-100 text-orange-900",
      "bg-pink-100 text-pink-900",
    ];
    return colors[index % colors.length];
  };

  const transformedData = roadmapData
    ? roadmapData.map((section) => {
        let items = [];

        if (section.subjects?.length > 0) {
          items = section.subjects.map((subject) => ({
            label: subject.subject,
            description: subject.description,
            // icon: subject.icon,
          }));
        } else if (section.skills?.length > 0) {
          items = section.skills.map((skill) => ({
            label: skill.skill,
            description: skill.description,
            // icon: skill.icon,
          }));
        } else if (section.pathways?.length > 0) {
          items = section.pathways.map((pathway) => ({
            label: pathway.title,
            category: pathway.category,
          }));
        }

        return {
          title: section.title,
          icon: getIconForCategory(section.title),
          items,
          active: section.active,
        };
      })
    : [];

  if (!roadmapData || roadmapData.length === 0) {
    return (
      <div className="bg-[#0b0020] min-h-screen flex justify-center items-center py-8">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold mb-2">No Data Available</h2>
          <p className="text-gray-400">
            No roadmap data found for this career path.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen flex justify-center py-8">
      <div className="w-full max-w-sm relative">
        {transformedData.map((section, index) => (
          <div key={section._id || index} className="relative  ">
            {/* vertical line */}
            {index !== transformedData.length - 1 && (
              <div className="absolute left-7 top-0 h-full w-0.5 bg-[#261172] "></div>
            )}

            <div className="relative pb-6">
              <div className="flex items-center gap-2 relative z-10">
                <div className="flex items-center w-full bg-[#261172] p-2 rounded-full">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full p-5 bg-[#7B56FF] relative">
                    {section.icon}
                  </div>

                  <div
                    className={`flex-1 px-4  rounded-full text-white font-medium line-clamp-1 cursor-pointer `}
                    onClick={() => toggle(index)}
                  >
                    {section.title}
                  </div>
                </div>
                <button
                  onClick={() => toggle(index)}
                  className={`w-10 h-10 flex items-center cursor-pointer shrink-0 justify-center rounded-full shadow-md ${
                    openIndex === index ? "bg-[#24A57F]" : "bg-[#5E35F1]"
                  }`}
                >
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_925_4412)">
                        <path
                          d="M8.70956 12.29L11.2996 9.7C11.6896 9.31 12.3196 9.31 12.7096 9.7L15.2996 12.29C15.9296 12.92 15.4796 14 14.5896 14H9.40956C8.51956 14 8.07956 12.92 8.70956 12.29Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_4412">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="matrix(1 0 0 -1 0 24)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_925_4412)">
                        <path
                          d="M15.29 11.71L12.7 14.3C12.31 14.69 11.68 14.69 11.29 14.3L8.7 11.71C8.07 11.08 8.52 10 9.41 10H14.59C15.48 10 15.93 11.08 15.29 11.71Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_925_4412">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </button>
              </div>

              {/* Expanded content */}
              {openIndex === index && (
                <div className="ml-12 mt-4">
                  {section.items.length > 0 ? (
                    <>
                      {[
                        "Extracurriculars to Try",
                        "Online Courses to Explore",
                        "College & University Degrees",
                        "Vocational Pathways",
                      ].includes(section.title) ? (
                        // 📋 Render as list
                        <ul className="list-disc list-inside space-y-2 text-white/90">
                          {section.items.map((item, i) => (
                            <li key={i}>
                              <span className="font-medium">{item.label}</span>
                              {item.description && (
                                <p className="text-sm text-gray-400 mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        // 🟣 Default chip/pill view
                        <div className="flex flex-wrap gap-3">
                          {section.items.map((item, i) => (
                            <div
                              key={i}
                              className={`px-4 py-1.5 rounded-full text-sm font-medium ${getColorForItem(
                                i
                              )}`}
                              title={item.description || item.category || ""}
                            >
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-400 text-sm italic">
                      No items available for this category
                    </div>
                  )}
                </div>
              )}

              <div className="mb-6"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapData;
