import {Box, Button, Form, FormField, Heading, Layer, Text, TextInput} from "grommet";
import AppBtn from "../../../../../util/AppBtn";
import React from "react";
import {styles} from "../../../../../util/styles";

export function InviteWorker({team, onSubmit, setValue, value, errorMessage, setErrorMessage, isOpen, onOpen, onClose}) {
    return (
        <>
            <AppBtn
                type={"update"}
                name="Invite"
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
                        Invite worker
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
                                label={'Username of worker'}
                                name={'username'}
                                required={true}
                            >
                                <TextInput
                                    name={'username'}
                                    type={'username'}
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
                                    label={"Add"}
                                    style={styles['create']}
                                />
                            </Box>
                        </Box>
                    </Form>
                </Box>
            </Layer>)}
        </>
    )
}