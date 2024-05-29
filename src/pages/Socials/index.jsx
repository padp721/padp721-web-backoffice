import { Button, Card, FloatingLabel, Modal } from "flowbite-react"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import CardHeader from "../../components/CardHeader"
import Table from "../../components/Table";
import { API } from "../../utilities/axios";
import { _ as formatCell } from "gridjs-react"
import { Loading } from "../../components/Loading";
import { HiLink, HiPencil, HiTrash, HiPlus, HiOutlineExclamationCircle } from "react-icons/hi"
import { produce } from "immer";
import { toast } from "react-toastify";

export default function Socials() {
    document.title = "PADP721 Web Backoffice | Socials"

    const [isLoading, setIsLoading] = useState({
        page: false,
        modal: false
    })
    const [isOpen, setIsOpen] = useState({
        modalInput: false,
        modalDelete: false
    })
    const [data, setData] = useState([])
    const [social, setSocial] = useState({
        id: "",
        name: "",
        url: "",
        color: "",
        icon_type: "",
        icon: "",
    })

    const onChangeSocialForm = useCallback((e) => {
        const { name, value } = e.target
        setSocial(produce(draft => { draft[name] = value }))
    }, [])

    const onCloseInputModal = useCallback(() => {
        setIsOpen(produce(draft => { draft.modalInput = false }))
        setSocial({
            id: "",
            name: "",
            url: "",
            color: "",
            icon_type: "",
            icon: "",
        })
    }, [])

    const onCloseDeleteModal = useCallback(() => {
        setIsOpen(produce(draft => { draft.modalDelete = false }))
        setSocial({
            id: "",
            name: "",
            url: "",
            color: "",
            icon_type: "",
            icon: "",
        })
    }, [])

    const getSocialsData = useCallback(() => {
        setIsLoading(produce(draft => { draft.page = true }))
        API.get("/social")
            .then(res => {
                const data = res.data.data
                if (data.length > 0) {
                    setData(data)
                }
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setIsLoading(produce(draft => { draft.page = false })))
    }, [])

    const getSocialIndividual = useCallback((id) => {
        setIsLoading(produce(draft => { draft.modal = true }))
        API.get(`/social/${id}`)
            .then(res => {
                const data = res.data.data
                setSocial(data)
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => setIsLoading(produce(draft => { draft.modal = false })))
    }, [])

    const onSubmitSocialForm = useCallback((e) => {
        e.preventDefault()

        Object.entries(social).forEach(kv => {
            if (kv[0] !== 'id' && kv[1] === "") {
                toast.warn(`Field ${kv[0]} cannot be empty!`)
                return false
            }
        })

        const data = {
            name: social.name,
            url: social.url,
            color: social.color,
            icon_type: social.icon_type,
            icon: social.icon,
        }

        toast.promise(
            social.id !== "" ? API.put(`/social/${social.id}`, data) : API.post("/social", data),
            {
                pending: "Submitting data...",
                success: {
                    render({ data: res }) {
                        onCloseInputModal()
                        getSocialsData()
                        return res.data.message
                    }
                },
                error: {
                    render({ data }) {
                        const res = data.response
                        return res.data.message
                    }
                },
            })
    }, [social, onCloseInputModal, getSocialsData])

    const deleteSocial = useCallback((id) => {
        toast.promise(API.delete(`/social/${id}`), {
                pending: "Deleting data...",
                success: {
                    render({ data: res }) {
                        setData((curState) => curState.filter(row => row.id !== id))
                        onCloseDeleteModal()
                        return res.data.message
                    }
                },
                error: {
                    render({ data }) {
                        const res = data.response
                        return res.data.message
                    }
                },
            })
    }, [onCloseDeleteModal])

    const COLUMNS = useMemo(() => [
        {
            id: "name",
            name: "Name"
        },
        {
            id: "url",
            hidden: true
        },
        {
            id: "id",
            name: "Action",
            formatter: (cell, row) => formatCell(
                <div className="flex gap-1 justify-center">
                    <a href={row.cells[1].data} target="_blank" rel="noopener noreferrer">
                        <Button color="blue" className="flex gap-2"><HiLink className="m-auto mr-1" />Visit</Button>
                    </a>
                    <Button color="warning" onClick={() => {
                        setIsOpen(produce(draft => { draft.modalInput = true }))
                        getSocialIndividual(cell)
                    }}><HiPencil className="m-auto mr-1" />Edit</Button>
                    <Button color="failure" onClick={() => {
                        setIsOpen(produce(draft => { draft.modalDelete = true }))
                        setSocial(produce(draft => { draft.id = cell }))
                    }}><HiTrash className="m-auto mr-1" />Delete</Button>
                </div>
            )
        },
    ], [getSocialIndividual])

    const table = useMemo(() => (
        <Table
            columns={COLUMNS}
            data={data}
        />
    ), [data, COLUMNS])

    useEffect(() => {
        getSocialsData()

        return () => {
            setData([])
        }
    }, [getSocialsData])

    return isLoading.page ? <Loading /> : (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <span className="text-3xl font-semibold">Socials</span>
                        <Button onClick={() => setIsOpen(produce(draft => { draft.modalInput = true }))}><HiPlus className="m-auto mr-1" />Add Social</Button>
                    </div>
                </CardHeader>
                {table}
            </Card>

            {/* MODAL INPUT */}
            <Modal show={isOpen.modalInput} onClose={onCloseInputModal}>
                <Modal.Header>
                    Input Data
                </Modal.Header>
                <form onSubmit={onSubmitSocialForm}>
                    {isLoading.modal ? <Loading /> : (
                        <Modal.Body>
                            <FloatingLabel variant="outlined" label="Social Name" name="name" value={social.name} onChange={onChangeSocialForm} required />
                            <FloatingLabel variant="outlined" label="Social Url" name="url" value={social.url} onChange={onChangeSocialForm} required />
                            <FloatingLabel variant="outlined" label="Social Color" name="color" value={social.color} onChange={onChangeSocialForm} required />
                            <FloatingLabel variant="outlined" label="Social Icon Type" name="icon_type" value={social.icon_type} onChange={onChangeSocialForm} required />
                            <FloatingLabel variant="outlined" label="Social Icon" name="icon" value={social.icon} onChange={onChangeSocialForm} required />
                        </Modal.Body>
                    )}
                    <Modal.Footer>
                        <Button type="submit" color="blue">Submit</Button>
                        <Button color="gray" onClick={onCloseInputModal}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* MODAL DELETE */}
            <Modal show={isOpen.modalDelete} onClose={onCloseDeleteModal} size={'md'} popup>
                <Modal.Header />
                <Modal.Body className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this social?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => deleteSocial(social.id)}>
                            {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={onCloseDeleteModal}>
                            No, cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}