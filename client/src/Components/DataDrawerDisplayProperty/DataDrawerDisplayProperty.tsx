import React from 'react';

import { ListItem, Heading } from '@chakra-ui/react'

// Can we make this better?
export const splitAndCapitalizeHeading = (propHeading: string) => {

    if(!propHeading) return null;
    propHeading = propHeading.replace(/([a-z])([A-Z])/g, '$1 $2');
    propHeading = propHeading.charAt(0).toUpperCase() + propHeading.slice(1);
    return propHeading
};


function DataDrawerDisplayProperty(props: any) {
    return (
        <ListItem>
            <Heading size="xs">{splitAndCapitalizeHeading(props.propKey) || null}</Heading>
            {props.value}
        </ListItem>
    )
}

export default DataDrawerDisplayProperty;