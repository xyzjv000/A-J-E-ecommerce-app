import { createSlice } from "@reduxjs/toolkit"

const data = localStorage.getItem('isLoggedIn')

const initialState = {
    isLoggedIn: data
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            localStorage.setItem('isLoggedIn', true)
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.clear()
        },
    }
})

export default authReducer;