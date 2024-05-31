import { Button, Modal } from "flowbite-react";
import { useCallback, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { API } from "../../utilities/axios";
import { toast } from "react-toastify";

export default function ModalDelete({ idUser, getUserData, show, onClose, ...props }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteUser = useCallback((id) => {
        setIsDeleting(true)
        toast.promise(API.delete(`/user/${id}`), {
            pending: "Deleting data...",
            error: {
                render({ data }) {
                    const res = data.response
                    return res.data.message
                }
            },
            success: {
                render({ data: res }) {
                    return res.data.message
                }
            }
        }).then(() => {
            getUserData()
            onClose()
        }).catch((error) => console.error(error)).finally(() => setIsDeleting(false))
    }, [onClose, getUserData])

    return (
        <Modal show={show} onClose={onClose} {...props}>
            <Modal.Header />
            <Modal.Body className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this social?
                </h3>
                <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => deleteUser(idUser)} disabled={isDeleting}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={onClose} disabled={isDeleting}>
                        No, cancel
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}