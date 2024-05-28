import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth";
import { Button, Card, FloatingLabel } from "flowbite-react";
import { AUTH } from "../../utilities/axios";
import { produce } from "immer";

export default function Login() {
    document.title = "PADP721 Web Backoffice | Login"
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    })

    function handleFormOnChange(e) {
        const { name, value } = e.target
        setFormValues(produce(draft => { draft[name] = value }))
    }

    function handleLogin(e) {
        e.preventDefault()

        AUTH.post("/login", formValues)
            .then(res => {
                const { token } = res.data.data
                dispatch(login({ token }))
                window.location.href = "/"
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-96">
                <h1 className="text-2xl text-center"><b>Login</b></h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <FloatingLabel variant="outlined" label="Username" name="username" value={formValues.username} onChange={handleFormOnChange} required />
                    <FloatingLabel variant="outlined" label="Password" name="password" value={formValues.password} onChange={handleFormOnChange} required />
                    <Button type="submit">Login</Button>
                </form>
            </Card>
        </div>
    )
} 