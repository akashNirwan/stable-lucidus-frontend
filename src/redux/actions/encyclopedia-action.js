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
