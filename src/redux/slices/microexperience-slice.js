import { createSlice } from "@reduxjs/toolkit";

import { fetchMicroexperience , saveAnswer, saveBadge, saveInsight, saveFeedback} from "../actions/microexperience-action";


const initialState = {
 microexperience : [],
 loading: false,
  error: null,
  saveAnswer : null,
  saveAnswerLoading : false,
  saveBadge: null,
  saveBadgeLoading : false,
  saveInsight :null,
  saveInsightLoading : false,
  saveFeedback : null,
  saveFeedbackLoading : false,
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
                  // save Insight
      
              builder
                  .addCase(saveInsight.pending, (state) => {
                    state.saveInsightLoading = true;
                    state.error = null;
                  })
                  .addCase(saveInsight.fulfilled, (state, action) => {
                    state.saveInsightLoading = false;
                    state.saveInsight = action.payload; 
                  })
                  .addCase(saveInsight.rejected, (state, action) => {
                    state.saveInsightLoading = false;
                    state.error = action.payload || "Failed to Save Insight";
                  });

               // save Feedback
      
              builder
                  .addCase(saveFeedback.pending, (state) => {
                    state.saveFeedbackLoading = true;
                    state.error = null;
                  })
                  .addCase(saveFeedback.fulfilled, (state, action) => {
                    state.saveFeedbackLoading = false;
                    state.saveFeedback = action.payload; 
                  })
                  .addCase(saveFeedback.rejected, (state, action) => {
                    state.saveFeedbackLoading = false;
                    state.error = action.payload || "Failed to Save Feedback";
                  });
  },
});

export const {  } = microexperienceSlice.actions;
export default microexperienceSlice.reducer;