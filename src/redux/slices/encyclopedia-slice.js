import { createSlice } from "@reduxjs/toolkit";

import { fetchPredictionandPurpose , fetchPath, fetchProcess, fetchRoadmap, fetchLesson} from "../actions/encyclopedia-action";


const initialState = {
  predictionandPurpose : null,
 loading: false,
  error: null,
  path : null,
  pathLoading: false,
  process: null,
  processLoading: null,
   roadmap : null,
   roadmapLoading : false,
   lesson : null,
   lessonLoading : false,

};


const encyclopediaSlice = createSlice({
  name: "encyclopedia",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
   // FetchCpurpose&Prediction
    builder
      .addCase(fetchPredictionandPurpose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPredictionandPurpose.fulfilled, (state, action) => {
        state.loading = false;
        state.predictionandPurpose = action.payload.data;
        console.log(state.predictionandPurpose, "state encyclopedia ");
        
        
      })
      .addCase(fetchPredictionandPurpose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch process";
      });

      // Fetchpath
    builder
      .addCase(fetchPath.pending, (state) => {
        state.pathLoading = true;
        state.error = null;
      })
      .addCase(fetchPath.fulfilled, (state, action) => {
        state.pathLoading = false;
        state.path = action.payload.data;
        console.log(state.path, "state path ");
        
        
      })
      .addCase(fetchPath.rejected, (state, action) => {
        state.pathLoading = false;
        state.error = action.payload?.message || "Failed to fetch path";
      });

      // Fetchprocess
    builder
      .addCase(fetchProcess.pending, (state) => {
        state.processLoading = true;
        state.error = null;
      })
      .addCase(fetchProcess.fulfilled, (state, action) => {
        state.processLoading = false;
        state.process = action.payload.data;
        console.log(state.process, "state process ");
        
        
      })
      .addCase(fetchProcess.rejected, (state, action) => {
        state.processLoading = false;
        state.error = action.payload?.message || "Failed to fetch process";
      });

      // Fetchroadmap
    builder
      .addCase(fetchRoadmap.pending, (state) => {
        state.roadmapLoading = true;
        state.error = null;
      })
      .addCase(fetchRoadmap.fulfilled, (state, action) => {
        state.roadmapLoading = false;
        state.roadmap = action.payload.data;
        console.log(state.roadmap, "state roadmap ");
        
        
      })
      .addCase(fetchRoadmap.rejected, (state, action) => {
        state.roadmapLoading = false;
        state.error = action.payload?.message || "Failed to fetch roadmap";
      });
         
      //fetchlesson
       builder
      .addCase(fetchLesson.pending, (state) => {
        state.lessonLoading = true;
        state.error = null;
      })
      .addCase(fetchLesson.fulfilled, (state, action) => {
        state.lessonLoading = false;
        state.lesson = action.payload.data;
        console.log(state.lesson, "state lesson ");
        
        
      })
      .addCase(fetchLesson.rejected, (state, action) => {
        state.lessonLoading = false;
        state.error = action.payload?.message || "Failed to fetch Lesson";
      });

      
  },
});

export const {  } = encyclopediaSlice.actions;
export default encyclopediaSlice.reducer;