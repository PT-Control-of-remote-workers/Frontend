import React from "react";
import {Grid} from "grommet";
import Sidebar from "../sidebar/Sidebar";
import {Contents} from "./contents/Contents";

export function Controller() {
    return (
        <Grid
            gridArea={"controller"}
            columns={['auto', 'flex']}
            areas={[
                ['sidebar', 'content'],
            ]}
        >
            <Sidebar/>
            <Contents/>
        </Grid>
    )
}