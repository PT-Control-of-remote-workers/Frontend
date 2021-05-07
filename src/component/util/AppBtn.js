import {Box, Button} from "grommet";
import React from "react";

const colors = {
    header: "#4FAEB4",
    menu: "#3E3E3E",
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
    'font-size': "15px",
    'color': "white",
    'text-align': "center",
    'width': '170px'
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

export default function AppBtn({name, type, action}) {
    return (
        <Button
            style={styles[type]}
            primary
            size="large"
            color={"action"}
            label={name}
            active
            onClick={action}
        />
    )
}