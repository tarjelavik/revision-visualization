import React from 'react';
import { Box, Button } from "@chakra-ui/react"
import { getLabel} from '../../helpers';
import { FaEquals } from "react-icons/fa";

interface NavigateToSearchProps {
    selectedClasses: string[]
    resetGraph(): void,
    addToDropDownData(id: string): void
}

interface HandleToggleProps {
    toggleShowBackButton(): void
}

interface ControlBoxPros {
    selectedClasses: string[],
    displayGraph: boolean,
    showBackButton: boolean,
    setDisplayGraph(show: boolean): void,
    toggleShowBackButton: () => void,
    resetGraph(): void,
    addToDropDownData(id: string): void
}

const navigateToSearch = (props: NavigateToSearchProps): void => {
    props.resetGraph();
    props.selectedClasses.forEach((selectedClass: string) => {
        props.addToDropDownData(getLabel(selectedClass));
    })
};

const handleToggle = (props: HandleToggleProps): void => {
    props.toggleShowBackButton();
}


export default function ControlBox(props: ControlBoxPros) {
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