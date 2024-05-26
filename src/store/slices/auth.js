import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: window.sessionStorage.getItem("jwt") !== null,
        jwtToken: window.sessionStorage.getItem("jwt"),
        userId: window.sessionStorage.getItem("jwt") !== null ? jwtDecode(window.sessionStorage.getItem("jwt"))?.sub : ""
    },
    reducers: {
        login: (state, action) => {
            const { token } = action.payload
            window.sessionStorage.setItem("jwt", token)

            state.isLogin = window.sessionStorage.getItem("jwt") !== null,
            state.jwtToken = window.sessionStorage.getItem("jwt"),
            state.userId = window.sessionStorage.getItem("jwt") !== null ? jwtDecode(window.sessionStorage.getItem("jwt"))?.sub : ""
        },
        logout: state => {
            window.sessionStorage.removeItem("jwt")

            state.isLogin = window.sessionStorage.getItem("jwt") !== null,
            state.jwtToken = window.sessionStorage.getItem("jwt"),
            state.userId = window.sessionStorage.getItem("jwt") !== null ? jwtDecode(window.sessionStorage.getItem("jwt"))?.sub : ""
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer