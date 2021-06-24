import {Box, Button, Grid, Text} from "grommet";
import React from "react";
import AppBtn from "../../../util/AppBtn";
import {useHistory} from "react-router-dom";
import {styles} from "../../../util/styles";

export default function Sidebar({team, isTeamSelect, errorMessage, setErrorMessage}) {
    const history = useHistory()
    let teamName
    if (team) {
        teamName = team.name
    } else {
        teamName = "Select team"
    }

    return (
        <Box
            border={"right"}
            align={"center"}
        >
        <>
        <Box
            fill
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
                    } else {
                        history.push(`/main/teams`)
                    }
                    setErrorMessage(undefined)
                }}
            />

            <AppBtn
                name="Main"
                type="action"
                action={() => {
                    history.push(`/main`)
                    setErrorMessage(undefined)
                }}
            />

            <AppBtn
                name="Teams"
                type="action"
                action={() => {
                    history.push(`/main/teams`)
                    setErrorMessage(undefined)
                }}
            />

            <AppBtn
                name="Members"
                type="action"
                action={() => {
                    if (isTeamSelect) {
                        history.push(`/main/teams/${team.id}`)
                        setErrorMessage(undefined)
                    } else {
                        setErrorMessage("Select team")
                    }
                }}
            />

            <AppBtn
                name="Tasks"
                type="action"
                action={() => {
                    if (isTeamSelect) {
                        history.push(`/main/teams/${team.id}/tasks`)
                        setErrorMessage(undefined)
                    } else {
                        setErrorMessage("Select team")
                    }
                }}
            />
            {errorMessage !== undefined &&
            <Box
                align={'center'}
                margin={{vertical: 'small'}}
            >
                <Text
                    color={'status-critical'}
                    size={'large'}
                    weight={'bold'}
                >
                    {errorMessage}
                </Text>
            </Box>
            }
        </Box>
            </>
            <Box
                pad={{bottom:"medium"}}
                >
            <AppBtn
                type={'focus'}
                name="Download desktop"
                action={() => {
                    window.open('https://github.com/PT-Control-of-remote-workers/Desktop/releases/download/1.0v/COW_setup.2.exe', '_blank').focus()
                }}
            />
            </Box>
        </Box>
    )
}