import {Box, Button, Form, FormField, Heading, TextInput} from "grommet";
import React from "react";
import {styles} from "../util/AppBtn";
import {NavLink} from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function SingUpForm() {
    const [value, setValue] = React.useState({});
    const history = useHistory();
    return (
        <Box
            pad={"large"}
            round={"medium"}
            background={"white"}
            gap={"large"}
            width={"medium"}
            height={"100%"}
        >
            <Heading textAlign={"center"} level={2}>
                Sign Up
            </Heading>
            <Form
                value={value}
                onChange={nextValue => {
                    setValue(nextValue)}
                }
                onSubmit={({ value }) => {
                    localStorage.setItem("name", value.name)
                    history.push("/index");
                }}
            >
                <Box
                    gap={"medium"}
                >
                    <FormField
                        label={'Name'}
                        name={'name'}
                        required={true}
                    >
                        <TextInput
                            name={'name'}
                            width={'large'}
                        />
                    </FormField>
                    <FormField
                        label={'Email'}
                        name={'email'}
                        required={true}
                    >
                        <TextInput
                            name={'email'}
                            type={'email'}
                            width={'large'}
                        />
                    </FormField>
                    <FormField
                        label={'* Password'}
                        name={'password'}
                        required={true}
                    >
                        <TextInput
                            name={'password'}
                            type={'password'}
                            width={'large'}
                        />
                    </FormField>
                    <Button
                        primary
                        type={"submit"}
                        label={"Create account"}
                        style={{
                            'font-size': "25px",
                            'color': "white",
                            'text-align': "center",
                            'width': '100%',
                            'background-color': "#11D600",
                        }}
                    />
                </Box>
            </Form>
        </Box>
    )
}