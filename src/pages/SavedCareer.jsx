import React from "react";
import CareerExperienceCard from "./ExperienceCard";
import { fetchSavedCareers } from "../redux/actions/dashboard-action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useEffect } from "react";

const SavedCareer = () => {
  const dispatch = useDispatch();

  const {
    fetchsavedCareer,
    savedCareerLoading,
    loadMoreLoading,
    hasMoreCareers,
    currentPage,
    totalCareers,
    error,
  } = useSelector((state) => state.dashboard);

  console.log(fetchsavedCareer, "fetch save data");

  useEffect(() => {
    dispatch(fetchSavedCareers({ page: 1 }));
  }, [dispatch]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (bottom && hasMoreCareers && !loadMoreLoading && !savedCareerLoading) {
      const nextPage = currentPage + 1;
      console.log(`Loading page ${nextPage}`);
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
      className="h-full overflow-y-auto"
      onScroll={handleScroll}
      style={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <div className="grid gap-4 p-4  mb-24">
        {fetchsavedCareer && fetchsavedCareer.length > 0 ? (
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

        {loadMoreLoading ||
          (savedCareerLoading && (
            <div className="flex items-center justify-center py-4">
              <LoadingSpinner size={32} />
              <span className="ml-2 text-gray-600">Loading more...</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SavedCareer;

//   return savedCareerLoading?  (
//       <div className="flex items-center justify-center min-h-[400px]">
//             <LoadingSpinner size={64} />
//           </div>
//   ) : (

//     <div className="grid gap-4 p-4">
//   {fetchsavedCareer && fetchsavedCareer.length > 0 ? (
//     fetchsavedCareer.map((savedCareer) => (
//       <CareerExperienceCard
//         key={savedCareer._id}
//         careerData={savedCareer.careers[0]}
//         savedCareer={savedCareer}
//         careerId={savedCareer.careerId}
//       />
//     ))
//   ) : (
//     <p className="text-center text-gray-500">No data available</p>
//   )}
// </div>
//   )
// };

// export default SavedCareer;
