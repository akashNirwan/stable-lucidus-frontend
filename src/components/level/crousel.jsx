import React, { useState, useEffect } from "react";
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
import { saveSteps } from "../../redux/actions/microexperience-action";
export default function LevelCarousel({ data, careerLevelId, levelNumber }) {
  const { saveAnswerLoading, saveStepsLoading } = useSelector(
    (state) => state.microexperience
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //  const careerId = data?.careerId.

  const [api, setApi] = useState(null);
  const [selected, setSelected] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const levelPercent =
    levelNumber === "1" ? "5" : levelNumber === "2" ? "30" : "0";
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);
  // const handleSaveAnswer = async () => {
  //   if (selected === null) return;

  //   const selectedQuestion = data?.questions?.[selected];

  //   if (!selectedQuestion) return;

  //   const payload = {
  //     questionId: selectedQuestion._id,
  //   };
  //    const saveStepsPayload = {
  //     careerLevelId : careerLevelId,
  //     route : "/level",
  //     levelPercent : "16.66"
  //    }

  //   await dispatch(saveAnswer(payload));
  //   await dispatch(saveSteps(saveStepsPayload));

  //   navigate(`/feedbackform?careerLevelId=${careerLevelId}&questionId=${selectedQuestion._id}`);
  // };

  const handleSaveAnswer = async () => {
    if (selected === null) return;

    const selectedQuestion = data?.questions?.[selected];

    if (!selectedQuestion) return;

    const payload = {
      questionId: selectedQuestion._id,
      careerLevelId: careerLevelId,
    };

    const saveStepsPayload = {
      careerLevelId: careerLevelId,
      route: `/level?careerLevelId=${careerLevelId}&questionId=${selectedQuestion._id}&levelNumber=${levelNumber}`,
      levelPercent: levelPercent,
    };

    const saveAnswerRes = await dispatch(saveAnswer(payload));

    const saveStepsRes = await dispatch(saveSteps(saveStepsPayload));

    const isSaveAnswerSuccess =
      saveAnswerRes.payload?.code === 200 ||
      saveAnswerRes.payload?.code === 201;
    const isSaveStepsSuccess =
      saveStepsRes.payload?.code === 200 || saveStepsRes.payload?.code === 201;

    if (isSaveAnswerSuccess && isSaveStepsSuccess) {
      navigate(
        `/feedbackform?careerLevelId=${careerLevelId}&questionId=${selectedQuestion._id}&levelNumber=${levelNumber}`
      );
    }
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
                  setSelected(i);
                }}
                className={`bg-white rounded-2xl my-4 shadow-md overflow-hidden p-4 flex flex-col items-center text-center transition-all duration-300 h-[440px] cursor-pointer ${
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
                <h3 className="text-sm font-bold text-[#4823CF] mt-4">
                  {item.title}
                </h3>
                <p className="text-[10px] font-bold text-[#7B56FF] uppercase mt-1">
                  {item.Keyword}
                </p>
                <p className="text-sm text-[#042119] mt-2">
                  {item.description}
                </p>

                {/* ✅ Circle: outlined by default, filled only when clicked */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mt-4 border-2 border-[#0F8864] ${
                    selected === i ? "bg-[#0F8864]" : "bg-transparent"
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
            // className={`h-2 rounded-full transition-all duration-300 ${
            //   selected === i ? "w-4 bg-purple-500" : "w-2 bg-gray-500"
            // }`}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === i ? "w-4 bg-purple-500" : "w-2 bg-gray-500"
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-4 w-full">
        <Button
          onClick={handleSaveAnswer}
          disabled={selected === null || saveAnswerLoading || saveStepsLoading}
          className="mt-2 max-w-[320px] flex justify-center mx-auto mb-2"
        >
          {saveAnswerLoading || saveStepsLoading ? (
            <LoadingSpinner size={20} color="green"></LoadingSpinner>
          ) : (
            data?.questions?.[selected ?? 0]?.buttonName
          )}
        </Button>
      </div>
    </div>
  );
}
