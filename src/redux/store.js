import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import kycReducer from "./slices/kycSlice.js";
import userReducer from "./slices/userSlice.js";
import bankReducer from "./slices/bankSlice.js";
import walletReducer from "./slices/walletSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    kyc: kycReducer,
    user: userReducer,
    bank: bankReducer,
    wallet: walletReducer,
  },
});

export default store;
