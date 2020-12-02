import React from 'react';

import { Box, Button } from '@chakra-ui/react';

const navigateToSearch = (props: any) => {
    console.log(props)
    props.resetGraph();
};

export default function ControlBox(props: any) {
    return (
    <>
        {props.displayGraph ?
        <Box w="fit-content" ml="2rem" padding="2rem" bg="grey.500">
            <Button onClick={() => navigateToSearch(props)}>Back</Button>
        </Box>
        : null}
    </>
    )
}