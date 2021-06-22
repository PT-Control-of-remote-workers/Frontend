import React from "react";
import {Box} from "grommet";
import PreviewTeamsContainer from "./team/PreviewTeamsContainer";
import PreviewTasksContainer from "./tasks/PreviewTasksContainer";

export function PreviewContent() {
    return (
        <Box
            gap={"medium"}
            direction={"column"}
            align={"center"}
            width={"100%"}
        >
            <PreviewTeamsContainer/>
            <PreviewTasksContainer/>

        </Box>
    )
}