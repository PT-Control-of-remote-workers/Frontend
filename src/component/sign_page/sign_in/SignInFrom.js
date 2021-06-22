import React, {useState} from 'react';

import {Box, Button, Heading, Layer, Form, FormField, TextInput, Text} from 'grommet';

export default function SignInFrom({onSubmit, setValue, value, errorMessage, setErrorMessage, isOpen, onOpen, onClose}) {
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
            {isOpen && (<Layer position="center" onClickOutside={onClose} onEsc={onClose}>
                <Box
                    round={"large"}
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
                            setErrorMessage(undefined)
                        }
                        }
                        onSubmit={onSubmit}
                    >
                        <Box
                            gap={"medium"}
                        >
                            <FormField
                                label={'Login'}
                                name={'username'}
                                required={true}
                            >
                                <TextInput
                                    name={'username'}
                                    type={'username'}
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
                            {errorMessage !== undefined &&
                            <Box
                                align={'center'}
                                margin={{vertical: 'small'}}
                            >
                                <Text
                                    color={'status-critical'}
                                    size={'large'}
                                    weight={'bold'}
                                >
                                    {errorMessage}
                                </Text>
                            </Box>
                            }
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
