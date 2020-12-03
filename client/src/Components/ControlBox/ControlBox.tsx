import React from 'react';

import { Box, Button } from '@chakra-ui/react';
import { getLabel} from '../../helpers';

const navigateToSearch = (props: any) => {
    props.resetGraph();
    props.selectedClasses.forEach((selectedClass: string) => {
        props.addToDropDownData(getLabel(selectedClass));
    })
};

export default function ControlBox(props: any) {
    return (
    <>
        {props.displayGraph ?
        <Box w="fit-content" ml="2rem" padding="2rem" bg="grey.500">
            <Button onClick={() => navigateToSearch(props)}>Back to search</Button>
        </Box>
        : null}
    </>
    )
}