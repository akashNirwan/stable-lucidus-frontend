import { createSlice } from "@reduxjs/toolkit";

import { fetchCareers, saveCareer } from "../actions/dashboard-action";


const initialState = {
  dashboard : [],
 loading: false,
  error: null,
  saveCareer : null,
  saveCareerLoading : false,
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
  },
});

export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;