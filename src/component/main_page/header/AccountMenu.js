import React from 'react';
import PropTypes from 'prop-types';
import {Close} from 'grommet-icons';

import {Box, Button, DropButton, Heading, Text} from 'grommet';
import AppBtn from "../../util/AppBtn";

const DropContent = ({onClose, onLogout, userData}) => (
    <Box
        border
        align={"center"}
        gap="medium"
        pad={"small"}
        background={"white"}
        fill={"vertical"}
    >
        <Box direction="row" justify="between" align="center">
            {userData &&
            <Heading level={2} margin="small">
                {userData.username}
            </Heading>
            }
            <Button icon={<Close/>} onClick={onClose}/>
        </Box>

        <AppBtn name={"Profile"} type={"droMenu"} action={() => {
            onLogout()
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
            alignContent={"center"}
            pad={"medium"}
            gap={"small"}
        >
            {userData &&
            <Text
                size={"large"}
                color={"white"}
                alignSelf={"center"}
            textAlign={"center"}>
                {userData.family_name} {userData.name}
            </Text>
            }
            <>
            {/*<Avatar*/}
            {/*    border={{size: 'small', color: "white"}}*/}
            {/*    background={"white"}*/}
            {/*    flex={false}*/}
            {/*    margin={{right: "10px"}}*/}
            {/*>*/}
            {/*    A*/}
            {/*</Avatar>*/}
            <DropButton
                style={{
                    'hover:background-color': "#4FAEB4",
                    'border-color': "white",
                    'color': "white",
                }}
                label="Menu"
                open={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                dropContent={<DropContent onClose={onClose} onLogout={onLogout} userData = {userData}/>}
                dropProps={{align: {top: 'bottom'}}}
            />
            </>
        </Box>
    );
};
