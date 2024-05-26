import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { Suspense } from "react"
import { useSelector } from "react-redux"
import { GuestRoutes, AuthRoutes } from "./routes"
import Layout from "./components/Layout"

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
        <Suspense fallback={<>LOADING...</>}>
            <RouterProvider router={ROUTER} />
        </Suspense>
    )
}
