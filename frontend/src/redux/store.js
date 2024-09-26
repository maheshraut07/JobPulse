import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    devTools: true,  // This forces enabling dev tools
});

export default store;
