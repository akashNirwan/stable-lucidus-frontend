import { createSlice } from "@reduxjs/toolkit";
import { fetchSchools , updateSchool, fetchGrades, updateGrades} from "../actions/student-onboarding-action";

const initialState = {
  schools : null,
 loading: false,
  error: null,
  updatedSchool: null,
  grades: null,
  updatedGrade: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
   // FetchSchools
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload.data;
        console.log(state.schools, "state schools");
        
        state.totalPages = action.payload.data.totalPages;
        state.totalCount = action?.payload?.data?.totalCount;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch domains";
      });

      builder
      .addCase(updateSchool.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSchool.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedSchool = action.payload; // 👈 store updated response
      })
      .addCase(updateSchool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update school";
      });


        builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = action.payload.data;  
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch grades";
      });

    
    builder
      .addCase(updateGrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGrades.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedGrade = action.payload;  
      })
      .addCase(updateGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update grade";
      });
    
  },
});

export const {  } = studentSlice.actions;
export default studentSlice.reducer;
