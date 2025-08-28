import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./slices/auth-slice";
import studentSlice from './slices/student-onboarding-slice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    student : studentSlice,
  },
});