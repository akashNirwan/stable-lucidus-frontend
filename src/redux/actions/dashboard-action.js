import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl"; 
import toast from "react-hot-toast";



const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};


export const fetchCareers = createAsyncThunk(
  "dashboard/fetchCareers",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/recommended-career`,
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