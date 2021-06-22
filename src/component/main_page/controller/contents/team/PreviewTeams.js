import {Box, Heading, Text} from "grommet";
import PreviewTeam from "./PreviewTeam";

export default function PreviewTeams({teams}) {
    if (teams.length !== 0) {
        return (
            <Box
                align={"center"}
                pad={"xsmall"}
                gap={"small"}
                direction={"column"}
            >
                {
                    teams.map(data => (
                        <PreviewTeam name={data.name}/>
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
                    You are not a member of any team
                </Heading>
            </Box>
        )
    }
}