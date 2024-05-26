import React from "react";
import { useRouteError } from "react-router-dom";

export default function NotFound404() {
    const error = useRouteError()

    console.error(error);
    return (
        <React.Fragment>
            404 Page Not Found
        </React.Fragment>
    )
}