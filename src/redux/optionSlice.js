import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({
    name: "option",
    initialState: {
        event: {
            getSkill:0,
            getMSkill:0,
            getASkill:0,
            skillUpgrade:0,
            mSkillUpgrade:0,
        }
    },
    reducers: {
        setOption: (state, {payload}) => {
            const {week, Option} = payload;
            state[week] = Option;
        }
    },
});

export const {setOption} = optionSlice.actions;
export default optionSlice.reducer;