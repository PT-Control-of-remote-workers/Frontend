import {Box, Grid, Text} from "grommet";
import React from "react";
import AppBtn from "../../../util/AppBtn";
import {useHistory} from "react-router-dom";

export default function Sidebar({team, isTeamSelect}) {
    const history = useHistory()
    let teamName
    if (team) {
        teamName = team.name
    } else {
        teamName = "Select team"
    }

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
                        history.push(`/main/teams/${team.id}`)
                    }
                }}
            />

            <AppBtn
                name="Main"
                type="action"
                action={() => {
                    history.push(`/main`)
                }}
            />

            <AppBtn
                name="Teams"
                type="action"
                action={() => {
                    history.push(`/main/teams`)
                }}
            />

            <AppBtn
                name="Members"
                type="action"
                action={() => {
                    history.push(`/main/teams/${team.id}`)
                }}
            />

            <AppBtn
                name="Tasks"
                type="action"
                action={() => {
                    history.push(`/main/teams/${team.id}/tasks`)
                }}
            />
        </Box>
    )
}