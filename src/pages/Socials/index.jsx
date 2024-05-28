import { Button, Card, FloatingLabel, Modal } from "flowbite-react"
import React, { useCallback, useEffect, useState } from "react"
import CardHeader from "../../components/CardHeader"
import Table from "../../components/Table";
import { API } from "../../utilities/axios";
import { _ as formatCell } from "gridjs-react"
import { Loading } from "../../components/Loading";
import { HiLink, HiPencil, HiTrash, HiPlus } from "react-icons/hi"
import { produce } from "immer";

export default function Socials() {
    document.title = "PADP721 Web Backoffice | Socials"

    const [isLoading, setIsLoading] = useState({
        page: false,
        modal: false
    })
    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState({
        modalInput: false,
        modalDelete: false
    })
    const [social, setSocial] = useState({
        id: "",
        name: "",
        url: "",
        color: "",
        icon_type: "",
        icon: "",
    })

    const onChangeSocialForm = (e) => {
        const { name, value } = e.target
        setSocial(produce(draft => { draft[name] = value }))
    }

    const onCloseInputModal = () => {
        setIsOpen(produce(draft => { draft.modalInput = false }))
        setSocial({
            id: "",
            name: "",
            url: "",
            color: "",
            icon_type: "",
            icon: "",
        })
    }

    const onSubmitSocialForm = (e) => {
        e.preventDefault()
    }

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

    const getSocialData = useCallback((id) => {
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

    const COLUMNS = [
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
                        getSocialData(cell)
                    }}><HiPencil className="m-auto mr-1" />Edit</Button>
                    <Button color="failure"><HiTrash className="m-auto mr-1" />Delete</Button>
                </div>
            )
        },
    ]

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
                <Table
                    columns={COLUMNS}
                    data={data}
                />
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
        </React.Fragment>
    )
}