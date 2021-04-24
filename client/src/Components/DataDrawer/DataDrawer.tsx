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

import bookLover from '../../Assets/img/book_lover.svg';
import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';
import { desiredProps, getDisplayType } from '../../helpers';
import DataDrawerDisplayProperty from '../DataDrawerDisplayProperty/DataDrawerDisplayProperty';

const drawerIllustration = <IllustrationContainer src={bookLover} alt="No results" heigth="600px" width="600px"/>;

const listStyle = {
    listStyleType: 'none'
};


const filterProps = (nodeData: any) => {
    // We need to set a guard against a null object here
    nodeData = nodeData || {foo: 'bar'}
    const filteredProps = []

    for (let key in nodeData) {
        if (desiredProps.includes(key)) {
            filteredProps.push(nodeData[key][0])
        }
    }

    return filteredProps
}

const getLinkToResource = (nodeData: any) => {
    try {
       return `https://birgitta.test.uib.no/s/birgitta/item/${nodeData['o:id']}`
    } catch {
        return ''
    }
};

function DataDrawer(props: any) {
    const { onClose } = useDisclosure();
    const nodes = filterProps(props.nodeData);
    const linkToResource = getLinkToResource(props.nodeData)

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
                        <DrawerHeader>{getDisplayType(props.nodeData['@type'][1])}</DrawerHeader>
                        <DrawerBody>
                        <List style={listStyle}>
                        {nodes.map((element, index) => {return <DataDrawerDisplayProperty key={index} propKey={element['property_label']} value={element['display_title'] || element['@value']}/>})}
                        <DataDrawerDisplayProperty propKey="Link to Record" value={<a href={linkToResource} target='_blank' rel='noopener noreferrer'>See full resource page</a>}/>
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