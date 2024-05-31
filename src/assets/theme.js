const CUSTOM_THEME = {
    "navbar": {
        "root": {
            "base": `bg-sky-300 px-2 py-2.5 bg-gray-700 sm:px-4`,
        }
    },
    "sidebar": {
        "root": {
            "inner": `text-white h-full px-2 py-3 bg-gray-500`
        },
        "collapse": {
            "button": "group flex w-full items-center rounded-md p-2 text-base font-normal text-white transition duration-50 hover:bg-white hover:text-gray-500",
            "icon": {
                "base": "h-6 w-6 text-white transition duration-50 group-hover:text-gray-500",
                "open": {
                    "off": "",
                    "on": "text-white"
                }
            },
            "label": {
                "base": "ml-3 flex-1 whitespace-nowrap text-left",
                "icon": {
                    "base": "h-6 w-6",
                    "open": {
                        "on": "",
                        "off": "rotate-90"
                    }
                }
            },
        },
        "item": {
            "base": "group flex items-center justify-center rounded-md p-2 text-base font-normal text-white transition duration-50 hover:bg-white hover:text-gray-500",
            "active": "bg-white text-gray-500",
            "icon": {
                "base": "h-6 w-6 flex-shrink-0 text-white transition duration-50 group-hover:text-gray-500",
                "active": "text-gray-500"
            },
        }
    },
    "drawer": {
        "root": {
            "base": `fixed z-40 overflow-y-auto bg-gray-500 text-white p-4 transition-transform`,
        },
        "header": {
            "inner": {
                "titleText": "mb-4 inline-flex items-center text-base font-semibold text-white"
            }
        }
    }
}

export default CUSTOM_THEME