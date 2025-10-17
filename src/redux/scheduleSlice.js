import { createSlice } from "@reduxjs/toolkit";

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: [
    ],
    reducers: {
        setSchedule: (state, {payload}) => {
            const {week, schedule} = payload;
            state[week] = schedule;
        }
    },
});

export const {setSchedule} = scheduleSlice.actions;
export default scheduleSlice.reducer;