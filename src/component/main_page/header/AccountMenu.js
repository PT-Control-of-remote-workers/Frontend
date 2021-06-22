import React from 'react';
import PropTypes from 'prop-types';
import {Close} from 'grommet-icons';

import {Box, Heading, Text} from 'grommet';
import AppBtn from "../../util/AppBtn";
import {AppDropBtn} from "../../util/AppDropBtn";

const DropContent = ({onLogout, userData}) => (
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
        </Box>

        <AppBtn name={"Profile"} type={"droMenu"} action={() => {
            onLogout()
        }}/>

        <AppBtn name={"Sign out"} type={"droMenu"} action={() => {
            onLogout()
        }}/>

    </Box>
);

export default function AccountMenu({onLogout, userData}) {
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
                <AppDropBtn
                    type={"menu"}
                    innerContent={<DropContent onLogout={onLogout} userData = {userData}/>}
                    label="Menu"
                />
            </>
        </Box>
    );
};
