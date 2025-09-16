import React, { useState,useEffect } from "react";
import { X, GripVertical, CheckCircle } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";
import { fetchMicroexperience ,saveSteps, saveAnswer, saveOrder} from "../redux/actions/microexperience-action";
import { useDispatch,useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const DragAndDrop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [searchParams] = useSearchParams();
     const careerLevelId = searchParams.get("careerLevelId");
  const levelNumber = searchParams.get("levelNumber");
  const questionId = searchParams.get("questionId")
  const [strategies, setStrategies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showResearch, setShowResearch] = useState(false);
  const [currentDecisionOutcome, setCurrentDecisionOutcome] = useState("");
 const { microexperience, loading, saveStepsLoading, saveOrderLoading, saveAnswerLoading } = useSelector(
    (state) => state.microexperience
  );
 
  const DragandDropData = microexperience?.[0]?.recommendations;
    console.log(DragandDropData, "DragandDropData");

    const questions = microexperience?.[0]?.questions
    console.log(questions, "questions");
    
    
useEffect(() => {
  if (DragandDropData && DragandDropData.length > 0) {
    setStrategies(
      DragandDropData.map((item) => ({
        id: item._id,            
        title: item.recommendation, 
      }))
    );
  }
}, [DragandDropData]);

useEffect(() => {
    if (careerLevelId) {
      dispatch(fetchMicroexperience({ careerLevelId }));
    }
  }, [dispatch, careerLevelId]);

  useEffect(() => {
  if (questions && questionId) {
    const matchedQuestion = questions.find(
      (q) => q._id === questionId
    );

    if (matchedQuestion) {
      setCurrentDecisionOutcome(matchedQuestion.decisionOutCome);
    }
  }
}, [questions, questionId]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    setStrategies((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(result.source.index, 1);
      copy.splice(result.destination.index, 0, moved);
      return copy;
    });
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };


//   const handleMakeRecommendation = () => {
//   const payload = {
//     careerLevelId,
       
//     route: `/drag-and-drop?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionLeveltwoId=${selectedId}`,
//     levelPercent: "50",
//   };

//   const saveAnswerPayload = {
//     careerLevelId,
//     questionId: selectedId,
//   }


//   dispatch(saveSteps(payload)).then((res) => {
//     if (res?.payload?.code === 200 || res?.payload?.code === 201) {
//       navigate(`/next-step?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}`);
//     }
//   });
// };

const handleMakeRecommendation = async () => {
  const payload = {
    careerLevelId,
    route: `/drag-and-drop?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionId=${questionId}&questionLeveltwoId=${selectedId}`,
    levelPercent: "30",
  };

  const saveAnswerPayload = {
    careerLevelId,
    questionId: selectedId,
  };
  const saveOrderPayload = {
    careerLevelId,
    userOrder: strategies.map((strategy, index) => ({
      questionId: strategy.id,
      order: index + 1
    }))
  };

  const saveAnswerRes = await dispatch(saveAnswer(saveAnswerPayload));
   const saveOrderRes = await dispatch(saveOrder(saveOrderPayload));
  const saveStepsRes = await dispatch(saveSteps(payload));

  const isSaveAnswerSuccess =
    saveAnswerRes.payload?.code === 200 ||
    saveAnswerRes.payload?.code === 201;

    const isSaveOrderSuccess = 
    saveOrderRes.payload?.code === 200 ||
    saveOrderRes.payload?.code === 201;

  const isSaveStepsSuccess =
    saveStepsRes.payload?.code === 200 ||
    saveStepsRes.payload?.code === 201;

  if (isSaveAnswerSuccess && isSaveOrderSuccess && isSaveStepsSuccess) {
    navigate(
      `/feedbackform-level-two?careerLevelId=${careerLevelId}&levelNumber=${levelNumber}&questionLeveltwoId=${selectedId}`
    );
  }
};
  return loading ? (


    <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size={64} />
        </div>
   
  ) : (

      <div className="min-h-screen bg-[#1A104F] text-white p-5 flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <img
          src="/assets/logo.svg"
          alt="Lucidus Logo"
          width={128}
          height={24}
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <button className="text-white">{/* Back Arrow */}←</button>
        <span className="bg-[#7C5CFF] text-xs px-3 py-1 rounded-full font-semibold">
          LEVEL 2
        </span>
        <button>
          <X className="text-white" />
        </button>
      </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold mb-1">
          Choose your strategy
        </h2>
        <p className="text-center text-teal-300 mb-6">
          Drag and reorder to prioritize.
        </p>

      {/* Draggable List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="strategies">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4"
            >
              {strategies.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      onClick={() => handleSelect(item.id)}
                      className={`rounded-2xl p-4 shadow-md transition border-2 cursor-pointer ${
                        selectedId === item.id
                          ? "bg-purple-100 border-purple-500"
                          : "bg-white border-transparent"
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          {...provided.dragHandleProps}
                          className="mt-1 cursor-grab"
                        >
                          <GripVertical
                            className={`${
                              selectedId === item.id
                                ? "text-purple-600"
                                : "text-green-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                           <h2 className="text-black">
                <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
              </h2>
                            {selectedId === item.id && (
                              <CheckCircle className="text-purple-600 w-5 h-5" />
                            )}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Bottom Buttons */}
      <div className="mt-auto space-y-3 pt-6 z-50">
        <button
          onClick={() => setShowResearch(!showResearch)}
          className="w-full bg-[#432B9A] text-white py-3 rounded-xl font-medium"
        >
          Your Research {showResearch ? "▲" : "▼"}
        </button>
        <button
          className="w-full bg-[#00A074] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
          disabled={!selectedId || saveStepsLoading}
          onClick={handleMakeRecommendation}
        >
         {saveStepsLoading || saveAnswerLoading|| saveOrderLoading? (
    <LoadingSpinner size={20} />
  ) : (
    "Make Recommendation"
  )}
        </button>
      </div>

        {/* Research Popup */}

        {showResearch && (
          <>
            {/* Overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setShowResearch(false)} // click outside to close
            />

          {/* Popup */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed bottom-36 left-4 right-4 bg-[#DFF8EF] rounded-3xl p-6 shadow-2xl text-black z-40"
          >
            <div className="flex justify-between items-center mb-4 mx-auto">
              <div className="bg-[#00A074] text-white text-xs px-3 py-1 rounded-full mx-auto">
                YOUR RESEARCH
              </div>
            </div>
            <div
  className="text-center"
  dangerouslySetInnerHTML={{ __html: currentDecisionOutcome }}
></div>
          </motion.div>
        </>
      )}
    </div>

  )
};

export default DragAndDrop;
