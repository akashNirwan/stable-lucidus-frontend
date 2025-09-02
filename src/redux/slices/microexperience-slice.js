import { createSlice } from "@reduxjs/toolkit";

import { fetchMicroexperience , saveAnswer, saveBadge} from "../actions/microexperience-action";


const initialState = {
 microexperience : [],
 loading: false,
  error: null,
  saveAnswer : null,
  saveAnswerLoading : false,
  saveBadge: null,
  saveBadgeLoading : false,
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



      // save Answer
      
              builder
                  .addCase(saveAnswer.pending, (state) => {
                    state.saveAnswerLoading = true;
                    state.error = null;
                  })
                  .addCase(saveAnswer.fulfilled, (state, action) => {
                    state.saveAnswerLoading = false;
                    state.saveAnswer = action.payload; 
                  })
                  .addCase(saveAnswer.rejected, (state, action) => {
                    state.saveAnswerLoading = false;
                    state.error = action.payload || "Failed to Save Answer";
                  });

                  // save Badge
      
              builder
                  .addCase(saveBadge.pending, (state) => {
                    state.saveBadgeLoading = true;
                    state.error = null;
                  })
                  .addCase(saveBadge.fulfilled, (state, action) => {
                    state.saveBadgeLoading = false;
                    state.saveBadge = action.payload; 
                  })
                  .addCase(saveBadge.rejected, (state, action) => {
                    state.saveBadgeLoading = false;
                    state.error = action.payload || "Failed to Save Badge";
                  });

    
  },
});

export const {  } = microexperienceSlice.actions;
export default microexperienceSlice.reducer;