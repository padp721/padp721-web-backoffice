import { Grid } from "gridjs-react"
import "gridjs/dist/theme/mermaid.min.css"

const GRID_CLASSNAMES = {
    table: "text-sm",
    sort: "bg-black"
}

export default function Table({ columns, data, ...props }) {
    console.log(data);
    return (
        <Grid
            search
            sort
            pagination
            className={GRID_CLASSNAMES}
            columns={columns}
            data={data}
            {...props}
        />
    )
}