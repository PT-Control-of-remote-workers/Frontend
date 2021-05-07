import React, {useState} from 'react';

import {Box, Button, DropButton, Heading, Avatar, Layer, Form, FormField, TextInput} from 'grommet';
import {useHistory} from "react-router-dom";

export default function SignIn() {
    const [value, setValue] = React.useState({});
    const history = useHistory();
    const [open, setOpen] = useState();

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => setOpen(undefined);
    console.log(open)

    return (
        <>
            <Button
                style={{
                    "hover.border": "none",
                    border: "none",
                    'background-color': "#4FAEB4",
                    'color': "white",
                    'font-size': "32px",
                }}
                label="Sign In"
                onClick={onOpen}
            />
            {open && (<Layer position="center" onClickOutside={onClose} onEsc={onClose}>
                <Box
                    justify={"start"}
                    align={"center"}
                    pad="medium"
                    gap="small"
                    width="medium"
                >
                    <Heading level={3}>
                        Sign in
                    </Heading>
                    <Form
                        value={value}
                        onChange={nextValue => {
                            setValue(nextValue)
                        }
                        }
                        onSubmit={({value}) => {
                            localStorage.setItem("name", "Name from DB")
                            history.push("/index");
                            onClose()
                        }}
                    >
                        <Box
                            gap={"medium"}
                        >
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
                            <Box
                                width={"100%"}
                                align={"center"}
                            >
                                <Button
                                    primary
                                    type={"submit"}
                                    label={"Log in"}
                                    style={{
                                        'color': "white",
                                        'text-align': "center",
                                        'width': '100%',
                                        'background-color': "#11D600",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Form>
                </Box>
            </Layer>)}
        </>
    )
};
