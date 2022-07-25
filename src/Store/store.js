import authReducer from "./auth-context";
import { configureStore } from '@reduxjs/toolkit';
const store = configureStore({
    reducer: {
        auth: authReducer.reducer
    }
})


// Actions
export const authActions = authReducer.actions;

export default store;
