import React, {useState} from "react";
import {Grid} from "grommet";
import Sidebar from "./sidebar/Sidebar";
import {Contents} from "./contents/Contents";

export function Controller() {

    const defaultContent = {
        type: "preview"
    }

    const [content, setContent] = useState(defaultContent)

    return (
        <Grid
            gridArea={"controller"}
            columns={['auto', 'flex']}
            areas={[
                ['sidebar', 'content'],
            ]}
        >
            <Sidebar
                setContent={setContent}
            />
            <Contents
                content={content}
            />
        </Grid>
    )
}