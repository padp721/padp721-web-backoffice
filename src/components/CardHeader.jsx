import React from "react";

export default function CardHeader({ headerText = "", children }) {
    return (
        <React.Fragment>
            <div className="flex justify-between">
                {headerText !== "" ? <span className="text-3xl font-semibold">{headerText}</span> : <></>}
                {children}
            </div>
            <hr />
        </React.Fragment>
    )
}