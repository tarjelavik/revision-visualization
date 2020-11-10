import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    useDisclosure,
    Button
  } from '@chakra-ui/core';

interface DisplayData {
    type: string;
    name: string;
    description: string;
    link: string;
}

const listStyle = {
    listStyleType: 'none'
};

const listElementStyle = {
    marginBottom: '1rem'
};

const getDisplayType = (dataType: string) => {
    switch (dataType) {
        case 'bdm2:Institution':
            return 'Institution';
        case 'bdm2:BookObject':
            return 'Book object';
        case 'bdm2:Person':
            return 'Person';
        case 'bdm2:Action':
            return 'Action';
        default:
            return '';
    }
};

const getDisplayProperties = (nodeData: any) => {
    console.log(nodeData)
    if (!nodeData) return null;
    const displayData: DisplayData = {
        type: '',
        name: '',
        description: '',
        link: 'https://birgitta.test.uib.no/s/birgitta/item/'
    };

    try {
        displayData.name = nodeData['o:title'];
        displayData.type = getDisplayType(nodeData['@type'][1]);
        displayData.description = nodeData['bdm2:hasType'][0].display_title;
        displayData.link = displayData.link+nodeData['o:id'];
    } catch (error) {

    }
    console.log(displayData)
    return displayData;
};

function DataBox(props: any) {

    // TODO: We need to regain focus after opening drawer. Users must be able to click on other nodes
    // when drawer is open. This feature is coming in the next release of chakra.
    const { onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    const displayProperties = getDisplayProperties(props.nodeData);
    // TODO: Set property trapFocus={false} when it is released.
    return (
        <div ref={btnRef}>
            {props.nodeData ?
            <>
             <Drawer
                  isOpen={props.displayDrawer}
                  placement='right'
                  onClose={onClose}
                  finalFocusRef={btnRef}>
                <DrawerContent>
                    <DrawerHeader>{displayProperties?.type}</DrawerHeader>
                    <DrawerBody>
                    <ul style={listStyle}>
                        <li style={listElementStyle}>{displayProperties?.name}</li>
                        <li style={listElementStyle}>{displayProperties?.description}</li>
                        <li style={listElementStyle}><a href={displayProperties?.link} target='_blank' rel='noopener noreferrer'>See full resource page</a></li>
                    </ul>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={() => props.setDisplayDrawer(false)}>Close</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            </>
            : <div></div>}
        </div>
    );
}

export default DataBox;