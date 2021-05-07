import {Anchor, Box, Grid, Text} from "grommet";
import React from "react";

export default function Footer() {
    return (
        <Box
            gridArea="footer"
            direction="row"
            align="start"
            justify="center"
            pad={{horizontal: 'medium', vertical: 'medium'}}
            background={"footer"}
        >
            <ListLinks
                columnName="Development:"
                links={{
                    GitHub: 'https://github.com/PT-Control-of-remote-workers',
                    Trello: 'https://trello.com/b/6gSedKQ7',
                    Miro: 'https://miro.com/app/board/o9J_lQieO2s=/',
                }}
            />
            <ListLinks
                columnName="Accounts:"
                links={{
                    "Udarczev Anatoliy": 'https://github.com/Anatoliy057',
                    "Lisaev Denis": 'https://github.com/denislisaev',
                }}
            />
        </Box>
    )
}

function ListLinks({links, columnName}) {
    return (
        <Box
            width="small"
            height={{ max: 'small' }}
            round="small"
            align="start"
            justify="center"
            overflow="auto"
            gap={"xsmall"}
        >
            <Text margin={{bottom:"20px"}}>
                {columnName}
            </Text>
            {
                Object.entries(links).map(e => (
                <Anchor
                    justify="center"
                    background={"white"}
                    overflow="auto"
                    href={e[1]}
                    label={e[0]}
                />
            ))}
        </Box>
    )
}