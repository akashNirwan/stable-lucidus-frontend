import { createSlice } from "@reduxjs/toolkit";

import { fetchCareers } from "../actions/dashboard-action";


const initialState = {
  dashboard : [],
 loading: false,
  error: null,
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

    
  },
});

export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;