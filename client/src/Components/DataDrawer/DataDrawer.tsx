import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
    Button,
    List,
  } from '@chakra-ui/react';

import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';
import { PersonData, getDisplayProperties, desiredProps } from '../../helpers';
import DataDrawerDisplayProperty from '../DataDrawerDisplayProperty/DataDrawerDisplayProperty';

const drawerIllustration = <IllustrationContainer src='book_lover.svg' alt="No results" heigth="600px" width="600px"/>;

const listStyle = {
    listStyleType: 'none'
};

// Todo: Refactor this out to a helper function or something
const getPropertiesToDisplay = (nodeData: any) => {
    if (!nodeData) return null;
    return getDisplayProperties(nodeData)
};

const filterProps = (props: any) => {

    // We need to set a guard against a null object here
    props = props || {foo: 'bar'}
    const filteredProps = []

    for (let key in props) {
        if (desiredProps.includes(key)) {
            filteredProps.push(props[key][0])
        }
    }

    return filteredProps
}

function DataDrawer(props: any) {
    const { onClose } = useDisclosure();
    const nodes = filterProps(props.nodeData);

    const displayProperties: PersonData | any = getPropertiesToDisplay(props.nodeData);
    return (
        <div>
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
                        <List style={listStyle}>
                        {nodes.map((element, index) => {return <DataDrawerDisplayProperty key={index} propKey={element['property_label']} value={element['display_title'] || element['@value']}/>})}
                        </List>
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