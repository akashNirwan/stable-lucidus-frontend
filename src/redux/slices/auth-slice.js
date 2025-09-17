import {
  loginUser,
  signupUser,
  verifyOtp,
  resendOtp,
} from "../actions/auth-action";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loginLoading: false,
  loginerror: null,
  signuploading: false,
  signuperror: null,
  verifyOtpData: null,
  verifyOtpLoading: false,
  verifyOtpError: null,
  resendOtpData: null,
  resendOtpLoading: false,
  resendOtpError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginerror = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action?.payload?.data[0];
        
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;

        state.loginerror = action.payload || "Failed to login";
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.signuploading = true;
        state.signuperror = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signuploading = false;

        state.user = action?.payload?.data[0];
        
        
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signuploading = false;
        state.signuperror = action.payload;
      });

    builder
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtpLoading = true;
        state.verifyOtpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyOtpLoading = false;
        state.verifyOtpData = action.payload;
           
           
       
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtpLoading = false;
        state.verifyOtpError = action.payload || "OTP verification failed";
      });

    builder
      .addCase(resendOtp.pending, (state) => {
        state.resendOtpLoading = true;
        state.resendOtpError = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendOtpLoading = false;
        state.resendOtpData = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtpLoading = false;
        state.resendOtpError = action.payload || "Failed to resend OTP";
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
