import { Button, FloatingLabel, Modal } from "flowbite-react";
import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { API } from "../../utilities/axios";
import { toast } from "react-toastify";

export default function ModalInput({ idUser = "", getUserData, show, onClose, ...props }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        re_password: ""
    })

    const onChangeUserForm = useCallback((e) => {
        const { name, value } = e.target
        setUser(produce(state => { state[name] = value }))
    }, [])

    const onSubmitUserForm = useCallback((e) => {
        e.preventDefault()

        if (user.password !== user.re_password) {
            toast.warn(`Both password field must be same!`)
            return false
        }

        let data = {
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone
        }

        if (idUser === "") {
            data.password = user.password
        }

        for (const [key, value] of Object.entries(data)) {
            if (value === "") {
                toast.warn(`Field ${key} cannot be empty!`)
                return false
            }
        }
        
        setIsSubmitting(true)
        toast.promise(idUser ? API.put(`/user/${idUser}`, data) : API.post("/user", data), {
            pending: "Submitting data...",
            success: {
                render({ data: res }) {
                    return res.data.message
                }
            },
            error: {
                render({ data }) {
                    const res = data.response
                    return res.data.message
                }
            }
        }).then(() => {
            getUserData()
            onClose()
        }).catch((err) => console.error(err)).finally((setIsSubmitting(false)))
    }, [user, idUser, onClose, getUserData])

    useEffect(() => {
        if (show && idUser !== "") {
            setIsLoading(true)
            API.get(`/user/${idUser}`)
                .then(res => {
                    const data = res.data.data
                    setUser((prevState) => ({ ...prevState, ...data }))
                })
                .catch(err => {
                    console.log(err)
                    toast.error(err.response.data.message)
                })
                .finally(() => setIsLoading(false))
        }

        return () => {
            setUser({
                username: "",
                name: "",
                email: "",
                phone: "",
                password: "",
                re_password: ""
            })
        }
    }, [show, idUser])

    return (
        <Modal show={show} onClose={onClose} {...props}>
            <Modal.Header>
                Input Data
            </Modal.Header>
            <form onSubmit={onSubmitUserForm}>
                {isLoading ? <Loading /> : (
                    <Modal.Body>
                        <FloatingLabel disabled={isSubmitting} variant="outlined" label="Username" name="username" value={user.username} onChange={onChangeUserForm} />
                        <FloatingLabel disabled={isSubmitting} variant="outlined" label="Name" name="name" value={user.name} onChange={onChangeUserForm} />
                        <FloatingLabel disabled={isSubmitting} variant="outlined" label="Email" name="email" type="email" value={user.email} onChange={onChangeUserForm} />
                        <FloatingLabel disabled={isSubmitting} variant="outlined" label="Phone" name="phone" value={user.phone} onChange={onChangeUserForm} />
                        {idUser === "" && (
                            <>
                                <FloatingLabel disabled={isSubmitting} variant="outlined" helperText={user.password !== user.re_password && <span className="text-red-500">Both password field must be same!</span>} label="Password" name="password" type="password" value={user.password} onChange={onChangeUserForm} />
                                <FloatingLabel disabled={isSubmitting} variant="outlined" helperText={user.password !== user.re_password && <span className="text-red-500">Both password field must be same!</span>} label="Re-Enter Password" name="re_password" type="password" value={user.re_password} onChange={onChangeUserForm} />
                            </>
                        )}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button disabled={isSubmitting} type="submit" color="blue">Submit</Button>
                    <Button disabled={isSubmitting} color="gray" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}