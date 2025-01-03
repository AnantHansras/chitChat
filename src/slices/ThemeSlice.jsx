import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isDarkMode: localStorage.getItem("isDarkMode") !== undefined
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : false, // dark mode is the default
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
