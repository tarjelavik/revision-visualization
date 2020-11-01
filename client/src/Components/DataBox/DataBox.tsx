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
        default:
            return '';
    }
};

const getDisplayProperties = (nodeData: any) => {
    if (!nodeData) return null;
    const displayData: DisplayData = {
        type: '',
        name: '',
        link: 'https://birgitta.test.uib.no/s/birgitta/item/'
    };

    try {
        displayData.name = nodeData['o:title'];
        displayData.type = getDisplayType(nodeData['@type'][1]);
        displayData.link = displayData.link+nodeData['o:id'];
    } catch (error) {

    }
    return displayData;
};

function DataBox(props: any) {

    // TODO: We need to regain focus after opening drawer. Users must be able to click on other nodes
    // when drawer is open
    const { onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    const displayProperties = getDisplayProperties(props.nodeData);
    console.log(props.nodeData)
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
                    <DrawerHeader>{displayProperties?.name}</DrawerHeader>
                    <DrawerBody>
                    <ul style={listStyle}>
                        <li style={listElementStyle}>{displayProperties?.name}</li>
                        <li style={listElementStyle}>{displayProperties?.type}</li>
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