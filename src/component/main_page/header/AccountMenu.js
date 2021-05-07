import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Close} from 'grommet-icons';

import {Box, Button, DropButton, Heading, Avatar} from 'grommet';
import AppBtn from "../../util/AppBtn";
import {NavLink} from "react-router-dom";

const DropContent = ({onClose}) => (
    <Box
        border
        align={"center"}
        gap="medium"
        pad={"small"}
        background={"white"}
        fill={"vertical"}
    >
        <Box direction="row" justify="between" align="center">
            <Heading level={2} margin="small">
                {localStorage.getItem("name")}
            </Heading>
            <Button icon={<Close/>} onClick={onClose}/>
        </Box>

        <AppBtn name={"Profile"} type={"dropMenu"} action={() => {
        }}/>

        <NavLink to={'/sign_up'} style={{textDecoration: 'none'}}>
            <AppBtn name={"Sign out"} type={"dropMenu"} action={() => {
                localStorage.removeItem("name")
            }}/>
        </NavLink>

    </Box>
);

DropContent.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default function AccountMenu() {
    const [open, setOpen] = useState();
    const onOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <Box
            direction="row"
        >
            <Avatar
                border={{size: 'small', color: "white"}}
                background={"white"}
                flex={false}
                margin={{right: "10px"}}
            >
                A
            </Avatar>
            <DropButton
                style={{
                    border: "none",
                    'background-color': "#4FAEB4",
                    'color': "white",
                }}
                label="Menu"
                open={open}
                onOpen={onOpen}
                onClose={onClose}
                dropContent={<DropContent onClose={onClose}/>}
                dropProps={{align: {top: 'bottom'}}}
            />
        </Box>
    );
};
