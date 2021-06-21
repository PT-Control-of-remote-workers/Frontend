import {Box, Heading, Text} from "grommet";
import React from "react";

export default function AboutUs() {
    return (
        <Box
            width="large"
            height="100%"
            pad={"large"}
            round={"medium"}
            background={"white"}
            gap={"large"}
        >
            <Heading textAlign={"center"} level={2}>
                About Us
            </Heading>
            <Text textAlign={"center"}>
                about about about about about about about about about about about about about about about about about
                about about about about about about about about about about about about about about about about about
                about about about about about about about about
            </Text>
        </Box>
    )
}