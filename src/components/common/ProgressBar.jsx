import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// const data = [
//   {
//     title: "Subjects to Take in School",
//     icon: "📚",
//     items: [
//       { label: "Mathematics", color: "bg-indigo-100 text-indigo-900" },
//       { label: "Economics", color: "bg-indigo-100 text-indigo-900" },
//       { label: "Business Management", color: "bg-indigo-200 text-indigo-900" },
//       { label: "Psychology", color: "bg-indigo-100 text-indigo-900" },
//       { label: "English", color: "bg-orange-200 text-orange-900" },
//       {
//         label: "Information Technology (IGST)",
//         color: "bg-green-200 text-green-900",
//       },
//     ],
//   },
//   { title: "Skills to Develop", icon: "🧠", items: [] },
//   { title: "Extracurriculars to Try", icon: "🌍", items: [] },
//   { title: "Online Courses to Explore", icon: "💻", items: [] },
//   { title: "College & University Degrees", icon: "🏫", items: [] },
//   { title: "Vocational Pathways", icon: "🛠️", items: [] },
// ];


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

   const transformedData = roadmapData ? roadmapData.map((section) => {
    let items = [];

    // Add subjects
    if (section.subjects && section.subjects.length > 0) {
      items = section.subjects.map((subject) => ({
        label: subject.subject,
        description: subject.description,
        icon: subject.icon,
      }));
    }

    // Add skills
    if (section.skills && section.skills.length > 0) {
      items = section.skills.map((skill) => ({
        label: skill.skill,
        description: skill.description,
        icon: skill.icon,
      }));
    }

    // Add pathways
    if (section.pathways && section.pathways.length > 0) {
      items = section.pathways.map((pathway) => ({
        label: pathway.title,
        category: pathway.category,
      }));
    }

    return {
      title: section.title,
      icon: getIconForCategory(section.title),
      items: items,
      active: section.active,
    };
  }) : [];

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
    <div className="bg-[#0b0020] min-h-screen flex justify-center py-8">
      <div className="w-full max-w-sm relative">
        {transformedData.map((section, index) => (
          <div key={section._id || index} className="relative pl-8">
            {/* vertical line */}
            {index !== transformedData.length - 1 && (
              <div className="absolute left-7 top-0 h-full w-0.5 bg-purple-700"></div>
            )}

            <div className="relative pb-6">
              <div className="flex items-center gap-2 relative z-10">
                {/* bubble */}
                <div className="flex items-center  w-full bg-[#261172] p-2 rounded-full">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#7B56FF]  relative">
                    {section.icon}
                  </div>

              {/* Title pill */}
              <div
                className={`flex-1 px-4 py-3 rounded-full text-white font-medium cursor-pointer shadow-md ${
                  section.active ? "bg-purple-900" : "bg-gray-700"
                }`}
                onClick={() => toggle(index)}
              >
                {section.title}
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

            {/* Expanded content */}
            {openIndex === index && (
              <div className="ml-12 mt-4">
                {section.items.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium ${getColorForItem(i)}`}
                        title={item.description || item.category || ""}
                      >
                        {item.icon && <span className="text-sm">{item.icon}</span>}
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
        ))}
      </div>
    </div>
  );
};


//   return (
//     <div className="bg-[#0b0020] min-h-screen flex justify-center py-8">
//       <div className="w-full max-w-sm relative">
//         {data.map((section, index) => (
//           <div key={index} className="relative pl-8">
//             {/* vertical line */}
//             {index !== data.length - 1 && (
//               <div className="absolute left-7 top-0 h-full w-0.5 bg-purple-700"></div>
//             )}

//             {/* Row layout */}
//             <div className="flex items-center gap-2 relative z-10">
//               {/* Icon bubble */}
//               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-lg">
//                 {section.icon}
//               </div>

//               {/* Title pill */}
//               <div
//                 className="flex-1 bg-purple-900 px-4 py-3 rounded-full text-white font-medium cursor-pointer shadow-md"
//                 onClick={() => toggle(index)}
//               >
//                 {section.title}
//               </div>

//               {/* Arrow button */}
//               <button
//                 onClick={() => toggle(index)}
//                 className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md ${
//                   openIndex === index
//                     ? "bg-green-400"
//                     : "bg-gradient-to-r from-purple-500 to-purple-700"
//                 }`}
//               >
//                 {openIndex === index ? (
//                   <ChevronUp className="w-5 h-5 text-white" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5 text-white" />
//                 )}
//               </button>
//             </div>

//             {/* Expanded content */}
//             {openIndex === index && section.items.length > 0 && (
//               <div className="ml-12 mt-4 flex flex-wrap gap-3">
//                 {section.items.map((item, i) => (
//                   <span
//                     key={i}
//                     className={`px-4 py-1.5 rounded-full text-sm font-medium ${item.color}`}
//                   >
//                     {item.label}
//                   </span>
//                 ))}
//               </div>
//             )}

//             <div className="mb-6"></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default RoadmapData;
