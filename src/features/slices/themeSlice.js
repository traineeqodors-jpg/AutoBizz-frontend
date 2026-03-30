import { createSlice } from "@reduxjs/toolkit";
 
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    // Get initial value from localStorage immediately
    isDark:
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});
 
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
 
 