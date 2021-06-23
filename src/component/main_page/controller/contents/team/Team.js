import {Box, Grid, Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import CreateTeamContainer from "../teams/CreateTeamContainer";
import {AppDropBtn} from "../../../../util/AppDropBtn";
import {useHistory} from "react-router-dom";
import AppBtn from "../../../../util/AppBtn";
import React from "react";
import InviteWorkerContainer from "./invite/InviteWorkerContainer";
import EditTeamContainer from "./edit/EditTeamContainer";
import {getUsernameFromCookie} from "../../../../../utils/cookiesUtils";
import {styles} from "../../../../util/styles";

export function Team({team, toTasks, makeLeader, makeWorker, setAdmin, removeWorker, errorMessage, setErrorMessage}) {
    if (team == null) {
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
                        Team name
                    </Heading>
                    <Box
                        direction={"row"}
                        gap={"small"}
                    >
                        <Box
                            size={"medium"}
                            round={"medium"}
                            style={styles["focus"]}
                        />
                        <Box
                            size={"medium"}
                            round={"medium"}
                            style={styles["update"]}
                        />
                        <Box
                            size={"medium"}
                            round={"medium"}
                            style={styles["update"]}
                        />
                    </Box>
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
                            Loading
                        </Heading>
                        <Box
                            direction={"row"}
                            gap={"small"}
                        >
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }

    const sortOnStatus = (w1, w2) => {
        let role = getStatus(team, w1.username)
        let status;
        if (role === 'admin') {
            status = 3
        } else if (role === 'leader') {
            status = 2
        } else {
            status = 1
        }

        role = getStatus(team, w2.username)
        if (role === 'admin') {
            return -status + 3
        } else if (role === 'leader') {
            return -(status - 2)
        } else {
            return -status + 1
        }
    }

    let workers = Object.values(team.workers)
    workers = workers.sort(sortOnStatus)

    const username = getUsernameFromCookie()
    const status = getStatus(team, username)

    if (workers.length !== 0) {

        return (
            <Box

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
                    <Box
                        direction={"column"}
                    >
                        <Heading level={2}>
                            {team.name} # {team.id}
                        </Heading>
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
                    <Box
                        direction={"row"}
                        gap={"small"}
                    >
                        {(status === 'admin' || status === 'leader') &&
                        <AppBtn
                            type={"focus"}
                            action={toTasks}
                            name={"Tasks"}
                        />
                        }
                        {(status === 'admin' || status === 'leader') &&
                        <InviteWorkerContainer/>
                        }
                        {team.admin === username &&
                        <EditTeamContainer/>
                        }
                    </Box>
                </Box>
                <Box
                    overflow={"auto"}
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
                                        Name worker
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Number of tasks
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Role
                                    </TableCell>
                                    {status === 'admin' &&
                                    <TableCell scope="col" border="bottom" align={"center"}>
                                        Actions
                                    </TableCell>
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    workers.map((worker, i) => {
                                        const status = getStatus(team, worker.username)
                                        return (
                                            <TableRow key={worker.username}>
                                                <TableCell>{worker.name}</TableCell>
                                                <TableCell>{getCount(team, worker.username)}</TableCell>
                                                <TableCell>{status}</TableCell>
                                                {team.admin === username &&
                                                <TableCell align={"center"}>
                                                    {worker.username !== username &&
                                                    <AppDropBtn
                                                        label={"Actions"}
                                                        type={"action"}
                                                        innerContent={<Actions
                                                            status={status}
                                                            worker={worker}
                                                            makeWorker={makeWorker}
                                                            makeLeader={makeLeader}
                                                            setAdmin={setAdmin}
                                                            removeWorker={removeWorker}
                                                        />}
                                                    />
                                                    }
                                                    {worker.username === username &&
                                                    <Text
                                                        size={'large'}
                                                    >
                                                        It's you
                                                    </Text>
                                                    }
                                                </TableCell>
                                                }
                                            </TableRow>
                                        )
                                    })
                                }
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
                        {team.name} # {team.id}
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
                            There are no employees to the team
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

function getCount(tasks, username) {
    let count = 0
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i]
        if (task.workerId === username)
            count += 1
    }

    return count
}

function Actions({status, worker, makeLeader, makeWorker, setAdmin, removeWorker}) {
    return (
        <Box
            pad="small"
            direction={"column"}
            gap="small"
            round={"small"}
        >
            {status === 'leader' &&
            <AppBtn
                name={"Make worker"}
                action={() => makeWorker(worker.username)}
                type={"update"}
            />
            }
            {status === 'worker' &&
            <AppBtn
                name={"Make leader"}
                action={() => makeLeader(worker.username)}
                type={"update"}
            />
            }
            <AppBtn
                name={"Set admin"}
                action={() => setAdmin(worker.username)}
                type={"update"}
            />
            <AppBtn
                name={"Remove"}
                action={() => removeWorker(worker.username)}
                type={"remove"}
            />
        </Box>
    )
}