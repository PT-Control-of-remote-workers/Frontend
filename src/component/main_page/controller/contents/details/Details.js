import {Box, Grid, Heading, Table, TableBody, TableCell, TableHeader, TableRow, Text} from "grommet";
import {styles, colors} from "../../../../util/styles";
import React from "react";

export function Details({state, errorMessage, setErrorMessage}) {
    if (state == null) {
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
                        "right": "small",
                    }}
                    gap={"small"}
                    direction={"column"}
                >
                    <Heading level={2}>
                        Details
                    </Heading>

                    <Box
                        width={"medium"}
                        height={"xxsmall"}
                        round={"medium"}
                        style={{'background-color': colors["back"]}}
                    />
                    <Box
                        width={"small"}
                        height={"xxsmall"}
                        round={"medium"}
                        style={{'background-color': colors["back"]}}
                    />
                </Box>
                <Box
                    border
                    round={"large"}
                    align={"center"}
                    pad={"xsmall"}
                    gap={"small"}
                    direction={"column"}
                    justify={"center"}
                    size={"large"}
                    height={"medium"}
                >
                    <Heading level={3}>
                        Loading
                    </Heading>
                </Box>
            </Box>
        )
    }

    const sortOnDate = (c1, c2) => {
        return c1.date - c2.date
    }

    const calls = Object.values(state.calls).sort(sortOnDate)
    const worker = state.worker
    const task = state.task

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
                    "right": "small",
                    "bottom": "small"
                }}
                gap={"small"}
                direction={"column"}
            >
                <Heading level={2}>
                    Details
                </Heading>
                <Text size={"xlarge"}>
                    Worker: {worker.name} {worker.family_name} {worker.email}
                </Text>
                <Text size={"xlarge"}>
                    Task: {task.name} # {task.id}
                </Text>
            </Box>
            <Box
                border
                round={"large"}
                align={"center"}
                pad={"xsmall"}
                gap={"small"}
                direction={"column"}
                justify={"center"}
                size={"large"}
            >
                <Box
                    fill
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
                                        Date
                                    </TableCell>
                                    <TableCell scope="col" border="bottom">
                                        Type
                                    </TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    calls.map((call, i) => {
                                        return (
                                            <TableRow key={call.id}>
                                                <TableCell>{new Date(call.date).toISOString().substring(0, 10)}</TableCell>
                                                <TableCell>{call.type}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}