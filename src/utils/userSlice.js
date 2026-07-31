import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      return { user: action.payload };
    },
    removeUser: () => {
      return { user: null };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
