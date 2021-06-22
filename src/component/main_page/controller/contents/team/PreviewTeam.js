import React from "react";
import {Box, Text} from "grommet";

export default function PreviewTeam({name}) {
    return (
        <Box
            align={"center"}
            justify={"between"}
            width={"100%"}
            direction={"row"}
        >
            <Text>
                {name}
            </Text>
            <Text>
                general information
            </Text>
        </Box>
    )
}