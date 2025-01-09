import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/ThemeSlice";
import loadingReducer from '../slices/LoadingSlice';
import signupdataReducer from '../slices/SignupDataSlice'
export const store = configureStore({
  reducer: {
    darkMode: themeReducer,
    loading: loadingReducer,
    signupData: signupdataReducer
  }
});
