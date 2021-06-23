import React, {useState} from "react";
import {Box, Grid} from "grommet";
import Sidebar from "./sidebar/Sidebar";
import {Contents} from "./contents/Contents";
import SidebarContainer from "./sidebar/SidebarConteiner";

export function Controller() {
    return (
        <Box>

        <Grid
            fill
            gridArea={"controller"}
            columns={['auto', 'flex']}
            areas={[
                ['sidebar', 'content'],
            ]}
        >
            <SidebarContainer/>
            <Contents/>
        </Grid>
        </Box>
    )
}