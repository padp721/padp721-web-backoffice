import { HiPhone, HiChartPie, HiUser, HiFolder, HiPuzzle } from "react-icons/hi";

const NAV_ITEMS = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: HiChartPie
    },
    {
        path: "/socials",
        name: "Socials",
        icon: HiPuzzle
    },
    {
        path: "#",
        name: "Information",
        icon: HiFolder,
        children: [
            {
                path: "/contact",
                name: "Contact",
                icon: HiPhone
            },
            {
                path: "/about",
                name: "About",
                icon: HiUser
            },
        ]
    },
]

export default NAV_ITEMS