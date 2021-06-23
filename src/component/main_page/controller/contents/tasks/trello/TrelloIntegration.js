import {Box, Button, Form, FormField, Heading, Layer, Text, TextArea, TextInput} from "grommet";
import AppBtn from "../../../../../util/AppBtn";
import {styles} from "../../../../../util/styles";
import React from "react";

export function TrelloIntegration({onSubmit, setValue, value, errorMessage, setErrorMessage, isOpen, onOpen, onClose})
{
    return (
        <>
            <AppBtn
                type={"focus"}
                name="Trello"
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
                        Trello data
                    </Heading>
                    <Form
                        value={value}
                        onChange={nextValue => {
                            setValue({
                                ...value,
                                ...nextValue
                            })
                            setErrorMessage(undefined)
                        }
                        }
                        onSubmit={onSubmit}
                    >
                        <Box
                            gap={"medium"}
                        >
                            <FormField
                                label={'Board id'}
                                name={'board'}
                                required={true}
                            >
                                <TextInput
                                    name={'board'}
                                    type={'board'}
                                    width={'large'}
                                />
                            </FormField>
                            <FormField
                                label={'Column name'}
                                name={'nameList'}
                                required={true}
                            >
                                <TextInput
                                    name={'nameList'}
                                    type={'nameList'}
                                    width={'large'}
                                />
                            </FormField>
                            <FormField
                                label={'Token'}
                                name={'token'}
                                required={true}
                            >
                                <TextInput
                                    name={'token'}
                                    type={'token'}
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
                                    label={"Load"}
                                    style={styles["focus"]}
                                />
                            </Box>
                        </Box>
                    </Form>
                </Box>
            </Layer>)}
        </>
    )
}