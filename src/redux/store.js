import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./slices/auth-slice";
import studentSlice from './slices/student-onboarding-slice'
import dashboardSlice from './slices/dashboard-slice'
import microexperienceSlice from './slices/microexperience-slice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    student : studentSlice,
    dashboard : dashboardSlice,
    microexperience : microexperienceSlice,
  },
});