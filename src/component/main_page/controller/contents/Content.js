import {Box, Heading} from "grommet";
import React from "react";
import PreviewTasks from "./tasks/PreviewTasks";
import PreviewTeams from "./team/PreviewTeams";

export default function Content({header, type}) {
    return (
        <Box
            width={"90%"}
            round={"medium"}
            background={"white"}
            pad={"medium"}
            gap={"medium"}
        >
            <Heading level={2}>
                {header}
            </Heading>
            <Box
                border={"top"}
            >
                {
                    type === "task" &&
                    <PreviewTasks
                        tasks={[
                            // {name: "task1"},
                            // {name: "task2"},
                            // {name: "task3"},
                        ]}
                    />
                }
                {
                    type === "team" &&
                    <PreviewTeams
                        teams={[
                            {name: "team one"},
                            {name: "team another"},
                            {name: "old team"},
                        ]}
                    />
                }
            </Box>
        </Box>
    )
}