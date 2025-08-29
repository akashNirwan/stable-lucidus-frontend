import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; 
import toast from "react-hot-toast";



const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchSchools = createAsyncThunk(
  "student/fetchschools",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/school`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      return response.data;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const updateSchool = createAsyncThunk(
  "student/updateSchool",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `onboarding/user/select-school`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "School Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update school");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const fetchGrades = createAsyncThunk(
  "student/fetchgrades",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/grade`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      return response.data;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const updateGrades = createAsyncThunk(
  "student/updateGrades",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `onboarding/user/select-grade`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Grade Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update Grade");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);



export const fetchSkills = createAsyncThunk(
  "student/fetchSkills",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/skill`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      return response.data;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const updateSkills = createAsyncThunk(
  "student/updateSkills",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `onboarding/user/select-skill`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Skills Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update Skills");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);




export const fetchSubjects = createAsyncThunk(
  "student/fetchSubjects",
  async (gradeid, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/subject?gradeId=${gradeid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      return response.data;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const updateSubjects = createAsyncThunk(
  "student/updateSubjects",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `onboarding/user/select-subject`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Subject Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update Subject");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);



export const fetchSdg = createAsyncThunk(
  "student/fetchSdg",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/sdg`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      return response.data;
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const updateSdg = createAsyncThunk(
  "student/updateSdg",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `onboarding/user/select-sdg`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Sdg Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update Skills");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);



export const updateAmbition = createAsyncThunk(
  "student/updateAmbition",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.put(
        `/user/user-details`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Ambition Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add Ambition");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);