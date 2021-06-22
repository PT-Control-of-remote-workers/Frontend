import {Box} from "grommet";
import React from "react";
import Content from "./Content";

export function Contents() {
    return (
        <Box
            gridArea="content"
            justify="start"
            align={"center"}
            background={"back"}
            width={"100%"}
            height={"100%"}
            gap={"medium"}
            direction={"column"}
            pad={"medium"}
            overflow={"scroll"}
        >
            <Content header={"Teams"} type={"team"}/>
            <Content header={"Tasks"} type={"task"}/>
        </Box>
    )
}