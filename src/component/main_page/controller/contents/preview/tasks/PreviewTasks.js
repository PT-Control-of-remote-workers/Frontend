import {Box, Heading, InfiniteScroll, Table, TableBody, TableCell, TableHeader, TableRow} from "grommet";
import React, {useState} from "react";

export default function PreviewTasks({allTasks}) {
    if (allTasks == null) {
        allTasks = []
    }

    const firstTeams = Object.values(allTasks).slice(0, 5)

    const [step, setStep] = useState(1)
    const [tasks, setResults] = useState(firstTeams);
    const load = () => {
        const addTasks = Object.values(allTasks).slice(step * 5, step * 5 + 5)
        setResults([
            ...tasks,
            ...addTasks
        ]);

        if (addTasks.length !== 0) {
            setStep(step + 1)
        }
    };

    if (tasks.length !== 0) {

        return (
            <Box
                width={"90%"}
                round={"medium"}
                background={"white"}
                pad={"medium"}
                gap={"medium"}
            >
                <Heading level={2}>
                    Preview tasks
                </Heading>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell scope="col" border="bottom">
                                    Name
                                </TableCell>
                                <TableCell scope="col" border="bottom">
                                    Description
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <InfiniteScroll
                                renderMarker={marker => (
                                    <TableRow>
                                        <TableCell>{marker}</TableCell>
                                    </TableRow>
                                )}
                                scrollableAncestor="window"
                                items={tasks}
                                onMore={() => load()}
                                step={step}
                            >
                                {task => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.description}</TableCell>
                                    </TableRow>
                                )}
                            </InfiniteScroll>
                        </TableBody>
                    </Table>
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
                <Heading level={2}>
                    Preview tasks
                </Heading>
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
                            You have no tasks
                        </Heading>
                    </Box>
                </Box>
            </Box>
        )
    }
}