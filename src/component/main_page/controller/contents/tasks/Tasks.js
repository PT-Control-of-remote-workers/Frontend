import {Box, Grid, Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import {styles} from "../../../../util/styles";
import {getUsernameFromCookie} from "../../../../../utils/cookiesUtils";
import AppBtn from "../../../../util/AppBtn";
import {AppDropBtn} from "../../../../util/AppDropBtn";
import React from "react";
import EditTaskContainer from "./edit/EditTaskContainer";
import TrelloIntegrationContainer from "./trello/TrelloIntegrationContainer";
import CreateTaskContainer from "./create/CreateTaskContainer";
import SetWorkerContainer from "./set_worker/SetWorkerContainer";

export function Tasks({team, tasks, removeTask, toTask, finishTask, resumeTask, completeTask, errorMessage, setErrorMessage}) {
    if (tasks == null || team == null) {
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
                        Tasks
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
                            style={styles["create"]}
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

    const sortTasks = (t1, t2) => {
        let comp
        switch (t1.stage) {
            case 'WAITING':
                comp = 1
                break
            case 'WORKING':
                comp = 0
                break
            case 'CLOSED':
                comp = -1
                break
            default:
                comp = 0
        }
        switch (t2.stage) {
            case 'WAITING':
                return  1 - comp
            case 'WORKING':
                return  0 - comp
            case 'CLOSED':
                return  -1 - comp
            default:
                return -comp
        }
    }

    tasks = Object.values(tasks).sort(sortTasks)
    const username = getUsernameFromCookie()
    const status = getStatus(team, username)

    if (tasks.length !== 0) {

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
                        gap={{top: "xxsmall"}}
                    >
                        <Heading level={2}>
                            Tasks of: {team.name} # {team.id}
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
                        <TrelloIntegrationContainer/>
                        }
                        {(status === 'admin' || status === 'leader') &&
                        <CreateTaskContainer/>
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
                                        Name
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Description
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Stage
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Worker
                                    </TableCell>
                                    {(status === 'admin' || status === 'leader') &&
                                    <TableCell scope="col" border="bottom" align={"center"}>
                                        Actions
                                    </TableCell>
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    tasks.map((task, i) => {
                                        return (
                                            <TableRow key={task.id}>
                                                <TableCell>{task.name}</TableCell>
                                                <TableCell>{getDescription(task.description)}</TableCell>
                                                <TableCell>{task.stage}</TableCell>
                                                <TableCell>{getWorker(team, task.workerId)}</TableCell>
                                                {(status === 'admin' || status === 'leader') &&
                                                <TableCell align={"center"}>
                                                    <AppDropBtn
                                                        label={"Actions"}
                                                        type={"action"}
                                                        innerContent={
                                                            <Actions
                                                                task={task}
                                                                toTask={toTask}
                                                                removeTask={removeTask}
                                                                resumeTask={resumeTask}
                                                                completeTask={completeTask}
                                                                finishTask={finishTask}
                                                            />}
                                                    />
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
                        Tasks
                    </Heading>
                    <Box
                        direction={"row"}
                        gap={"small"}
                    >
                        {(status === 'admin' || status === 'leader') &&
                        <TrelloIntegrationContainer/>
                        }
                        {(status === 'admin' || status === 'leader') &&
                        <CreateTaskContainer/>
                        }
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
                            No tasks
                        </Heading>
                    </Box>
                </Box>
            </Box>
        )
    }
}

function getWorker(team, worker) {
    if (worker) {
        const fullWorker = team.workers[worker]
        return `${fullWorker.name} ${fullWorker.family_name}`
    } else {
        return "Not selected"
    }
}

function getDescription(description) {
    if (description.length > 32) {
        return description.substr(0, 32) + '...'
    } else {
        return description
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

function Actions({task, removeTask, toTask, finishTask, resumeTask, completeTask}) {
    const username = getUsernameFromCookie()
    return (
        <Box
            pad="small"
            direction={"column"}
            gap="small"
            round={"small"}
        >
            {task.stage !== 'CLOSED' &&
            <EditTaskContainer
                task={task}
            />
            }
            {task.stage !== 'CLOSED' &&
            <SetWorkerContainer
                task={task}
            />
            }
            <AppBtn
                name={"View"}
                action={() => toTask(task.id)}
                type={"details"}
            />
            {task.workerId === username && task.stage === 'WORKING' &&
            <AppBtn
                name={"Complete"}
                action={() => completeTask(task.id)}
                type={"details"}
            />
            }
            {task.stage === 'WAITING' &&
                <AppBtn
                    name={"Resume"}
                    action={() => resumeTask(task.id)}
                    type={"update"}
                />
            }
            {task.stage !== 'CLOSED' &&
            <AppBtn
                name={"Finish"}
                action={() => finishTask(task.id)}
                type={"update"}
            />
            }
            <AppBtn
                name={"Remove"}
                action={() => removeTask(task.id)}
                type={"remove"}
            />
        </Box>
    )
}