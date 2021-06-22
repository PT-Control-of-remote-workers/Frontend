import {Box, Button} from "grommet";
import React from "react";
import {styles} from "./styles";

export default function AppBtn({name, type, action, size="large"}) {
    return (
        <Button
            style={styles[type]}
            primary
            size={size}
            color={"action"}
            label={name}
            active
            onClick={action}
        />
    )
}