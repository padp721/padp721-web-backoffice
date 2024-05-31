import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {

    return (
        <div className="flex flex-col h-screen">
            <header>
                <Navbar />
            </header>
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block">
                    <Sidebar />
                </aside>
                <main className="flex-1 p-2 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}