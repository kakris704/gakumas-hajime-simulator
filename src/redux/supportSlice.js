import { createSlice } from "@reduxjs/toolkit";

export const supportSlice = createSlice({
    name: "support",
    initialState: {
        lesson: [0, 0, 0],
        spLesson: [0, 0, 0],
        mSkillUpgrade: [0, 0, 0],
        skillUpgrade: [0, 0, 0],
        selectSoudan: [0, 0, 0],
        getDrink: [0, 0, 0],
        selectRest: [0, 0, 0],
        selectGoOut: [0, 0, 0],
        getMSkill: [0, 0, 0],
        getASkill: [0, 0, 0],
        getSkill: [0, 0, 0],
        lessonBonus: [0, 0, 0],
        endTest: [0, 0, 0],
        selectProvide: [0, 0, 0],
        selectClass: [0, 0, 0],
        limitIncrease: 0,
        baseParams: [0, 0, 0]
    },
    reducers: {
        setSupport: (state, action) => {
            Object.assign(state, action.payload);
        }
    },
});

export const {setSupport} = supportSlice.actions;
export default supportSlice.reducer;