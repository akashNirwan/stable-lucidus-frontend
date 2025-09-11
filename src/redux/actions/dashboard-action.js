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


export const saveCareer = createAsyncThunk(
  "dashboard/saveCareer",
  async (payload, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    try {
      const response = await client.post(
        `user/save-career`,   
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Career Saved Successfully");
      return {
        ...response.data,
        careerId: payload.careerId  
      };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save career");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);



export const fetchBadges = createAsyncThunk(
  "dashboard/fetchBadges",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/user-wins`,
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



export const fetchSavedCareers = createAsyncThunk(
  "dashboard/fetchSavedCareers",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/save-career?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

       return {
        data: response.data.data,
        total: response.data.total,
        message: response.data.message,
        page,
        isLoadMore: page > 1
      };
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);



export const fetchDashboardMicroexperience = createAsyncThunk(
  "dashboard/fetchDashboardMicroexperience",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/micro-experiences?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      return {
        data: response.data.data,
        total: response.data.total,
        message: response.data.message,
        page,
        isLoadMore: page > 1
      };
    } catch (error) {
      
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);



export const fetchProfile = createAsyncThunk(
  "dashboard/fetchProfile",
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage()

    try {
      const response = await client.get(
        `user/user-details`,
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


export const updateName = createAsyncThunk(
  "dashboard/updateName",
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

      toast.success(response.data.message || "Username Updated");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Update username");
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);


