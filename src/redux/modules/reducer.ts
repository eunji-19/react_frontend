import { combineReducers } from "@reduxjs/toolkit";
import { AuthLoginSlice, AuthSignupSlice } from "./authSlice";
import menuIndex from "./menuIndex";
import selectBook from "./selectBook";
import { BookSlice, BookDetailSlice, LikeBookSlice } from "./bookSlice";
import { FindProjectSlice, ModelSlice, VideoSlice } from "./brainSlice";

const rootReducer = combineReducers({
  authSignup: AuthSignupSlice.reducer,
  authLogin: AuthLoginSlice.reducer,
  getBook: BookSlice.reducer,
  getBookDetail: BookDetailSlice.reducer,
  getLikeBook: LikeBookSlice.reducer,
  brainModel: ModelSlice.reducer,
  brainVideo: VideoSlice.reducer,
  brainFindProject: FindProjectSlice.reducer,
  menuIndex,
  selectBook,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
