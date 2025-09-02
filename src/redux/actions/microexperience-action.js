import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; 
import toast from "react-hot-toast";



const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};


export const fetchMicroexperience = createAsyncThunk(
  "microexperience/fetchMicroexperience",
  async (careerId, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/micro-interaction?careerId=${careerId}&levelNumber=${1}`,
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




export const saveAnswer = createAsyncThunk(
  "microexperience/saveAnswer",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `user/micro-interaction/save-answer`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Answer Saved Successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save Answer");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);




export const saveBadge = createAsyncThunk(
  "microexperience/saveBadge",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `user/micro-interaction/save-badge`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Badge Saved Successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save Badge");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const saveInsight = createAsyncThunk(
  "microexperience/saveInsight",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `user/micro-interaction/save-insight`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Insight Saved Successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save Insight");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


export const saveFeedback = createAsyncThunk(
  "microexperience/saveFeedback",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `user/micro-interaction/save-feedback`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Feedback Saved Successfully");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save Feedback");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);