import React, { useEffect } from "react";
import CareerExperienceCard from "./ExperienceCard";
import { fetchSavedCareers } from "../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";

const SavedCareer = () => {
  const dispatch = useDispatch();
  const {
    fetchsavedCareer = [],
    savedCareerLoading,
    loadMoreLoading,
    hasMoreCareers,
    currentPage,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSavedCareers({ page: 1 }));
  }, [dispatch]);

  const handleScroll = (e) => {
    const isBottom =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 2;

    if (isBottom && hasMoreCareers && !loadMoreLoading && !savedCareerLoading) {
      const nextPage = currentPage + 1;
      dispatch(fetchSavedCareers({ page: nextPage }));
    }
  };

  if (savedCareerLoading && fetchsavedCareer.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size={64} />
      </div>
    );
  }

  return (
    <div
      className="overflow-y-auto mb-20 border"
      style={{ maxHeight: "calc(100vh - 100px)" }}
      onScroll={handleScroll}
    >
      <div className="grid gap-4 p-4">
        {fetchsavedCareer.length > 0 ? (
          fetchsavedCareer.map((savedCareer) => (
            <CareerExperienceCard
              key={savedCareer._id}
              careerData={savedCareer.careers[0]}
              savedCareer={savedCareer}
              careerId={savedCareer.careerId}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No saved careers found</p>
        )}

        {(loadMoreLoading || savedCareerLoading) && (
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner size={32} />
            <span className="ml-2 text-gray-600">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCareer;
