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

export default function Users() {
    const [isLoading, setIsLoading] = useState({
        page: false,
        modal: false
    })
    const [data, setData] = useState([])

    const getUserData = useCallback(() => {
        setIsLoading(produce(state => { state.page = true }))
        API.get("/user")
            .then((res) => {
                if (res.data.data.length > 0) {
                    setData(res.data.data.map((item, idx) => ({...item, idx})))
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error(err.response.data.message)
            })
            .finally(() => setIsLoading(produce(state => { state.page = false })))
    }, [])

    const COLUMNS = useMemo(() => [
        {
            id: "idx",
            name: "No",
            formatter: cell => formatCell(<span className="flex justify-center">{cell+1}</span>)
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
                    <Button color={`warning`}><HiPencil className="m-auto mr-1"/>Edit</Button>
                    <Button color={`failure`}><HiTrash className="m-auto mr-1"/>Delete</Button>
                </div>
            )
        }
    ], [])

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

    return isLoading.page ? <Loading/> : (
        <React.Fragment>
            <Card>
                <CardHeader headerText="Users">
                    <Button><HiPlus className="m-auto mr-1"/>Add User</Button>
                </CardHeader>
                {table}
            </Card>
        </React.Fragment>
    )
}