import {Box, Button, Form, FormField, Heading, Text, TextInput} from "grommet";
import React from "react";

export default function SingUpForm({onSubmit, setValue, value, errorMessage, setErrorMessage}) {
    return (
        <Box
            pad={"large"}
            round={"large"}
            background={"white"}
            gap={"small"}
            width={"medium"}
            height={"100%"}
            overflow={"scroll"}
        >
            <Heading textAlign={"center"} level={2}>
                Sign Up
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
                    gap={"small"}
                >
                    <FormField
                        label={'Login'}
                        name={'username'}
                        required={true}
                    >
                        <TextInput
                            name={'username'}
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
                        label={'First name'}
                        name={'firstName'}
                        required={true}
                    >
                        <TextInput
                            name={'firstName'}
                            width={'large'}
                        />
                    </FormField>
                    <FormField
                        label={'Last name'}
                        name={'lastName'}
                        required={true}
                    >
                        <TextInput
                            name={'lastName'}
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