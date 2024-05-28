import axios from "axios";

export const AUTH = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
    headers: {
        Authorization: window.sessionStorage.getItem('jwt') !== null ? `Bearer ${window.sessionStorage.getItem('jwt')}` : null
    }
})

export const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/b`,
    headers: {
        Authorization: window.sessionStorage.getItem('jwt') !== null ? `Bearer ${window.sessionStorage.getItem('jwt')}` : null
    }
})