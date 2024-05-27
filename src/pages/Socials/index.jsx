import { Button, Card } from "flowbite-react"
import React from "react"
import CardHeader from "../../components/CardHeader"
import Table from "../../components/Table";

const COLUMNS = [
    { id: "id", name: "Id" },
    { id: "username", name: "Username" },
    { id: "name", name: "Name" },
    { id: "email", name: "Email" },
    { id: "phone", name: "Phone" },
]

export default function Socials() {
    document.title = "PADP721 Web Backoffice | Socials"

    async function getSocialsData() {
        let data = []

        data = [
            { id: '5c53805e-5b31-450d-8067-6b6781790870', username: 'padp721', name: 'Angga Darma Putra', email: 'anggadp91@hotmail.com', phone: '+6282194955972' },
            { id: '5c53805e-5b31-450d-8067-6b6781790870', username: 'padp721', name: 'Angga Darma Putra', email: 'anggadp91@hotmail.com', phone: '+6282194955972' },
            { id: '5c53805e-5b31-450d-8067-6b6781790870', username: 'padp721', name: 'Angga Darma Putra', email: 'anggadp91@hotmail.com', phone: '+6282194955972' },
            { id: '5c53805e-5b31-450d-8067-6b6781790870', username: 'padp721', name: 'Angga Darma Putra', email: 'anggadp91@hotmail.com', phone: '+6282194955972' },
        ]

        return data
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <div className="flex justify-between">
                        <span className="text-3xl font-semibold">Socials</span>
                        <Button>Tombol</Button>
                    </div>
                </CardHeader>
                <Table
                    columns={COLUMNS}
                    data={getSocialsData}
                />
            </Card>
        </React.Fragment>
    )
}