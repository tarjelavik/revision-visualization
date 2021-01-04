import React from 'react';

import { ListItem, Heading } from '@chakra-ui/react'

function DataDrawerDisplayProperty(props: any) {
    console.log(props)
    return (
        <ListItem>
            <Heading size="xs">{props.propKey || null}</Heading>
            {props.value}
        </ListItem>
    )
}

export default DataDrawerDisplayProperty;