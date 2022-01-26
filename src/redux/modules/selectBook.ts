import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Select Book 초기상태
 */
export interface SelectBookState {
  title: string | null;
  author: string | null;
  description: string | null;
  price: number | null;
  smallImageUrl: string;
  largeImageUrl: string;
  categoryName: string | null;
  isbn: string | null;
}

export type SelectBookPayload = {
  title: string | null;
  author: string | null;
  description: string | null;
  price: number | null;
  smallImageUrl: string;
  largeImageUrl: string;
  categoryName: string | null;
  isbn: string | null;
};

const initialState: SelectBookState = {
  title: null,
  author: null,
  description: null,
  price: null,
  smallImageUrl: "",
  largeImageUrl: "",
  categoryName: null,
  isbn: null,
};

export const selectBookSlice = createSlice({
  name: "selectBook",
  initialState,
  reducers: {
    setSelectBook: (
      state: SelectBookState,
      action: PayloadAction<SelectBookPayload>
    ) => {
      state.title = action.payload.title;
      state.author = action.payload.author;
      state.description = action.payload.description;
      state.price = action.payload.price;
      state.smallImageUrl = action.payload.smallImageUrl;
      state.largeImageUrl = action.payload.largeImageUrl;
      state.categoryName = action.payload.categoryName;
      state.isbn = action.payload.isbn;
    },
  },
});

export const { setSelectBook } = selectBookSlice.actions;
export const getSelectBook = (state: RootState) => state.selectBook;
export default selectBookSlice.reducer;
