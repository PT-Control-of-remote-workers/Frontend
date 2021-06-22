import React from 'react';

import {Box, Grid, Text} from 'grommet';
import Sidebar from "./sidebar/Sidebar";
import Footer from "../footer/Footer";
import Header from "./header/Header";
import Content from "./content/Content";

export default function Main() {

    return (
        <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
                ['header', 'header'],
                ['sidebar', 'main'],
                ['footer', 'footer'],
            ]}
        >
            <Header/>
            <Sidebar/>
            <Footer/>

            <Box
                gridArea="main"
                justify="start"
                align={"center"}
                background={"back"}
                width={"100%"}
                height={"100%"}
                gap={"medium"}
                direction={"column"}
                pad={"medium"}
                overflow={"scroll"}
            >
                <Content header={"Teams"} type={"team"}/>
                <Content header={"Tasks"} type={"task"}/>
            </Box>

        </Grid>
    );
};