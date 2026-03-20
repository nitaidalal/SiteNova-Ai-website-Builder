import { createSlice } from "@reduxjs/toolkit";

// Check localStorage for saved theme, or check system preference
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: getInitialTheme()
    },
    reducers: {
        setTheme: (state, action) => {
            const newTheme = action.payload;
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        },
        toggleTheme: (state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;