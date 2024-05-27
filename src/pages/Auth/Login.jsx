import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth";
import { Button, Card, TextInput } from "flowbite-react";
import api from "../../utilities/api"

export default function Login() {
    document.title = "PADP721 Web Backoffice | Login"
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    })

    function handleFormOnChange(e) {
        const { value, name } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    function handleLogin(e) {
        e.preventDefault()

        api.post("/auth/login", formValues)
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
                    <TextInput name="username" placeholder="Username" value={formValues.username} onChange={handleFormOnChange} required />
                    <TextInput name="password" placeholder="Password" value={formValues.password} onChange={handleFormOnChange} required />
                    <Button type="submit">Login</Button>
                </form>
            </Card>
        </div>
    )
} 