import {Box, Grid, Heading, InfiniteScroll, Table, TableBody, TableCell, TableHeader, TableRow} from "grommet";
import React, {useEffect, useState} from "react";

export default function PreviewTeams({username, allTeams}) {
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

    const firstTeams = Object.values(allTeams).slice(0, 5).sort(sortOnAdmin)

    const [teams, setResults] = useState(firstTeams)
    const [step, setStep] = useState(1)

    const load = () => {
        const addTeams = Object.values(allTeams).slice(step * 5, step * 5 + 5).sort(sortOnAdmin)
        setResults([
            ...teams,
            ...addTeams
        ]);

        if (addTeams.length !== 0) {
            setStep(step + 1)
        }
    };

    if (teams.length !== 0) {

        return (
            <Box
                width={"90%"}
                round={"medium"}
                background={"white"}
                pad={"medium"}
                gap={"medium"}
                overflow={"scroll"}
            >
                <Heading level={2}>
                    Preview teams
                </Heading>
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
                                Administrator
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                Count workers
                            </TableCell>
                            <TableCell scope="col" border="bottom">
                                Count tasks
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
                            items={teams}
                            onMore={() => load()}
                            step={step}
                        >
                            {team => (
                                <TableRow key={team.id}>
                                    <TableCell>{team.name}</TableCell>
                                    <TableCell>{team.admin}</TableCell>
                                    <TableCell>{team.workers.length}</TableCell>
                                    <TableCell>{team.tasks.length}</TableCell>
                                </TableRow>
                            )}
                        </InfiniteScroll>
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
                height={{min: 'medium'}}
            >
                <Heading level={2}>
                    Preview teams
                </Heading>
                <Box
                    border={"top"}
                >
                    <Box
                        align={"center"}
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