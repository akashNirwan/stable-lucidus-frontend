import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import OptionButton from "../components/common/OptionButton";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatusTitle from "../components/common/SubTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFigureout,
  fetchStudentData,
} from "../redux/actions/student-onboarding-action";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { getSelectedIds } from "../utils/getSelectedIds";

const FigureOut = ({ setStep, stepsData }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { loading, StudentData, StudentDataLoading } = useSelector(
    (state) => state.student
  );
  const gradeId = searchParams.get("gradeId");

  useEffect(() => {
    dispatch(fetchStudentData()).then(() => {
      setIsDataLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    if (isDataLoaded && StudentData && !selected) {
      const { figureout } = getSelectedIds(StudentData);
      if (figureout) {
        setSelected(figureout);
      }
    }
  }, [isDataLoaded, StudentData, selected]);

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleBack = () => {
    navigate("/questions/grade");
  };

  const handleClick = () => {
    if (!selected) return;

    const payload = {
      figureout: selected,
    };

    dispatch(updateFigureout(payload)).then((res) => {
      if (
        res.payload &&
        (res.payload.code === 200 || res.payload.code === 201)
      ) {
        navigate(`/questions/subject?gradeId=${gradeId}`);
      }
    });
  };

  return StudentDataLoading && !isDataLoaded ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="text-center flex flex-col gap-3  h-[72vh]">
      <h2 className="font-bold text-[20px]">
        What are you here to <span className="text-[#5E35F1]">figure</span> out?{" "}
      </h2>

      <h3 className="text-[#066146] text-[14px]">
        Select <span className="font-bold">all</span> that apply.
      </h3>
      <StatusTitle text={"I want to:"} />

      <div className="h-[32vh] lg:h-[40vh] overflow-y-auto flex flex-col gap-2.5">
        {stepsData.options.map((option, ind) => (
          <OptionButton
            key={ind}
            option={option}
            selected={selected}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <div className="flex gap-4 ">
        <Button
          type="button"
          onClick={handleBack}
          className="bg-white !text-[#0F8864] border !border-[#0F8864] !w-[60%]"
        >
          {"Previous"}
        </Button>

        <Button
          type="button"
          isActive={!!selected}
          disabled={loading}
          onClick={handleClick}
        >
          {loading ? <LoadingSpinner size="20px" color="green" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default FigureOut;
