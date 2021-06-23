import {Box, Grid, Text} from "grommet";
import React from "react";
import AppBtn from "../../../util/AppBtn";

export default function Sidebar({setContent, teamName, isTeamSelect}) {

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
                name={teamName}
                type="action"
                action={() => {
                    if (isTeamSelect) {
                        setContent({
                            type: "team"
                        })
                    }
                }}
            />

            <AppBtn
                name="Main"
                type="action"
                action={() => {
                    setContent({
                        type: "preview"
                    })
                }}
            />

            <AppBtn
                name="Teams"
                type="action"
                action={() => {
                    setContent({
                        type: "teams"
                    })
                }}
            />

            <AppBtn
                name="Members"
                type="action"
                action={() => {
                    setContent({
                        type: "members"
                    })
                }}
            />

            <AppBtn
                name="Tasks"
                type="action"
                action={() => {
                    setContent({
                        type: "tasks"
                    })
                }}
            />
        </Box>
    )
}