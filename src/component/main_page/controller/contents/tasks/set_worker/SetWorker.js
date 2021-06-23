import {Box, Button, Heading, Layer, Text, TextInput} from "grommet";
import React from "react";
import AppBtn from "../../../../../util/AppBtn";
import {styles, colors} from "../../../../../util/styles";

export function SetWorker({workers, onSubmit, worker, setWorker, search, setSearch, onOpen, onClose, isOpen, errorMessage}) {
    workers = Object.values(workers).filter((w) => {
        const name = `${w.name} ${w.family_name} ${w.email}`
        return name.match(`.*${search}.*`)
    })

    return (
        <>
            <AppBtn
                type={"focus"}
                name="Set worker"
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
                        Select worker
                    </Heading>

                    <TextInput
                        placeholder="Name of worker"
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />

                    <Box
                        round={"large"}
                        overflow={"auto"}
                        gap={"small"}
                        pad="medium"
                        style={{'background-color': colors['back']}}
                    >
                        <Box
                            round={"small"}
                            width={"fill"}
                            style={getColor(null, worker)}
                            onClick={() => {
                                setWorker(null)
                            }}
                            pad={"small"}
                        >
                            <Text>
                                UNSELECT
                            </Text>
                        </Box>
                        {
                            workers.map((curWorker, i) => {
                                const name = `${curWorker.name} ${curWorker.family_name} ${curWorker.email}`
                                return (
                                    <Box
                                        round={"small"}
                                        width={"fill"}
                                        style={getColor(curWorker.username, worker)}
                                        onClick={() => {
                                            setWorker(curWorker.username)
                                        }}
                                        pad={"small"}
                                    >
                                        <Text>
                                            {name}
                                        </Text>
                                    </Box>
                                )
                            })
                        }
                    </Box>

                    {errorMessage &&
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
                            size={"large"}
                            onClick={onSubmit}
                            label={"Select"}
                            style={styles["create"]}
                        />
                    </Box>
                </Box>
            </Layer>)}
        </>
    )
}

function getColor(curWorker, worker) {
    if (curWorker === worker) {
        return {
            'background-color': colors['focus'],
            color: colors['white']
        }
    } else {
        return {'background-color': colors['white']}
    }
}
