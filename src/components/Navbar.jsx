
import { Avatar, DarkThemeToggle, Drawer, Dropdown, Navbar as FBNavbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/auth";
import { API } from "../utilities/axios";
import Sidebar from "./Sidebar";
import { setDrawerIsOpen } from "../store/slices/sidebar";
import userImage from "../assets/images/user.jpg"
import { HiMenu } from "react-icons/hi"

export default function Navbar() {
    const userId = useSelector(state => state.auth.userId)
    const drawerIsOpen = useSelector(state => state.sidebar.isOpen)
    const dispatch = useDispatch()

    const [profile, setProfile] = useState({
        email: "",
        id: "",
        name: "",
        phone: "",
        username: ""
    })

    function handleLogout() {
        dispatch(logout())
        window.location.reload()
    }

    useEffect(() => {
        API.get(`/user/${userId}`)
            .then(res => {
                const { data } = res.data
                setProfile(data)
            })
            .catch(err => console.error(err))
    }, [userId])

    return (
        <FBNavbar fluid>
            <div className="flex">
                <FBNavbar.Brand href="/">
                    <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="padp721" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white hidden md:block">{import.meta.env.VITE_APP_NAME}</span>
                </FBNavbar.Brand>
                <button className="block md:hidden" onClick={() => dispatch(setDrawerIsOpen(!drawerIsOpen))}>
                    <HiMenu size={25}/>
                </button>
            </div>
            <div className="flex md:order-2">
                {/* <DarkThemeToggle /> */}
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt="User settings" img={userImage} rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{profile.name}</span>
                        <span className="block truncate text-sm font-medium">{profile.email}</span>
                    </Dropdown.Header>
                    {/* <Dropdown.Item>Dashboard</Dropdown.Item>
                <Dropdown.Divider /> */}
                    <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown>
            </div>
            <Drawer open={drawerIsOpen} onClose={() => dispatch(setDrawerIsOpen(false))}>
                <Drawer.Header title={import.meta.env.VITE_APP_NAME} titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar />
                </Drawer.Items>
            </Drawer>
        </FBNavbar>
    )
}