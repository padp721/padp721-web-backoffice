import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'

export default configureStore({
    reducer: {
        auth: authSlice
    }
})