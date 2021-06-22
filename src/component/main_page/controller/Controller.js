import React, {useState} from "react";
import {Box, Grid} from "grommet";
import Sidebar from "./sidebar/Sidebar";
import {Contents} from "./contents/Contents";
import SidebarContainer from "./sidebar/SidebarConteiner";

export function Controller() {

    const defaultContent = {
        type: "preview"
    }

    const [content, setContent] = useState(defaultContent)

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
            <SidebarContainer
                setContent={setContent}
            />
            <Contents
                content={content}
            />
        </Grid>
        </Box>
    )
}