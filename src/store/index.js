import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/auth'
import sidebarSlice from './slices/sidebar'

export default configureStore({
    reducer: {
        auth: authSlice,
        sidebar: sidebarSlice
    }
})