import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import recieveRequestReducer from "./recievedRequestSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    recievedRequests:recieveRequestReducer
  },
});

export default store;
