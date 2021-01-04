import React from 'react';

import { ListItem, Heading } from '@chakra-ui/react'

// This is not functioning at the moment.
const splitAndCapitalizeHeading = (propHeading: string) => {

    if(!propHeading) return null

    let charToSplitAt = 0;

     propHeading.split('').map((character, index) => {
        if (character === character.toUpperCase()) {
            charToSplitAt = index
        }
    });

    const processedHeading = propHeading.substring(0, charToSplitAt) + ' ' + propHeading.substring(charToSplitAt, -0)

    return processedHeading
}


function DataDrawerDisplayProperty(props: any) {
    return (
        <ListItem>
            <Heading size="xs">{splitAndCapitalizeHeading(props.propKey) || null}</Heading>
            {props.value}
        </ListItem>
    )
}

export default DataDrawerDisplayProperty;