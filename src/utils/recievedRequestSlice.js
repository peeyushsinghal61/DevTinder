import { createSlice } from "@reduxjs/toolkit";
const recievedRequestSlice = createSlice({
  name: "recievedRequests",
  initialState: null,
  reducers: {
    addRecievedRequests: (state, action) => {
      return action.payload;
    },
    removeRecievedRequests: (state, action) => {
      return state.filter((request) => request._id !== action.payload);
    },
  },
});
export const { addRecievedRequests, removeRecievedRequests } =
  recievedRequestSlice.actions;
export default recievedRequestSlice.reducer;