import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../configure";
import { FindLikeBookReqType, LikeBookReqType } from "../../types";

export const bestSeller = createAsyncThunk("book/bestseller", async () => {
  const response = await axios.get(`${APP_URL}/book/best`);
  return response.data;
});

export const recommendSeller = createAsyncThunk("book/recommend", async () => {
  const response = await axios.get(`${APP_URL}/book/recommend`);
  return response.data;
});

export const newSeller = createAsyncThunk("book/new", async () => {
  const response = await axios.get(`${APP_URL}/book/new`);
  return response.data;
});

export const findLikeBook = createAsyncThunk("book/findLike", async (reqData: FindLikeBookReqType, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${APP_URL}/book/findLike`, reqData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response!.data);
    }
  }
});

export const initLikeBook = createAsyncThunk("book/likeInit", async (reqData: LikeBookReqType, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${APP_URL}/book/initLike`, reqData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
            console.log("error ",  error);
      return rejectWithValue(error.response!.data);
    }
  }
});

export const doLikeBook = createAsyncThunk("book/like", async (reqData: LikeBookReqType, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${APP_URL}/book/like`, reqData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response!.data);
    }
  }
});