import { createSlice } from "@reduxjs/toolkit";

import { fetchCareers, saveCareer, fetchBadges, fetchSavedCareers, fetchDashboardMicroexperience, fetchProfile, updateName, fetchSingleCareers} from "../actions/dashboard-action";


const initialState = {
  dashboard : [],
 loading: false,
  error: null,
  saveCareer : null,
  saveCareerLoading : false,
  badgesLoading: false,
  badges:[],
  fetchsavedCareer : [],
  savedCareerLoading : false,
  loadMoreLoading: false, 
  hasMoreCareers: true, 
  currentPage: 1, 
  totalCareers: 0,
  dashboardMicroexperience : null,
  dashboardMicroexperienceLoading: false,
   profile : null, 
   profileLoading: false,
   username : null, 
   userLoading : false,
   singleCareer : null,
   singleCareerLoading : false,
};


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
   // FetchCareers
    builder
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload.data;
  
        
        
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Careers";
      });

      // save career

        builder
            .addCase(saveCareer.pending, (state) => {
              state.saveCareerLoading = true;
              state.error = null;
            })
            .addCase(saveCareer.fulfilled, (state, action) => {
              state.saveCareerLoading = false;
              state.saveCareer = action.payload; 
              state.fetchsavedCareer = state.fetchsavedCareer.filter(
        (career) => career.careerId !== action.payload.careerId
      );
            })
            .addCase(saveCareer.rejected, (state, action) => {
              state.saveCareerLoading = false;
              state.error = action.payload || "Failed to Save Career";
            });
              // fetch badges
             builder
      .addCase(fetchBadges.pending, (state) => {
        state.badgesLoading = true;
        state.error = null;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.badgesLoading = false;
        state.badges = action.payload.data;
        
        
        
      })
      .addCase(fetchBadges.rejected, (state, action) => {
        state.badgesLoading = false;
        state.error = action.payload?.message || "Failed to fetch Badges";
      });


      // fetchsaved careers
             builder
      .addCase(fetchSavedCareers.pending, (state) => {
        state.savedCareerLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedCareers.fulfilled, (state, action) => {
        const { data, total, page, isLoadMore } = action.payload;
        state.savedCareerLoading = false;
         state.loadMoreLoading = false;

         if (isLoadMore) {
          // Append new data for load more
          state.fetchsavedCareer = [...state.fetchsavedCareer, ...data];
        } else {
          // Replace data for first page
          state.fetchsavedCareer = data;
        }
        
        state.currentPage = page;
        state.totalCareers = total;
        state.hasMoreCareers = state.fetchsavedCareer.length < total;


        
        
      })
      .addCase(fetchSavedCareers.rejected, (state, action) => {
        state.savedCareerLoading = false;
        state.error = action.payload?.message || "Failed to fetch saved Careers";
      });


      
       //fetchdashboardmicroexperience
       builder
      .addCase(fetchDashboardMicroexperience.pending, (state) => {
        state.dashboardMicroexperienceLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardMicroexperience.fulfilled, (state, action) => {
         const { data, total, page, isLoadMore } = action.payload;
        state.dashboardMicroexperienceLoading = false;
         state.loadMoreLoading = false;

            if (isLoadMore) {
          // Append new data for load more
          state.dashboardMicroexperience = [...state.dashboardMicroexperience, ...data];
        } else {
          // Replace data for first page
          state.dashboardMicroexperience = data;
        }
        
        state.currentPage = page;
        state.totalCareers = total;
        state.hasMoreCareers = state.dashboardMicroexperience.length < total;



        
        
      })
      .addCase(fetchDashboardMicroexperience.rejected, (state, action) => {
        state.dashboardMicroexperienceLoading = false;
        state.error = action.payload?.message || "Failed to fetch Careers";
      });


      //fetchprofile
       builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload.data;

        
        
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload?.message || "Failed to fetch profile";
      });

      //update username
       builder
      .addCase(updateName.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.userLoading = false;
        state.username = action.payload.data;

        
        
      })
      .addCase(updateName.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload?.message || "Failed to update username";
      });



      //fetchSingleCareer
       builder
      .addCase(fetchSingleCareers.pending, (state) => {
        state.singleCareerLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCareers.fulfilled, (state, action) => {
        state.singleCareerLoading = false;
        state.singleCareer = action.payload;   
      })
      .addCase(fetchSingleCareers.rejected, (state, action) => {
        state.singleCareerLoading = false;
        state.error = action.payload?.message || "Failed to fetch Career";
      });
  },
});

export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;