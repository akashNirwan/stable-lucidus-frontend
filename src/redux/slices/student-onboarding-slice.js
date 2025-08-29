import { createSlice } from "@reduxjs/toolkit";
import { fetchSchools , updateSchool, fetchGrades, updateGrades, fetchSkills, updateSkills, fetchSubjects, updateSubjects, fetchSdg, updateSdg, updateAmbition} from "../actions/student-onboarding-action";

const initialState = {
  schools : null,
 loading: false,
  error: null,
  updatedSchool: null,
  grades: null,
  updatedGrade: null,
  gradeLoading : false,
  skills: null,
  updatedSkills: null,
  skillsLoading :false,
  subjects: null,
  updateSubjects : null,
  SubjectsLoading : false,
  sdgs: null,
  updateSdgs : null,
  SdgsLoading : false,
  updateAmbition: null,
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
        state.gradeLoading = true;
        state.error = null;
      })
      .addCase(updateGrades.fulfilled, (state, action) => {
        state.gradeLoading = false;
        state.updatedGrade = action.payload;  
      })
      .addCase(updateGrades.rejected, (state, action) => {
        state.gradeLoading = false;
        state.error = action.payload || "Failed to update grade";
      });
       builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading  = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload.data;  
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Skills";
      });

    
    builder
      .addCase(updateSkills.pending, (state) => {
        state.skillsLoading = true;
        state.error = null;
      })
      .addCase(updateSkills.fulfilled, (state, action) => {
        state.skillsLoading = false;
        state.updatedSkills = action.payload;  
      })
      .addCase(updateSkills.rejected, (state, action) => {
        state.skillsLoading = false;
        state.error = action.payload || "Failed to update Skills";
      });
    


      builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading  = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.data;  
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Subjects";
      });

    
    builder
      .addCase(updateSubjects.pending, (state) => {
        state.SubjectsLoading = true;
        state.error = null;
      })
      .addCase(updateSubjects.fulfilled, (state, action) => {
        state.SubjectsLoading = false;
        state.updateSubjects = action.payload;  
      })
      .addCase(updateSubjects.rejected, (state, action) => {
        state.SubjectsLoading = false;
        state.error = action.payload || "Failed to update Subjects";
      });

      // sdgs

       builder
      .addCase(fetchSdg.pending, (state) => {
        state.loading  = true;
        state.error = null;
      })
      .addCase(fetchSdg.fulfilled, (state, action) => {
        state.loading = false;
        state.sdgs = action.payload.data;  
      })
      .addCase(fetchSdg.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Sdgs";
      });

    
    builder
      .addCase(updateSdg.pending, (state) => {
        state.SdgsLoading = true;
        state.error = null;
      })
      .addCase(updateSdg.fulfilled, (state, action) => {
        state.SdgsLoading = false;
        state.updateSdgs = action.payload;  
      })
      .addCase(updateSdg.rejected, (state, action) => {
        state.SdgsLoading = false;
        state.error = action.payload || "Failed to update Sdgs";
      });


    builder
      .addCase(updateAmbition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAmbition.fulfilled, (state, action) => {
        state.loading = false;
        state.updateAmbition = action.payload;  
      })
      .addCase(updateAmbition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update Sdgs";
      });
    
  },
});

export const {  } = studentSlice.actions;
export default studentSlice.reducer;
