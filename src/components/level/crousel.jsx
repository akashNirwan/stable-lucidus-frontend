"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
export default function LevelCarousel() {
  const navigate = useNavigate();
  const items = [
    {
      img: "/assets/lvl-2.svg",
      title: "Mosquito Nets",
      subtitle: "SAFER SLEEP, FEWER MEDICAL COSTS",
      description: "Protects the whole family from malaria and other diseases.",
    },
    {
      img: "/assets/lvl-1.svg",
      title: "Light Bulbs",
      subtitle: "SAVE ENERGY, LOWER COSTS",
      description: "Brings brightness to homes while reducing energy bills.",
    },
    {
      img: "/assets/lvl-3.svg",
      title: "Water Filters",
      subtitle: "CLEAN WATER, BETTER HEALTH",
      description: "Ensures safe drinking water and reduces illness risks.",
    },
  ];

  const [api, setApi] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

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
                onClick={() => {
                  api?.scrollTo(i);
                  setSelected(i); // ✅ only update on click
                }}
                className={`bg-white rounded-2xl my-4 shadow-md overflow-hidden p-4 flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
                  selected === i
                    ? "opacity-100 scale-100"
                    : "opacity-50 scale-95"
                }`}
              >
                <div className="rounded-xl overflow-hidden w-[250px] h-[250px]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800 mt-4">
                  {item.title}
                </h3>
                <p className="text-[12px] font-bold text-purple-600 uppercase mt-1">
                  {item.subtitle}
                </p>
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>

                {/* ✅ Circle: outlined by default, filled only when clicked */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mt-4 border-2 border-green-600 ${
                    selected === i ? "bg-green-600" : "bg-transparent"
                  }`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              api?.scrollTo(i);
              setSelected(i); // ✅ sync with click
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              selected === i ? "w-4 bg-purple-500" : "w-2 bg-gray-500"
            }`}
          />
        ))}
      </div>

      <Button
        onClick={() => navigate("/badge-earned")}
        disabled={selected === null ? true : false}
        className="mt-2 max-w-[320px] flex justify-center mx-auto"
      >
        Approve Zuri Loan's
      </Button>
    </div>
  );
}
