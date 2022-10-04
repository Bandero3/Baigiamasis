import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    user: null,
    jwtToken: null
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserToState(state, {payload}){
            return payload;
        },
        removeUser() {
            return initialState;
        }
    }
});

export default userSlice.reducer;
export const {addUserToState, removeUser} = userSlice.actions;