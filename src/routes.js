import { lazy } from "react";

//* GUEST ROUTES
const Login = lazy(() => import("./pages/Auth/Login"))
const Loading = lazy(() => import("./components/Loading"))

//* AUTH ROUTES
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Socials = lazy(() => import("./pages/Socials"))
const Users = lazy(() => import("./pages/Users"))
const Contact = lazy(() => import("./pages/Contact"))
const About = lazy(() => import("./pages/About"))

export const GuestRoutes = [
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/loading",
        Component: Loading
    },
]

export const AuthRoutes = [
    {
        path: "/dashboard",
        Component: Dashboard
    },
    {
        path: "/socials",
        Component: Socials
    },
    {
        path: "/users",
        Component: Users
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