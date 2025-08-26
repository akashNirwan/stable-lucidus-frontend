import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";



export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (email, { rejectWithValue }) => {
    try {
      

      const response = await client.post("/user/auth/login", email);

     
      const data = response?.data;
     

      return data;
    } catch (error) {
      
         toast.error(error?.response?.data?.message)
     
      return rejectWithValue(
        error?.response.data.message || "An error occurred during the login process"
      );
    }
  }
);


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://lucidus-api-b0bq.onrender.com/api/v1/user/auth/signup",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);