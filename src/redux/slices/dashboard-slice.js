import { createSlice } from "@reduxjs/toolkit";

import { fetchCareers, saveCareer, fetchBadges, fetchSavedCareers } from "../actions/dashboard-action";


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
  },
});

export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;