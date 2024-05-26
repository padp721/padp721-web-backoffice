import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../store/slices/auth";
import { Button } from "flowbite-react";
import api from "../utilities/api";

export default function Layout() {
    const dispatch = useDispatch()

    function handleLogout() {
        dispatch(logout())
        window.location.reload()
    }
    
    function testJwtRequest() {
        api.get("/b/user").then(res => console.log(res))
    }

    return (
        <React.Fragment>
            <header>
                Header
            </header>
            <nav id="sidebar">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
            <Outlet />
            <footer>
                Footer
            </footer>
            <Button onClick={handleLogout}>
                Logout
            </Button>
            <Button onClick={testJwtRequest}>
                Test Request with JWT
            </Button>
        </React.Fragment>
    )
}