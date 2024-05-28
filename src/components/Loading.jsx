import { Spinner } from "flowbite-react";

export default function FullscreenLoading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner size="xl" />
        </div>
    )
}

export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Spinner size="xl" />
        </div>
    )
}