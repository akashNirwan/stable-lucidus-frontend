import React, { useState } from "react";
import { X, GripVertical, CheckCircle } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion, AnimatePresence } from "framer-motion";

const initialStrategies = [
  {
    id: "1",
    title: "Education Loans",
    subtitle: "SCHOOL FEES, BOOKS, UNIFORMS",
    description:
      "Give families $200 for children's education. Data shows that parents prioritize paying education loans back.",
  },
  {
    id: "2",
    title: "Business Loans",
    subtitle: "SHOPS, SERVICES, INCOME GROWTH",
    description:
      "Fund small businesses like phone charging or vegetable stands that create village jobs.",
  },
  {
    id: "3",
    title: "Emergency Loans",
    subtitle: "HOME REPAIRS, MEDICAL NEEDS",
    description:
      "Help families fix roofs, pay for medicine, or handle urgent problems quickly.",
  },
];

const L2S6 = () => {
  const [strategies, setStrategies] = useState(initialStrategies);
  const [selectedId, setSelectedId] = useState(null);
  const [showResearch, setShowResearch] = useState(false);

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

  return (
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
                            <h3 className="text-lg font-semibold text-purple-800">
                              {item.title}
                            </h3>
                            {selectedId === item.id && (
                              <CheckCircle className="text-purple-600 w-5 h-5" />
                            )}
                          </div>
                          <p className="text-xs text-purple-600 font-medium uppercase mb-1">
                            {item.subtitle}
                          </p>
                          <p className="text-sm text-gray-800 leading-snug">
                            {item.description}
                          </p>
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
          disabled={!selectedId}
        >
          Make Recommendation
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
            <p className="text-sm text-gray-800 mb-2">
              85% of children want devices that look "cool" to help them feel
              confident at school. 73% of parents worry most about durability
              and safety. Average family saves $200/month for 18 months to
              afford one device.
            </p>
            <p className="text-sm text-gray-800 font-medium">
              <strong>By researching patient dreams and goals</strong>, you
              discovered what matters most to children and families. Biomedical
              Engineers know that understanding user dreams creates breakthrough
              solutions.
            </p>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default L2S6;
