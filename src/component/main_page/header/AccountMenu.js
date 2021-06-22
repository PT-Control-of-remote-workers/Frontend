import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Close} from 'grommet-icons';

import {Box, Button, DropButton, Heading, Avatar, Text} from 'grommet';
import AppBtn from "../../util/AppBtn";

const DropContent = ({onClose, onLogout}) => (
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

        <AppBtn name={"Sign out"} type={"droMenu"} action={() => {
            onLogout()
        }}/>

    </Box>
);

DropContent.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default function AccountMenu({onLogout, isOpen, onOpen, onClose, userData}) {

    return (
        <Box
            direction="row"
        >
            <Text>
                {userData}
            </Text>
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
                open={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                dropContent={<DropContent onClose={onClose} onLogout={onLogout}/>}
                dropProps={{align: {top: 'bottom'}}}
            />
        </Box>
    );
};
