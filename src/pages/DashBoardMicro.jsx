import React from "react";
import CareerCard from "../components/dashboard/microExperienceCard";
import { fetchDashboardMicroexperience } from "../redux/actions/dashboard-action";
import { useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

const DashBoardMicro = () => {
  const dispatch = useDispatch();
  const {
    dashboardMicroexperience,
    dashboardMicroexperienceLoading,
    loadMoreLoading,
    hasMoreCareers,
    currentPage,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMicroexperience({ page: 1 }));
  }, [dispatch]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

    if (
      bottom &&
      hasMoreCareers &&
      !loadMoreLoading &&
      !dashboardMicroexperienceLoading
    ) {
      const nextPage = currentPage + 1;
      console.log(`Loading page ${nextPage}`);
      dispatch(fetchDashboardMicroexperience({ page: nextPage }));
    }
  };

  if (
    dashboardMicroexperienceLoading &&
    (!dashboardMicroexperience || dashboardMicroexperience.length === 0)
  ) {
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
      <div className="grid gap-4 p-4">
        {dashboardMicroexperience && dashboardMicroexperience.length > 0 ? (
          dashboardMicroexperience.map((item) => (
            <CareerCard key={item._id} data={item} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No micro experiences found
          </p>
        )}

        {loadMoreLoading && (
          <div className="flex items-center justify-center py-4">
            <LoadingSpinner size={32} />
            <span className="ml-2 text-gray-600">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardMicro;

//   return dashboardMicroexperienceLoading ? (

//      <div className="flex items-center justify-center min-h-[400px]">
//           <LoadingSpinner size={64} />
//         </div>

//   ) : (

//       <div className="space-y-4 h-[520px] overflow-y-auto">
//       {dashboardMicroexperience?.map((item) => (
//         <CareerCard
//           key={item._id}
//           data={item}
//         />
//       ))}
//     </div>

//   )
// };

// export default DashBoardMicro;
