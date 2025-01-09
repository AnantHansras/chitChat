import { createSlice } from '@reduxjs/toolkit';

const signupDataSlice = createSlice({
    name:'signup',
    initialState:{
        signupdata : null
    },
    reducers:{
        setSignupdata(state,value) {
            state.signupdata = value.payload
        }
    }
})

export const {setSignupdata} = signupDataSlice.actions
export default signupDataSlice.reducer;