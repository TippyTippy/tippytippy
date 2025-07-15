import rootReducer from '@/slices/index';
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const store = () =>
  configureStore({
    reducer: rootReducer
  });

export const wrapper = createWrapper(store);