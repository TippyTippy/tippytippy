import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    selectedView: 'month'
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSelectedView(state, action) {
            state.selectedView = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(HYDRATE, (state, action : any) => {
        return {
            ...state,
            ...action?.payload?.global,
        };
        });
    },
});

export const { setSelectedView } = globalSlice.actions;
export default globalSlice.reducer;

export const globalSelector = (state : any) => state.global;