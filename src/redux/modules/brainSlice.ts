/**
 * Deep Brain API와 연관된 부분들
 * - getModelList
 * - videoKey
 * - findProject
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model } from "../../models/brain/Model";
import { MakeVideo } from "../../models/brain/Video";
import {
  brainFindProject,
  brainModel,
  brainVideo,
} from "../actions/_brainAction";

// getModelList
export interface ModelState {
  model: Model | null;
  modelLoading: boolean;
  modelError: any | null;
}

const modelInitialState: ModelState = {
  model: null,
  modelLoading: true,
  modelError: null,
};

const ModelSlice = createSlice({
  name: "brain/model",
  initialState: modelInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(brainModel.pending, (state, action) => {
        state.modelLoading = true;
      })
      .addCase(brainModel.fulfilled, (state, action) => {
        state.model = action.payload;
        state.modelLoading = false;
        state.modelError = null;
      })
      .addCase(brainModel.rejected, (state, action: PayloadAction<any>) => {
        state.model = null;
        state.modelLoading = false;
        state.modelError = null;
      });
  },
});

// Video Key
export interface VideoState {
  videoKey: any | null;
  videoLoading: boolean;
  videoError: any | null;
}

const videoInitialState: VideoState = {
  videoKey: null,
  videoLoading: true,
  videoError: null,
};

const VideoSlice = createSlice({
  name: "brain/video",
  initialState: videoInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(brainVideo.pending, (state, action) => {
        state.videoLoading = true;
      })
      .addCase(brainVideo.fulfilled, (state, action) => {
        console.log("action ");
        state.videoKey = action.payload.statusMessage.data.key;
        state.videoError = null;
        state.videoLoading = false;
      })
      .addCase(brainVideo.rejected, (state, action: PayloadAction<any>) => {
        state.videoKey = null;
        state.videoError = action.payload;
        state.videoLoading = false;
      });
  },
});

/**
 * Find Project
 */
export interface FindProjectState {
  findProject: MakeVideo | null;
  findProjectLoading: boolean;
  findProjectError: any | null;
  findProjectProgress: any | null;
}

const findProjectInitialState: FindProjectState = {
  findProject: null,
  findProjectLoading: true,
  findProjectError: null,
  findProjectProgress: "waiting",
};

const FindProjectSlice = createSlice({
  name: "brian/findProject",
  initialState: findProjectInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(brainFindProject.pending, (state, action) => {
        state.findProjectLoading = true;
        state.findProjectProgress = action.payload;
      })
      .addCase(brainFindProject.fulfilled, (state, action) => {
        state.findProject = action.payload;
        state.findProjectLoading = false;
        state.findProjectError = null;
        // state.findProjectProgress = action.payload;
      })
      .addCase(
        brainFindProject.rejected,
        (state, action: PayloadAction<any>) => {
          state.findProject = null;
          state.findProjectError = action.payload;
          state.findProjectLoading = false;
          state.findProjectProgress = null;
        }
      );
  },
});

export { ModelSlice, VideoSlice, FindProjectSlice };
