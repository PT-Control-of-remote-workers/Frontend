import SignInHeader from "./header/SignInHeader";
import Footer from "../footer/Footer";
import {Box, Grid, Text} from "grommet";
import SignUpForm from "./SignUpForm";
import AboutUs from "./AboutUs";


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
                <SignUpForm/>
                <AboutUs/>
            </Box>

        </Grid>
    )
}