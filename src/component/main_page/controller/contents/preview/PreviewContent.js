import React from "react";
import {Box} from "grommet";
import PreviewTeamsContainer from "./team/PreviewTeamsContainer";
import PreviewTasksContainer from "./tasks/PreviewTasksContainer";

export function PreviewContent() {
    return (
        <Box
            fill
            gap={"medium"}
            direction={"column"}
            justify="start"
            align={"center"}
            width={"100%"}
            height={"100%"}
        >
            <PreviewTeamsContainer/>
            <PreviewTasksContainer/>

        </Box>
    )
}