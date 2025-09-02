import React from "react";
import { useState } from "react";

import TwoLineOption from "../components/common/TwoLineOption";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { saveInsight } from "../redux/actions/microexperience-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
const FeedBackFormTwo = ({microexperience}) => {
const dispatch = useDispatch()
  
const {  saveInsightLoading } = useSelector(
    (state) => state.microexperience
  );
  const navigate = useNavigate();
  

  const stepsData = microexperience[0]?.studentinsights || [];
  const [selected, setSelected] = useState([]);
  
  
  
  const handleSelect = (insight) => {
    setSelected(prev => {
      const isSelected = prev.some(item => item._id === insight._id);
      if (isSelected) {
        return prev.filter(item => item._id !== insight._id);
      } else {
        return [...prev, insight];
      }
    });
  };



   const handleNext = () => {
      const payload = {
        careerLevelId: microexperience?.[0]?._id,
        badge: microexperience?.[0]?.questionbadges?.[0]?.badges?.[0]?.image,
      };
  
      dispatch(saveBadge(payload)).then((res) => {
       
        if (res.payload && res.payload.code === 201 || res.payload.statusCode === 200) {
               navigate(`/student-choice?questionId=${questionId}&careerId=${careerId}`)
        }
      });
    };




  const handleContinue = () => {
    if (selected.length > 0) {
      const payload = {
        selectedInsight: selected.map(insight => ({
          studentInsightId: insight._id,
          icon: insight.icon,
          studentInsight: insight.studentInsight
        })),
        careerLevelId: microexperience[0]?.studentinsights[0]?.careerLevelId
      };
      
      dispatch(saveInsight(payload)).then((res) => {
       
        if (res.payload && res.payload.code === 201 || res.payload.statusCode === 200) {
                navigate(`/survey-page?careerLevelId=${microexperience[0]?.studentinsights[0]?.careerLevelId}`);
        }
        });
    }
   
  };
  return (
    <div className="text-center space-y-4 ">
      <h2 className="font-bold text-[20px]">What guided your choice most?</h2>
      <p>Select all that apply.</p>
      <h3 className="text-lg font-bold text-[#24A57F]">I focused on:</h3>
      <div className="h-[350px] overflow-y-auto flex flex-col gap-2">
        {stepsData.map((insight, ind) => (
          <TwoLineOption
            key={insight._id}
            option={insight.studentInsight}
            selected={selected.some(item => item._id === insight._id)}
            onSelect={() => handleSelect(insight)}
            img={insight.icon}
          />
        ))}
      </div>
      <Button onClick={handleContinue}>
        {saveInsightLoading ? <LoadingSpinner size={20}></LoadingSpinner> : "Continue"}
        </Button>
    </div>
  );
};

export default FeedBackFormTwo;
