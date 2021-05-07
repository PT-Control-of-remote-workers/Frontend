import {Box, Grid, Text} from "grommet";
import React from "react";
import AppBtn from "../../util/AppBtn";

export default function Sidebar() {

    return (
        <Box
            border
            align={"center"}
            pad={"medium"}
            gap="medium"
            gridArea="sidebar"
            background={"white"}
            width="small"
            fill={"vertical"}
        >
            <AppBtn
                name="Team name"
                type="action"
                action={() => {
                }}
            />

            <AppBtn
                name="Main"
                type="action"
                action={() => {
                }}
            />

            <AppBtn
                name="Teams"
                type="action"
                action={() => {
                }}
            />

            <AppBtn
                name="Members"
                type="action"
                action={() => {
                }}
            />

            <AppBtn
                name="Tasks"
                type="action"
                action={() => {
                }}
            />
        </Box>
    )
}