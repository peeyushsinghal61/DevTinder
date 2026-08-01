import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
        console.log("removing user from feed with id:", action.payload);
      return state.filter((ele) => ele._id != action.payload);
    },
  },
});

export const { setFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
