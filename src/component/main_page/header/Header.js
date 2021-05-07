import React from 'react'
import {Box, Heading, Text} from 'grommet'
import {NavLink} from 'react-router-dom'
import AccountMenu from "./AccountMenu";

export default function Header() {
    return (
        <Box
            gridArea={"header"}

            tag={'header'}
            pad={{vertical: 'medium', horizontal: 'medium'}}
            background={'header'}
            elevation={'medium'}
        >
            <Box
                margin={{right: "50px"}}
                justify={'between'}
                direction={'row'}
                align="center"
            >

            <Text alignSelf={'center'}>
                <NavLink
                    to={'/'}
                    style={{textDecoration: 'none'}}
                >
                    <Heading
                        level={2}
                        color={'light-1'}
                    >
                        Control&nbsp;of&nbsp;workers
                    </Heading>
                </NavLink>

            </Text>

            <AccountMenu/>
            </Box>

        </Box>
    )
}
