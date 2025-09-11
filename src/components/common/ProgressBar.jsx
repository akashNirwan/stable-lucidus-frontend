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
              <div className="absolute left-7 top-0 h-full w-0.5 bg-purple-700"></div>
            )}

            <div className="relative pb-6">
              <div className="flex items-center gap-2 relative z-10">
                <div className="flex items-center w-full bg-[#261172] p-2 rounded-full">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7B56FF] relative">
                    {section.icon}
                  </div>

                  <div
                    className={`flex-1 px-4  rounded-full text-white font-medium line-clamp-1 cursor-pointer shadow-md`}
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
                    <ChevronUp className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>

              {/* Expanded content */}
              {openIndex === index && (
                <div className="ml-12 mt-4">
                  {section.items.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {section.items.map((item, i) => (
                        <div
                          key={i}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium ${getColorForItem(
                            i
                          )}`}
                          title={item.description || item.category || ""}
                        >
                          {/* {item.icon && (
                            <span className="mr-1">{item.icon}</span>
                          )} */}
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
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
