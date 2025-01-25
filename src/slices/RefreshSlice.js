import { createSlice } from '@reduxjs/toolkit';

const refreshSlice = createSlice({
    name:'signup',
    initialState:{
        refresh : false
    },
    reducers:{
        refreshWeb(state) {
            state.refresh = !state.refresh
        }
    }
})

export const {refreshWeb} = refreshSlice.actions
export default refreshSlice.reducer;