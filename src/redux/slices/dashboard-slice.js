import { createSlice } from "@reduxjs/toolkit";

import { fetchCareers, saveCareer, fetchBadges, fetchSavedCareers, fetchDashboardMicroexperience, fetchProfile, updateName} from "../actions/dashboard-action";


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
  dashboardMicroexperience : null,
  dashboardMicroexperienceLoading: false,
   profile : null, 
   profileLoading: false,
   username : null, 
   userLoading : false,
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
        console.log(state.dashboard, "state careers");
        
        
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
        console.log(state.badges, "state badges");
        
        
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
        state.savedCareerLoading = false;
        state.fetchsavedCareer = action.payload.data;
        console.log(action.payload.data, "savedcareers");
        
        
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
        state.dashboardMicroexperienceLoading = false;
        state.dashboardMicroexperience = action.payload.data;
        console.log(action.payload.data, "dashboardsavedcareers");
        
        
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
        console.log(action.payload.data, "profile data state");
        
        
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
        console.log(action.payload.data, "username state");
        
        
      })
      .addCase(updateName.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload?.message || "Failed to update username";
      });
  },
});

export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;