import React, { useEffect, useState } from "react";
import CareerCard from "../components/dashboard/CareerCard.jsx";
// import { Careers } from "../assets/carrerCard.jsx";
import NextLevelModal from "../components/dashboard/Modal.jsx";
import { fetchCareers } from "../redux/actions/dashboard-action.js";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";
import { useSearchParams } from "react-router-dom";
import { fetchSingleCareers } from "../redux/actions/dashboard-action.js";
const DashBoardMenuTwo = () => {
  const [searchParams] = useSearchParams();
  const careerLevelId = searchParams.get("careerLevelId");
  const Modal = searchParams.get("Modal");

  const [open, setOpen] = useState(Modal);
  const dispatch = useDispatch();
  const {
    dashboard,
    loading,
    error,
    singleCareer,
    loadMoreLoading,
    hasMoreCareers,
    currentPage,
  } = useSelector((state) => state.dashboard);
  const { microexperience, loading: microexperienceLoading } = useSelector(
    (state) => state.microexperience
  );
  const careerId = microexperience?.[0]?.career?.[0]?._id;
  console.log(careerId, "careerid");

  useEffect(() => {
    if (microexperienceLoading) return;
    if (Modal) {
      dispatch(fetchSingleCareers(careerId));
    } else {
      dispatch(fetchCareers({ page: 1 }));
    }
  }, [dispatch, Modal, careerId, microexperienceLoading]);

  const careers = Modal
    ? singleCareer?.data || []
    : dashboard.flatMap((page) => [
        ...(page?.top4 || []),
        ...(page?.wildcard?.filter((w) => w !== null) || []),
      ]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const bottom = scrollHeight - scrollTop - clientHeight < 50;

    if (bottom && hasMoreCareers && !loadMoreLoading && !loading && !Modal) {
      const nextPage = currentPage + 1;
      dispatch(fetchCareers({ page: nextPage }));
    }
  };

  if (microexperienceLoading) {
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>;
  }
  return loading ? (
    <div className="flex items-center justify-center min-h-[400px]">
      <LoadingSpinner size={64} />
    </div>
  ) : (
    <div className="p-4 max-w-[375px]  mx-auto">
      <h3 className="text-[#A187FF] text-[28px] font-bold">Explore Careers</h3>
      <p className="text-[#EFEAFF] leading-[150%] mb-2 text-sm">
        Try micro-experiences to unlock more{" "}
      </p>
      {careers.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-6">
          No data available
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-6 mb-[100px] h-[65dvh] overflow-y-auto"
          onScroll={handleScroll}
        >
          {careers.map((career, index) => {
            if (!career?.career || !career?._id) {
              return null;
            }

            return (
              <CareerCard
                key={career?.careerId || index}
                careerId={career?._id}
                title={career?.career}
                tags={
                  career?.subjects?.flatMap(
                    (s) => s.subject?.map((item) => item.subject) || []
                  ) || ["General"]
                }
                description={career?.description}
                image={career?.image}
                savedCareerCount={career?.savedCareerCount}
              />
            );
          })}
        </div>
      )}

      {loadMoreLoading && (
        <div className="flex items-center justify-center py-4">
          <LoadingSpinner size={32} />
          <span className="ml-2 text-gray-600">Loading more...</span>
        </div>
      )}

      <NextLevelModal
        careerLevelId={careerLevelId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default DashBoardMenuTwo;
