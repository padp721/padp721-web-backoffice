import { Grid } from "gridjs-react"
import "gridjs/dist/theme/mermaid.min.css"

const GRID_CLASSNAMES = {
    table: "text-sm",
    thead: "text-center",
}

export default function Table({ columns, data, ...props }) {
    return (
        <Grid
            search
            sort
            pagination
            autoWidth={true}
            className={GRID_CLASSNAMES}
            columns={columns}
            data={data}
            {...props}
        />
    )
}