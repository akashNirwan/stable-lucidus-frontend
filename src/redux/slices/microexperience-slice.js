import { createSlice } from "@reduxjs/toolkit";

import { fetchMicroexperience } from "../actions/microexperience-action";


const initialState = {
 microexperience : [],
 loading: false,
  error: null,
};


const microexperienceSlice = createSlice({
  name: "microexprience",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
   // FetchCareers
    builder
      .addCase(fetchMicroexperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMicroexperience.fulfilled, (state, action) => {
        state.loading = false;
        state.microexperience = action.payload.data;
        console.log(state.microexperience, "state microexperience");
        
        
      })
      .addCase(fetchMicroexperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch Microexperience";
      });

    
  },
});

export const {  } = microexperienceSlice.actions;
export default microexperienceSlice.reducer;