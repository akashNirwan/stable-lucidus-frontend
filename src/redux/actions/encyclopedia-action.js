import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; 
import toast from "react-hot-toast";



const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};


export const fetchPredictionandPurpose = createAsyncThunk(
  "encyclopedia/fetchPredictionandPurpose",
  async ({careerId,tab} ,{ rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/encyclopedia/prediction-and-purpose?careerId=${careerId}&tab=${tab}`,
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






export const fetchPath = createAsyncThunk(
  "encyclopedia/fetchPath",
  async (careerId ,{ rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/encyclopedia/path?careerId=${careerId}`,
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



export const fetchProcess = createAsyncThunk(
  "encyclopedia/fetchProcess",
  async (careerId ,{ rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/encyclopedia/prowess?careerId=${careerId}`,
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



export const fetchRoadmap = createAsyncThunk(
  "encyclopedia/fetchRoadmap",
  async (careerId ,{ rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/roadmap?careerId=${careerId}`,
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


export const fetchLesson = createAsyncThunk(
  "encyclopedia/fetchLesson",
  async (LessonId ,{ rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/lesson-detail?lessonId=${LessonId}`,
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



export const fetchRecommendedCareer = createAsyncThunk(
  "encyclopedia/fetchRecommendedCareer",
  async (relatedCareerId ,{ rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/related-career?relatedCareerId=${relatedCareerId}`,
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