import { Grid } from "gridjs-react"
import "gridjs/dist/theme/mermaid.min.css"

const GRID_CLASSNAMES = {
    table: "text-sm"
}

export default function Table({ columns, data }) {
    return (
        <Grid
            className={GRID_CLASSNAMES}
            columns={columns}
            data={data}
            autoWidth={true}
        />
    )
}