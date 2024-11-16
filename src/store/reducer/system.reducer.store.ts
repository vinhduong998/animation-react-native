
import {
  createSlice
} from '@reduxjs/toolkit';
import { MMKV } from "react-native-mmkv";

const storage = new MMKV()

interface InitialState {
  theme: "dark" | "light"
  language: string
}

export const initialState: InitialState = {
  theme: "light",
  language: "en",
};


export const system = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark"
    },
    setLanguage: (state, action) => {
      state.language = action.payload
    }
  },
  extraReducers(builder) {
    builder
    // .addCase(setTokenFirebase.fulfilled, (state, action) => {
    //   state.tokenFirebase = action.payload;
    // })
    // .addCase(setTokenFirebase.rejected, (state) => {
    //   state.tokenFirebase = "";
    // })
  },
});

// Reducer
export const { switchTheme, setLanguage } = system.actions;
export default system.reducer;
