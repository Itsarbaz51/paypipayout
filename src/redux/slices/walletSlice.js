import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = baseURL;

const initialState = {
  balance: 0,
  transactions: [],
  isLoading: false,
  error: null,
  success: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    walletRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = null;
    },
    walletSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload?.message || null;
      state.error = null;
    },
    walletFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      if (action.payload) toast.error(state.error);
    },
    setBalance: (state, action) => {
      state.balance = action.payload?.data || action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload?.data || action.payload;
    },
    resetWallet: (state) => {
      state.balance = 0;
      state.transactions = [];
      state.isLoading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  walletRequest,
  walletSuccess,
  walletFail,
  setBalance,
  setTransactions,
  resetWallet,
} = walletSlice.actions;

// ---------------- API Actions ------------------

// Get wallet balance
export const getWalletBalance = () => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.get(`/wallet/balance`);
    dispatch(setBalance(data));
    dispatch(walletSuccess(data));
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

// Add funds (admin only or user top-up request)
export const addFunds = (payload) => async (dispatch) => {
  try {
    dispatch(walletRequest());

    const config =
      payload instanceof FormData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : {};

    const { data } = await axios.post(`/wallet/add-fund`, payload, config);

    dispatch(getWalletBalance(data));
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
    throw error; // ✅ so frontend can catch
  }
};

// Deduct funds
export const deductFunds = (payload) => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.post(`/wallet/deduct-funds`, payload);
    dispatch(getWalletBalance(data));
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

// Get transactions
export const getWalletTransactions = () => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.get(`/wallet/transactions`);
    dispatch(setTransactions(data));
    dispatch(walletSuccess(data));
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

//  Create Razorpay order
export const createOrder = (payload) => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.post(`/wallet/create-order`, payload);
    return data; // Razorpay frontend flow will handle this
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

//  Verify Razorpay payment
export const verifyPayment = (payload) => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.post(`/wallet/verify-payment`, payload);
    toast.success("Payment verified successfully!");
    dispatch(getWalletBalance());
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

//  Approve topup (Admin only)
export const approveTopup = (id) => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.put(`/wallet/approve/${id}`);
    toast.success("Topup approved successfully!");
    dispatch(getWalletTransactions());
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

// Reject topup (Admin only)
export const rejectTopup = (id) => async (dispatch) => {
  try {
    dispatch(walletRequest());
    const { data } = await axios.put(`/wallet/reject/${id}`);
    toast.success("Topup rejected!");
    dispatch(getWalletTransactions());
    return data;
  } catch (error) {
    const errMsg = error?.response?.data?.message || error?.message;
    dispatch(walletFail(errMsg));
  }
};

export default walletSlice.reducer;
