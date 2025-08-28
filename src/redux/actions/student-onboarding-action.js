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