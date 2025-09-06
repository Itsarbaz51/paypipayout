import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import kycReducer from "./slices/kycSlice.js";
import userReducer from "./slices/userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    kyc: kycReducer,
    user: userReducer,
  },
});

export default store;
