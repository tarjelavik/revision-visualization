import React from 'react';
import { Box, Button } from "@chakra-ui/react"
import { getLabel} from '../../helpers';
import { FaEquals } from "react-icons/fa";


const navigateToSearch = (props: any) => {
    props.resetGraph();
    props.selectedClasses.forEach((selectedClass: string) => {
        props.addToDropDownData(getLabel(selectedClass));
    })
};

const handleToggle = (props: any) => {
    props.toggleShowBackButton();
}


export default function ControlBox(props: any) {
    return (
    <Box width="fit-content" ml="2rem" mt="1rem">
        {props.displayGraph && !props.showBackButton ?
        <Box>
            <FaEquals onClick={() => handleToggle(props)} size="10%"/>
        </Box>
        : null}
        {props.showBackButton ?
        <Box>
            <Button shadow="2xl" onClick={() => {navigateToSearch(props); handleToggle(props)}}>Back to search</Button>
        </Box>
        : null}
    </Box>
    )
}