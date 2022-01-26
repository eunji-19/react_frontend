import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../configure";
import { LoginReqType, SignupReqType } from "../../types";

// axios.defaults.withCredentials = true;

/**
 * 로그인
 */
export const authLogin = createAsyncThunk(
  "authLogin",
  async (reqData: LoginReqType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/auth/login`, reqData);
      if (response.data.statusMessage.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.log("login error ", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  }
);

export const authSignup = createAsyncThunk(
  "authSignup",
  async (reqData: SignupReqType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/auth/signup`, reqData);
      return response.data;
    } catch (error) {
      console.log("signup error ", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  }
);

export const authLogout = createAsyncThunk("authLogout", async () => {
  const response = await axios.get(`${APP_URL}/auth/logout`);
  localStorage.removeItem("user");
  return response.data;
});
