import { createSlice } from '@reduxjs/toolkit';

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: [],
        currentUser: null,
        status: null,
    },
    reducers: {
        setUsers(state, action) {
            state.userList = action.payload;
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        addUser(state, action) {
            state.userList.push(action.payload);
        }
    },
});

export const { setUsers, setCurrentUser, addUser } = userSlice.actions;
export default userSlice.reducer;
