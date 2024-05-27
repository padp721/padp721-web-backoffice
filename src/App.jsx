import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import { GuestRoutes, AuthRoutes } from "./routes"
import Layout from "./components/Layout"
import { Flowbite } from "flowbite-react"
import FullscreenLoading from "./components/FullscreenLoading"
import CUSTOM_THEME from "./assets/theme"

export default function App() {
    const isLogin = useSelector(state => state.auth.isLogin)

    const ROUTER = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={isLogin ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                {GuestRoutes.map((router, idx) => <Route key={idx} path={router.path} Component={router.Component} />)}
                <Route element={isLogin ? <Layout /> : <Navigate to="/" />}>
                    {AuthRoutes.map((router, idx) => <Route key={idx} path={router.path} Component={router.Component} />)}
                </Route>
            </Route>
        )
    )

    return (
        <Flowbite theme={{ theme: CUSTOM_THEME }}>
            <Suspense fallback={<FullscreenLoading />}>
                <RouterProvider router={ROUTER} />
            </Suspense>
        </Flowbite>
    )
}
