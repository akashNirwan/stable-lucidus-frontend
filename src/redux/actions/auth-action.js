import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios-baseurl";
import toast from "react-hot-toast";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("/user/auth/login", data);

      // toast.success(response?.data?.message || "OTP ")
      return response?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);

      return rejectWithValue(
        error?.response.data.message ||
          "An error occurred during the login process"
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("user/auth/signup", data);
      toast.success(response?.data?.message || "Account successfuly created");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup Failed");
      return rejectWithValue(error?.response?.data?.message || "Signup failed");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("user/auth/verify-otp", data);

      // if (response?.data?.status_code === 200) {
      //   toast.success(response?.data?.message || "OTP verified successfully");
      // }

      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "OTP verification failed";
      // toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await client.post("user/auth/resend-otp", data);

      // if (response?.data?.status_code === 200) {
      //   toast.success(response?.data?.message || "OTP sent successfully");
      // }

      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to resend OTP";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
