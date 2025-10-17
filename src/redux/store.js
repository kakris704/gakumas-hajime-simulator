import { configureStore } from "@reduxjs/toolkit";
import supportReducer from "./supportSlice";
import scheduleReducer from "./scheduleSlice";

export const store = configureStore({
    reducer: {
        support: supportReducer,
        schedule: scheduleReducer
    },
});