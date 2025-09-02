

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
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer } from "../../redux/actions/microexperience-action";
import LoadingSpinner from "../common/LoadingSpinner";

export default function LevelCarousel({data, careerId}) {

  console.log(data, "level data");
  const { saveAnswerLoading } = useSelector(
      (state) => state.microexperience
    );

  const navigate = useNavigate();
 const dispatch = useDispatch();

//  const careerId = data?.careerId.

  const [api, setApi] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  const handleSaveAnswer = async () => {
    if (selected === null) return;

    const selectedQuestion = data?.questions?.[selected];

    if (!selectedQuestion) return;

    const payload = {
      questionId: selectedQuestion._id,
    };

    // Dispatch saveAnswer API
    await dispatch(saveAnswer(payload));

    // Navigate after API success
    navigate(`/badge-earned?careerId=${careerId}&questionId=${selectedQuestion._id}`);
  };

  return (
    <div className="w-full md:max-w-sm mx-auto">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="relative"
      >
        <CarouselContent>
          {data?.questions?.map((item, i) => (
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
                    src={item.image}
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
        {data?.questions?.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              api?.scrollTo(i);
              setSelected(i); 
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              selected === i ? "w-4 bg-purple-500" : "w-2 bg-gray-500"
            }`}
          />
        ))}
      </div>

      <Button
        onClick={handleSaveAnswer}
        disabled={selected === null }
        className="mt-2 max-w-[320px] flex justify-center mx-auto"
      >
        { saveAnswerLoading? <LoadingSpinner size={20}></LoadingSpinner> :   data?.questions?.[0]?.buttonName}
      </Button>
    </div>
  );
}
