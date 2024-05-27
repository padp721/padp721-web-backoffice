import React from "react";

export default function CardHeader({ children }) {
    return (
        <React.Fragment>
            {children}
            <hr />
        </React.Fragment>
    )
}