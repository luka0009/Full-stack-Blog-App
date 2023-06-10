import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PostState {
  text: string;
}

const initialState: PostState = {
  text: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<any>) => {
      state.text = action.payload;
    },
  },
});

export const { setText } = postSlice.actions;

export default postSlice.reducer;
