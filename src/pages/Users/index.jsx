import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card } from "flowbite-react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi"
import CardHeader from "../../components/CardHeader"
import { Loading } from "../../components/Loading";
import { produce } from "immer";
import { API } from "../../utilities/axios";
import { toast } from "react-toastify";
import Table from "../../components/Table";
import { _ as formatCell } from "gridjs-react";
import ModalInput from "./ModalInput";
import ModalDelete from "./ModalDelete";
import { useSelector } from "react-redux";

export default function Users() {
    const authUserId = useSelector(state => state.auth.userId)

    const [data, setData] = useState([])
    const [idUser, setIdUser] = useState("")

    const [isLoading, setIsLoading] = useState({
        page: false,
        modal: false
    })

    const [isOpen, setIsOpen] = useState({
        modalInput: false,
        modalDelete: false
    })

    const getUserData = useCallback(() => {
        setIsLoading(produce(state => { state.page = true }))
        API.get("/user")
            .then((res) => {
                if (res.data.data.length > 0) {
                    setData(res.data.data.map((item, idx) => ({ ...item, idx })))
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error(err.response.data.message)
            })
            .finally(() => setIsLoading(produce(state => { state.page = false })))
    }, [])

    const onCloseModal = useCallback(() => {
        setIsOpen({
            modalInput: false,
            modalDelete: false
        })
        setIdUser("")
    }, [])

    const COLUMNS = useMemo(() => [
        {
            id: "idx",
            name: "No",
            formatter: cell => formatCell(<span className="flex justify-center">{cell + 1}</span>)
        },
        {
            id: "username",
            name: "Username"
        },
        {
            id: "name",
            name: "Name"
        },
        {
            id: "email",
            name: "Email",
            formatter: cell => formatCell(<a href={`mailto:${cell}`} className="text-sky-500">{cell}</a>)
        },
        {
            id: "phone",
            name: "Phone",
            formatter: cell => formatCell(<a href={`tel:${cell}`} className="text-sky-500">{cell}</a>)
        },
        {
            id: "id",
            name: "Action",
            formatter: cell => formatCell(
                <div className="flex gap-1 justify-center">
                    <Button color={`warning`} onClick={() => {
                        setIsOpen(produce(state => { state.modalInput = true }))
                        setIdUser(cell)
                    }}>
                        <HiPencil className="m-auto mr-1" />Edit
                    </Button>
                    {authUserId !== cell && (
                        <Button color={`failure`} onClick={() => {
                            setIsOpen(produce(state => { state.modalDelete = true }))
                            setIdUser(cell)
                        }}>
                            <HiTrash className="m-auto mr-1" />Delete
                        </Button>
                    )}
                </div>
            )
        }
    ], [authUserId])

    const table = useMemo(() => (
        <Table
            columns={COLUMNS}
            data={data}
        />
    ), [COLUMNS, data])

    useEffect(() => {
        getUserData()

        return () => {
            setData([])
        }
    }, [getUserData])

    return isLoading.page ? <Loading /> : (
        <React.Fragment>
            <Card>
                <CardHeader headerText="Users">
                    <Button onClick={() => setIsOpen(produce(state => { state.modalInput = true }))}><HiPlus className="m-auto mr-1" />Add User</Button>
                </CardHeader>
                {table}
            </Card>
            <ModalInput idUser={idUser} getUserData={getUserData} show={isOpen.modalInput} onClose={onCloseModal} />
            <ModalDelete idUser={idUser} getUserData={getUserData} show={isOpen.modalDelete} onClose={onCloseModal} size={'md'} popup />
        </React.Fragment>
    )
}