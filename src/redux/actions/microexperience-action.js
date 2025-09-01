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