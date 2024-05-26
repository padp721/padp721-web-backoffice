import { lazy } from "react";

//* GUEST ROUTES
const Login = lazy(() => import("./pages/Auth/Login"))

//* AUTH ROUTES
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))

export const GuestRoutes = [
    {
        path: "/login",
        Component: Login
    },
]

export const AuthRoutes = [
    {
        path: "/dashboard",
        Component: Dashboard
    },
    {
        path: "/contact",
        Component: Contact
    },
    {
        path: "/about",
        Component: About
    },

]