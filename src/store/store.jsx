import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/ThemeSlice";
import loadingReducer from '../slices/LoadingSlice';
import signupdataReducer from '../slices/SignupDataSlice'
import refreshReducer from '../slices/RefreshSlice'
export const store = configureStore({
  reducer: {
    darkMode: themeReducer,
    loading: loadingReducer,
    signupData: signupdataReducer,
    refresh: refreshReducer
  }
});
