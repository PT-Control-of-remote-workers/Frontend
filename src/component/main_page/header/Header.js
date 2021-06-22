import React from 'react'
import {Box, Heading, Text} from 'grommet'
import {NavLink} from 'react-router-dom'
import AccountMenuContainer from "./AccountMenuContainer";

export default function Header() {
    return (
        <Box
            gridArea={"header"}
            pad={{
                "left": "medium",
                "right": "small"
            }}
            background={'header'}
        >
            <Box
                justify={'between'}
                direction={'row'}
                align="center"
            >

            <Text alignSelf={'center'}>
                <NavLink
                    to={'/main'}
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

            <AccountMenuContainer/>
            </Box>

        </Box>
    )
}
