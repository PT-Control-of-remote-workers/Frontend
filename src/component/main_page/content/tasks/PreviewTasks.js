import {Box, Heading, Text} from "grommet";
import PreviewTask from "./PreviewTask";

export default function PreviewTasks({tasks}) {
    if (tasks.length !== 0) {
        return (
            <Box
                align={"center"}
                pad={"xsmall"}
                gap={"small"}
                direction={"column"}
            >
                {
                    tasks.map(data => (
                        <PreviewTask name={data.name}/>
                    ))
                }
            </Box>
        )
    } else {
        return (
            <Box
                align={"center"}
                pad={"xsmall"}
                gap={"small"}
                direction={"column"}
            >
                <Heading level={3}>
                    You have no tasks
                </Heading>
            </Box>
        )
    }
}