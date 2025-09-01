// "use client";

import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// export default function LevelCarousel() {
//   const items = [
//     {
//       img: "/assets/lvl-2.svg",
//       title: "Mosquito Nets",
//       subtitle: "SAFER SLEEP, FEWER MEDICAL COSTS",
//       description: "Protects the whole family from malaria and other diseases.",
//     },
//     {
//       img: "/assets/lvl-1.svg",
//       title: "Light Bulbs",
//       subtitle: "SAVE ENERGY, LOWER COSTS",
//       description: "Brings brightness to homes while reducing energy bills.",
//     },
//     {
//       img: "/assets/lvl-3.svg",
//       title: "Water Filters",
//       subtitle: "CLEAN WATER, BETTER HEALTH",
//       description: "Ensures safe drinking water and reduces illness risks.",
//     },
//   ];

//   const [api, setApi] = React.useState<any>(null);
//   const [selected, setSelected] = React.useState(0);

//   React.useEffect(() => {
//     if (!api) return;

//     setSelected(api.selectedScrollSnap());

//     api.on("select", () => {
//       setSelected(api.selectedScrollSnap());
//     });
//   }, [api]);

  return (
    <div className="w-full md:max-w-sm mx-auto">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="relative"
      >
        <CarouselContent>
          {items.map((item, i) => (
            <CarouselItem key={i}>
              <div
                className={`bg-white rounded-2xl my-4 shadow-md overflow-hidden p-4 flex flex-col items-center text-center transition-all duration-300 ${
                  selected === i
                    ? "opacity-100 scale-100"
                    : "opacity-50 scale-95"
                }`}
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-xl object-cover size-[250px]"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mt-4">
                  {item.title}
                </h3>
                <p className="text-[12px] font-bold text-purple-600 uppercase mt-1">
                  {item.subtitle}
                </p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>

//                 <div className="w-6 h-6 border-2 border-green-600 rounded-full flex items-center justify-center mt-4" />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>

//       {/* Pagination */}
//       <div className="flex justify-center gap-2 mt-3">
//         {items.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => api?.scrollTo(i)}
//             className={`h-2 rounded-full transition-all duration-300 ${
//               selected === i ? "w-4 bg-purple-500" : "w-2 bg-gray-500"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
