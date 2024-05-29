import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

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
                    <ToastContainer
                        position="top-right"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Bounce}
                    />
                    <Outlet />
                </main>
            </div>
        </div>
    )
}