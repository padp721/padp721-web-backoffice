import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth";
import { Button, Card, FloatingLabel, Spinner } from "flowbite-react";
import { AUTH } from "../../utilities/axios";
import { produce } from "immer";
import { toast } from "react-toastify";

export default function Login() {
    document.title = "PADP721 Web Backoffice | Login"
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formValues, setFormValues] = useState({
        username: "",
        password: ""
    })

    const handleFormOnChange = useCallback((e) => {
        const { name, value } = e.target
        setFormValues(produce(draft => { draft[name] = value }))
    }, [])

    const handleLogin = useCallback((e, form) => {
        e.preventDefault()

        setIsSubmitting(true)
        AUTH.post("/login", form)
            .then(res => {
                const { token } = res.data.data
                dispatch(login({ token }))
                window.location.href = "/"
            })
            .catch(err => {
                console.error(err)
                toast.error(err.response.data.message)
            })
            .finally(() => setIsSubmitting(false))
    }, [dispatch])

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-96">
                <h1 className="text-2xl text-center"><b>Login</b></h1>
                <form onSubmit={(e) => handleLogin(e, formValues)} className="flex flex-col gap-3">
                    <FloatingLabel
                        variant="outlined"
                        label="Username"
                        name="username"
                        value={formValues.username}
                        onChange={handleFormOnChange}
                        disabled={isSubmitting}
                        required
                    />
                    <FloatingLabel
                        variant="outlined"
                        label="Password"
                        name="password"
                        helperText="Hover cursor to show password"
                        onMouseEnter={() => setShowPassword(true)}
                        onMouseLeave={() => setShowPassword(false)}
                        type={showPassword ? "text" : "password"}
                        value={formValues.password}
                        onChange={handleFormOnChange}
                        disabled={isSubmitting}
                        required
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner size={`sm`} /> : `Login`}
                    </Button>
                </form>
            </Card>
        </div>
    )
} 