import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = baseURL;

const initialState = {
  kycData: null,
  isLoading: false,
  error: null,
  success: null,
  isKycVerified: false,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    kycRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    kycSuccess: (state, action) => {
      state.isLoading = false;
      const kycData = action.payload?.data || action.payload;
      state.kycData = kycData;
      state.success = action.payload?.message || null;
      state.error = null;
      state.isKycVerified = kycData?.status === "verified";
    },
    kycFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      if (action.payload) toast.error(state.error);
    },
    resetKyc: (state) => {
      state.kycData = null;
      state.isLoading = false;
      state.isKycVerified = false;
      state.success = null;
      state.error = null;
    },
  },
});

export const { kycRequest, kycSuccess, kycFail, resetKyc } = kycSlice.actions;

// ---------------- API Actions ------------------

// submit KYC documents
export const submitKyc = (kycPayload) => async (dispatch) => {
  try {
    dispatch(kycRequest());
    const { data } = await axios.post(`/kyc/submit`, kycPayload);
    dispatch(kycSuccess(data));
    toast.success(data.message);
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(kycFail(errMsg));
  }
};

// get all KYC records (admin use)
export const getKycAll = () => async (dispatch) => {
  try {
    dispatch(kycRequest());
    const { data } = await axios.get(`/kyc/get-all-kyc`);
   dispatch(kycSuccess(data));
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(kycFail(errMsg));
  }
};

// verify KYC (admin use)
export const verifyKyc = (userId) => async (dispatch) => {
  try {
    dispatch(kycRequest());
    const { data } = await axios.post(`/kyc/verify/${userId}`);
    dispatch(kycSuccess(data));
    toast.success("KYC Verified Successfully!");
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(kycFail(errMsg));
  }
};

// reject KYC (admin use)
export const rejectKyc = (userId, reason) => async (dispatch) => {
  try {
    dispatch(kycRequest());
    const { data } = await axios.post(`/kyc/reject/${userId}`, { reason });
    dispatch(kycSuccess(data));
    toast.success("KYC Rejected");
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(kycFail(errMsg));
  }
};

export default kycSlice.reducer;
