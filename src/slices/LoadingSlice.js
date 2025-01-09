import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name:'signup',
    initialState:{
        loading : false
    },
    reducers:{
        setLoading(state,value) {
            state.loading = value.payload
        }
    }
})

export const {setLoading} = loadingSlice.actions
export default loadingSlice.reducer;