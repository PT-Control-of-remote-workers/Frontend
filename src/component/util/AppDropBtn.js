import {DropButton} from "grommet";
import React, {useState} from "react";
import {styles} from "./styles";

export function AppDropBtn({label, innerContent, dropProps = {round: 'medium', align: {top: 'bottom'}}, type}) {
    const [open, setOpen] = useState();
    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <DropButton
            style={styles[type]}
            label={label}
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            dropContent={innerContent}
            dropProps={dropProps}
        />
    );
};