import Content from "./Content";
import React from "react";
import {Box} from "grommet";

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
            <Content header={"Teams"} type={"team"}/>
            <Content header={"Tasks"} type={"task"}/>

        </Box>
    )
}