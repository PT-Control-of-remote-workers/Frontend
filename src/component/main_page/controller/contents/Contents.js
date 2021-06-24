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
import TeamContainer from "./team/TeamContainer";
import TasksContainer from "./tasks/TasksContainer";
import TaskContainer from "./task/TaskContainer";
import DetailsConteiner from "./details/DetailsConteiner";

export function Contents() {
    return (
        <Box
            fill
            gridArea="content"
            align={"center"}
            background={"back"}
            direction={"column"}
            pad={"small"}
            overflow={"scroll"}
        >

            <SwitchContent />
        </Box>
    )
}

function SwitchContent() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route
                path={`${match.path}/tasks/:taskId/workers/:workerId`}
                exact={true}
            >
                <DetailsConteiner/>
            </Route>
            <Route
                path={`${match.path}/tasks/:taskId`}
                exact={true}
            >
                <TaskContainer/>
            </Route>
            <Route
                path={`${match.path}/teams/:teamId/tasks`}
                exact={true}
            >
                <TasksContainer/>
            </Route>
            <Route
                path={`${match.path}/teams/:teamId`}
                exact={true}
            >
                <TeamContainer/>
            </Route>
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
