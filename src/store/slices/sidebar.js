import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isOpen: false,
        sidebarActive: "",
        collapseOpen: ""
    },
    reducers: {
        setDrawerIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setSidebarActive: (state, action) => {
            state.sidebarActive = action.payload
        },
        setSidebarCollapseOpen: (state, action) => {
            state.collapseOpen = action.payload
        }
    }
})

export const { setDrawerIsOpen, setSidebarActive, setSidebarCollapseOpen } = sidebarSlice.actions

export default sidebarSlice.reducer