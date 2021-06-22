import {Box, Button, Form, FormField, Heading, Layer, Text, TextInput} from "grommet";
import React from "react";
import AppBtn from "../../../../util/AppBtn";

export function EditTeam({team, onSubmit, setValue, value, errorMessage, setErrorMessage, isOpen, onOpen, onClose}) {
    return (
        <>
            <AppBtn
                type={"update"}
                name="Edit"
                action={onOpen}
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
                        Edit team
                    </Heading>
                    <Heading level={4}>
                        {team.name}#{team.id}
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
                                label={'Name of team'}
                                name={'name'}
                                required={true}
                            >
                                <TextInput
                                    name={'name'}
                                    type={'name'}
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
                                    label={"Update"}
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
}