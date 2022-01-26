import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

/**
 * MenuIndex 초기상태
 */
export interface MenuIndexState {
    index: string;
    title: string;
};

export type MenuIndexPayload = {
    index: string | "1";
    title: string | 'BestSeller';
};

const initialState: MenuIndexState = {
    index: "1",
    title: "BestSeller"
};

export const menuIndexSlice = createSlice({
    name: "menuIndex",
    initialState,
    reducers: {
        setMenuIndex: (
            state: MenuIndexState,
            action: PayloadAction<MenuIndexPayload>
        ) => {
            state.index = action.payload.index;
            state.title = action.payload.title;
        },
    }
});

export const { setMenuIndex } = menuIndexSlice.actions;
export const getMenuIndex = (state: RootState) => state.menuIndex.index;
export const getMenuIndexTitle = (state: RootState) => state.menuIndex.title;

export default menuIndexSlice.reducer;