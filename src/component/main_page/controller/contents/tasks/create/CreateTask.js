import {Box, Button, Form, FormField, Heading, Layer, Text, TextArea, TextInput} from "grommet";
import AppBtn from "../../../../../util/AppBtn";
import React from "react";
import {styles} from "../../../../../util/styles";

export function CreateTask({onSubmit, setValue, value, errorMessage, setErrorMessage, isOpen, onOpen, onClose}) {
    return (
        <>
            <AppBtn
                type={"create"}
                name="Create"
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
                        Create task
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
                                label={'Name'}
                                name={'name'}
                                required={true}
                            >
                                <TextInput
                                    name={'name'}
                                    type={'name'}
                                    width={'large'}
                                />
                            </FormField>
                            <FormField name="description" label="Description">
                                <TextArea name="description" placeholder="Description of task" />
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
                                    label={"Create"}
                                    style={styles["create"]}
                                />
                            </Box>
                        </Box>
                    </Form>
                </Box>
            </Layer>)}
        </>
    )
}