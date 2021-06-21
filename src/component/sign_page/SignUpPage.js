import SignInHeader from "./header/SignInHeader";
import Footer from "../footer/Footer";
import {Box, Grid, Text} from "grommet";
import SignUpForm from "./sign_up/SignUpForm";
import AboutUs from "./AboutUs";
import React from "react";
import SignUpContainer from "./sign_up/SignUpFormContainer";


export default function SignUpPage() {
    return (
        <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
                ['header', 'header'],
                ['main', 'main'],
                ['footer', 'footer'],
            ]}
            color={"back"}
        >
            <SignInHeader/>
            <Footer/>

            <Box
                gridArea={"main"}
                background={"back"}
                pad={"large"}
                direction="row-responsive"
                align="center"
                justify="center"
                gap="large"
            >
                <SignUpContainer/>
                <AboutUs/>
            </Box>

        </Grid>
    )
}