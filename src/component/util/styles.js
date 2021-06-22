const colors = {
    header: "#4FAEB4",
    menu: "rgba(111,75,255,0)",
    back: "#E5E5E5",
    action: "#09CF83",
    create: "#11D600",
    remove: "#F30000",
    update: "#FFDA18",
    focus: "#4FAEB4",
    details: "#6F4BFF",
    footer: "#333333",
    white: "#ffffff"
}

export const default_style = {
    'box-shadow': 'none',
    'font-size': "15px",
    'color': "white",
    'text-align': "center",
    'width': '150px',
    'border': 'none'
}
export const styles = {
    create: {
        ...default_style,
        'background-color': colors.create,
    },
    header: {
        ...default_style,
        'background-color': colors.header,
    },
    menu: {
        ...default_style,
        'background-color': colors.menu,
        'border-color': colors.white,
        'border': true
    },
    back: {
        ...default_style,
        'background-color': colors.back,
    },
    action: {
        ...default_style,
        'background-color': colors.action,
    },
    remove: {
        ...default_style,
        'background-color': colors.remove,
    },
    update: {
        ...default_style,
        'background-color': colors.update,
    },
    focus: {
        ...default_style,
        'background-color': colors.focus,
    },
    details: {
        ...default_style,
        'background-color': colors.details,
    },
    footer: {
        ...default_style,
        'background-color': colors.footer,
    },
    white: {
        ...default_style,
        'background-color': colors.white,
    },
    dropMenu: {
        'font-size': "12px",
        'width': '130px',
        'color': "black",
        'text-align': "center",
        'background-color': colors.white,
    }
}