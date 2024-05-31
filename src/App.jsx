import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import { GuestRoutes, AuthRoutes } from "./routes"
import Layout from "./components/Layout"
import { Flowbite } from "flowbite-react"
import CUSTOM_THEME from "./assets/theme"
import FullscreenLoading from "./components/Loading"
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export default function App() {
    const isLogin = useSelector(state => state.auth.isLogin)

    const ROUTER = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={isLogin ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                {GuestRoutes.map((router, idx) => <Route key={idx} {...router} />)}
                <Route element={isLogin ? <Layout /> : <Navigate to="/" />}>
                    {AuthRoutes.map((router, idx) => <Route key={idx} {...router} />)}
                </Route>
            </Route>
        )
    )

    return (
        <Flowbite theme={{ theme: CUSTOM_THEME }}>
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
            <Suspense fallback={<FullscreenLoading />}>
                <RouterProvider router={ROUTER} />
            </Suspense>
        </Flowbite>
    )
}
