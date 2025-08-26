import { loginUser } from "../actions/auth-action";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  loginLoading: false,
  loginerror: null,
 
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginerror = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user;
        state.otpRequestId = action.payload.data?.otpRequestId; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        
        state.loginerror = action.payload || "Failed to login";
      });

  },
});

export const { resetAuthState } = authSlice.actions; 
export default authSlice.reducer;



