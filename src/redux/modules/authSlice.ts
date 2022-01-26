import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthLogin } from "../../models/Auth";
import { authLogin, authLogout, authSignup } from "../actions/_authActions";

// @ts-ignore
const user: AuthLogin = JSON.parse(localStorage.getItem("user"));

/**
 * 로그인
 */
export interface AuthLoginState {
  isLoggedIn: boolean;
  user: AuthLogin | null;
  loginError: any | null;
  loginLoading: boolean;
}

const loginInitialState: AuthLoginState = user
  ? {
      isLoggedIn: true,
      user,
      loginError: null,
      loginLoading: false,
    }
  : {
      isLoggedIn: false,
      user: null,
      loginError: null,
      loginLoading: false,
    };

const AuthLoginSlice = createSlice({
  name: "AuthLogin",
  initialState: loginInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state, action) => {
        state.loginLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        console.log("SUCCCESS ", action.payload);
        state.loginLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loginError = null;
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        console.log("Fail ", action.payload);
        state.loginLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.loginError = action.payload;
      })
      .addCase(authLogout.pending, (state, action) => {})
      .addCase(authLogout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.loginLoading = false;
        state.loginError = false;
      })
      .addCase(authLogout.rejected, (state, action) => {});
  },
});

/**
 * 회원가입
 */
export interface AuthSignupState {
  user: AuthLogin | null;
  signupError: any | null;
  signupLoading: boolean;
}

const signupInitialState: AuthSignupState = {
  user: null,
  signupError: null,
  signupLoading: false,
};

const AuthSignupSlice = createSlice({
  name: "AuthSignup",
  initialState: signupInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignup.pending, (state, action) => {
        state.signupLoading = true;
      })
      .addCase(authSignup.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.user = action.payload;
        state.signupError = null;
      })
      .addCase(authSignup.rejected, (state, action: PayloadAction<any>) => {
        state.user = null;
        state.signupLoading = false;
        state.signupError = action.payload;
      });
  },
});

export { AuthLoginSlice, AuthSignupSlice };
