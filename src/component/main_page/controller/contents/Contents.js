import {Box} from "grommet";
import React from "react";
import {PreviewContent} from "./preview/PreviewContent";

export function Contents({content}) {
    return (
        <Box
            gridArea="content"
            justify="start"
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
        default:
            return (
                <>
                </>
            )
    }
}
