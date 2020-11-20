import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
    Button
  } from '@chakra-ui/react';

import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';

const drawerIllustration = <IllustrationContainer src='book_lover.svg' alt="No results" heigth="600px" width="600px"/>;
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
        case 'bdm2:Action':
            return 'Action';
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
        console.log(error)
    }
    return displayData;
};

function DataDrawer(props: any) {
    const { onClose } = useDisclosure();

    const displayProperties = getDisplayProperties(props.nodeData);
    return (
        <div >
            {props.nodeData ?
             <Drawer
                isOpen={props.displayDrawer}
                placement='right'
                onClose={onClose}
                trapFocus={false}
                onOverlayClick={() => props.setDisplayDrawer(false)}>
                <DrawerOverlay bg="none">
                    <DrawerContent>
                        <DrawerHeader>{displayProperties?.type}</DrawerHeader>
                        <DrawerBody>
                        <ul style={listStyle}>
                            <li style={listElementStyle}>{displayProperties?.name}</li>
                            <li style={listElementStyle}><a href={displayProperties?.link} target='_blank' rel='noopener noreferrer'>See full resource page</a></li>
                        </ul>
                        </DrawerBody>
                        {drawerIllustration}
                        <DrawerFooter>
                            <Button onClick={() => props.setDisplayDrawer(false)}>Close</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
            : null}
        </div>
    );
}

export default DataDrawer;