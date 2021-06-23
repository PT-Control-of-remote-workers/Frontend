import {Box} from "grommet";
import React from "react";
import {PreviewContent} from "./preview/PreviewContent";
import TeamsContainer from "./teams/TeamsContainer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export function Contents() {
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

            <SwitchContent />
        </Box>
    )
}

function SwitchContent(content) {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${match.path}/teams`}
                exact={true}
            >
                <TeamsContainer/>
            </Route>
            <Route
                path={match.url}
                exact={true}
            >
                <PreviewContent/>
            </Route>
        </Switch>
    )
}
