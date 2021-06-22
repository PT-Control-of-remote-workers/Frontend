import {Box} from "grommet";
import React from "react";
import {PreviewContent} from "./preview/PreviewContent";
import TeamsContainer from "./teams/TeamsContainer";

export function Contents({content}) {
    return (
        <Box
            gridArea="content"
            align={"center"}
            background={"back"}
            width={"100%"}
            height={"100%"}
            direction={"column"}
            pad={"small"}
            overflow={"scroll"}
        >
            {switchContent(content)}
        </Box>
    )
}

function switchContent(content) {
    switch (content.type) {
        case "preview":
            return (
                <PreviewContent/>

            )
        case "teams":
            return (
                <TeamsContainer/>
            )
        default:
            return (
                <>
                </>
            )
    }
}
