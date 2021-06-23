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
            overflow={"auto"}
        >
            <Heading textAlign={"center"} level={2}>
                About Us
            </Heading>
            <Text textAlign={"center"} size={"large"}>
                COW is a free teleworking platform.<br/>
                Our product allows you to manage tasks for your team, as well as monitor the time that each employee spends on completing their tasks.
                Our platform allows you to integrate with third party task managers like Trello.
                The interface is simple and straightforward, which is why it will not be difficult for your employees to use our platform.
                We carefully study all the wishes of our users and try to make our platform better, together with you.<br/>

            </Text>
            <Text textAlign={"center"} size={"large"}>
                Start using COW now!
            </Text>
        </Box>
    )
}