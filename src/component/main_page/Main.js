import React from 'react';

import {Box, Grid} from 'grommet';
import Footer from "../footer/Footer";
import Header from "./header/Header";
import {Controller} from "./controller/Controller";

export default function Main() {

    return (
        <Grid
            fill
            rows={["auto", "flex", "auto"]}
            areas={[
                ['header'],
                ['controller'],
                ['footer'],
            ]}
        >
            <Header/>
            <Controller/>
            <Footer/>

        </Grid>
    );
};