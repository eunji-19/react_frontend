import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_URL } from "../../configure";
import { FindProjectReqType, VideoKeyReqType } from "../../types";

/**
 * getModelList
 */
export const brainModel = createAsyncThunk(
  "brain/model",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${APP_URL}/deepbrain/modelList`, {
        token: token,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  }
);

/**
 * video key
 */
export const brainVideo = createAsyncThunk(
  "brain/video",
  async (reqData: VideoKeyReqType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APP_URL}/deepbrain/makeVideo`,
        reqData
      );
      console.log("response.data ", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  }
);

/**
 * Find Project
 */
export const brainFindProject = createAsyncThunk(
  "brain/findProject",
  async (reqData: FindProjectReqType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APP_URL}/deepbrain/findProject`,
        reqData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response!.data);
      }
    }
  }
);
