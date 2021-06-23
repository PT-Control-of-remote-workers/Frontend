import {Box, Grid, Heading, Table, TableBody, TableCell, TableHeader, TableRow} from "grommet";
import React, {useState} from "react";
import AppBtn from "../../../../util/AppBtn";
import {AppDropBtn} from "../../../../util/AppDropBtn";
import {InviteWorker} from "../team/invite/InviteWorker";
import CreateTeamContainer from "./CreateTeamContainer";
import EditTeamContainer from "./EditTeamContainer";

export default function Teams({username, allTeams, choose, leave, remove}) {
    if (allTeams == null) {
        allTeams = {}
    }

    const sortOnAdmin = (t1, t2) => {
        if (t1.admin === username) {
            return 1
        } else {
            return -1
        }
    }

    allTeams = Object.values(allTeams)
    allTeams.sort(sortOnAdmin)

    if (allTeams.length !== 0) {

        return (
            <Box
                height={"80%"}
                width={"90%"}
                round={"medium"}
                background={"white"}
                pad={"medium"}
                gap={"medium"}
            >
                <Box
                    height={"xxsmall"}
                    pad={{
                        "right": "small"
                    }}
                    justify={"between"}
                    direction={"columns"}
                >
                    <Heading level={2}>
                        Teams
                    </Heading>
                    <CreateTeamContainer/>
                </Box>
                <Box
                    fill
                    overflow={"scroll"}
                >
                    <Grid
                        style={{
                            wight: 'fill'
                        }}
                        rows={["flex"]}
                        areas={[
                            ['table'],
                        ]}>
                        <Table
                            gridArea={"table"}
                        >
                            <TableHeader>
                                <TableRow>
                                    <TableCell scope="col" border="bottom">
                                        Name
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Count workers
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Your status
                                    </TableCell>
                                    <TableCell scope="col" border="bottom" align={"right"} margin={{right: "large"}}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    allTeams.map((team, i) => {
                                        const status = getStatus(team, username)
                                        return (
                                            <TableRow key={team.id}>
                                                <TableCell>{team.name}</TableCell>
                                                <TableCell>{team.workers.length}</TableCell>
                                                <TableCell>{status}</TableCell>
                                                <TableCell align={"right"}>
                                                    <AppDropBtn
                                                        label={"Actions"}
                                                        type={"action"}
                                                        innerContent={actions({
                                                            team: team,
                                                            status: status,
                                                            choose: choose,
                                                            leave: leave,
                                                            remove: remove,
                                                        })}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Box>
            </Box>
        )
    } else {
        return (
            <Box
                width={"90%"}
                round={"medium"}
                background={"white"}
                pad={"medium"}
                gap={"medium"}
            >
                <Box
                    pad={{
                        "right": "small"
                    }}
                    justify={"between"}
                    direction={"row"}
                >
                    <Heading level={2}>
                        Teams
                    </Heading>
                    <CreateTeamContainer/>
                </Box>
                <Box
                    border={"top"}
                >
                    <Box
                        align={"center"}
                        pad={"xsmall"}
                        gap={"small"}
                        direction={"column"}
                    >
                        <Heading level={3}>
                            You are not a member of any team
                        </Heading>
                    </Box>
                </Box>
            </Box>
        )
    }
}

function getStatus(team, username) {
    if (team.admin === username) {
        return 'admin'
    }

    if (team.leaders.includes(username)) {
        return 'leader'
    }

    return 'worker'
}

function actions({team, status, choose, leave, remove}) {
    return (
        <Box
            pad="small"
            direction={"column"}
            gap="small"
            round={"small"}
        >
            <AppBtn
                name={"Choose"}
                action={() => choose(team)}
                type={"focus"}
            />
            {/*{(status === 'admin' || status === 'leader') &&*/}
            {/*<AppBtn*/}
            {/*    name={"Invite"}*/}
            {/*    action={() => (InviteWorker)}*/}
            {/*    type={"update"}*/}
            {/*/>*/}
            {/*}*/}
            {status === 'admin' &&
            <EditTeamContainer team={team}/>
            }
            <AppBtn
                name={"Leave"}
                action={() => leave(team.id)}
                type={"remove"}
            />
            {status === 'admin' &&
            <AppBtn
                name={"Remove"}
                action={() => remove(team.id)}
                type={"remove"}
            />
            }
        </Box>
    )
}
