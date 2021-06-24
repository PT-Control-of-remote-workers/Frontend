import {Box, Grid, Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import {styles} from "../../../../util/styles";
import {getUsernameFromCookie} from "../../../../../utils/cookiesUtils";
import React from "react";
import EditTaskContainer from "./edit/EditTaskContainer";
import AppBtn from "../../../../util/AppBtn";

export function Task({team, task, stats, calls, workers, resume, finish, complete, remove, view, errorMessage, setErrorMessage}) {
    if (task == null || workers == null) {
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
                        Task
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
                        <Box
                            size={"medium"}
                            round={"medium"}
                            style={styles["remove"]}
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
                    </Box>
                </Box>
            </Box>
        )
    }

    const username = getUsernameFromCookie()
    const status = getStatus(team, username)

    return (
        <Box
            height={"100%"}
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
                    gap={{top: "xxsmall"}}
                >
                    <Heading level={2}>
                        {task.stage} Task: {task.name} # {task.id}
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
                    task.stage !== 'CLOSED' &&
                    <AppBtn
                        type={"focus"}
                        name={"Select"}
                        action={finish}
                    />
                    }
                    {(status === 'admin' || status === 'leader') &&
                    task.stage !== 'CLOSED' &&
                    <EditTaskContainer task={task}/>
                    }
                    {(status === 'admin' || status === 'leader') &&
                    task.stage !== 'CLOSED' &&
                    <AppBtn
                        type={"update"}
                        name={"Finish"}
                        action={finish}
                    />
                    }
                    {(status === 'admin' || status === 'leader') &&
                    task.stage === 'COMPLETE' &&
                    <AppBtn
                        type={"update"}
                        name={"Resume"}
                        action={resume}
                    />
                    }
                    {(status === 'admin' || status === 'leader') &&
                    task.stage === 'WORKING' && task.workerId === username &&
                    <AppBtn
                        type={"update"}
                        name={"Complete"}
                        action={complete}
                    />
                    }
                    {(status === 'admin' || status === 'leader') &&
                    <AppBtn
                        type={"remove"}
                        name={"Remove"}
                        action={remove}
                    />
                    }
                </Box>
            </Box>
            <Box
                overflow={"auto"}
            >
                <Box
                    direction={"column"}
                >
                    <Box align={"right"} pad={{left: "small"}}>
                        <Text>
                            Description
                        </Text>
                    </Box>
                </Box>
                <Box
                    border
                    round
                    width={"fill"}
                    pad={{left: "small", bottom: "small", right: "xsmall"}}
                >
                    <Text
                        size={"xxlarge"}>
                        {task.description}
                    </Text>
                </Box>
            </Box>
            <Box
                border={"top"}
            >
                <Box
                    align={"center"}
                    direction={"row"}
                    justify={"between"}
                    pad={{top: "small", left: "xlarge", right: "xlarge"}}
                >
                    <Text
                        color={"green"}
                        size={"xxlarge"}>
                        Time work: {stats.timeWork}
                    </Text>
                    <Text
                        color={"orange"}
                        size={"xxlarge"}>
                        Time paused: {stats.timePause}
                    </Text>
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
                                    Name
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    Email
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    Time work
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    Time pause
                                </TableCell>
                                <TableCell scope="col" border="bottom" align={"right"} margin={{right: "large"}}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                workers.map((worker, i) => {
                                    const stats = getStats(worker, calls)
                                    const name = worker.name + " " + worker.family_name
                                    return (
                                        <TableRow key={team.id}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{worker.email}</TableCell>
                                            <TableCell>{stats.timeWork}</TableCell>
                                            <TableCell>{stats.timePause}</TableCell>
                                            <TableCell align={"right"}>
                                                <AppBtn
                                                    name={"Details"}
                                                    type={"details"}
                                                    action={() => view(worker.username)}
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
}

function getStats(worker, calls) {
    calls = calls.filter((c) => {
        return c.workerId === worker.username
    })

    let statistic = {
        timeWork: 0,
        timePause: 0
    }

    for (let i = 0; i < calls.length; i++) {
        let call = calls[i]
        if (call.type === 'WORKING') {
            statistic.timeWork += 10
        } else {
            statistic.timePause += 10
        }
    }

    return statistic;
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