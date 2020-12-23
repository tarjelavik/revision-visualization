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
    ListItem,
    Heading
  } from '@chakra-ui/react';

import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';
import { PersonData, getDisplayProperties } from '../../helpers';
import DataDrawerDisplayProperty from '../DataDrawerDisplayProperty/DataDrawerDisplayProperty';

const drawerIllustration = <IllustrationContainer src='book_lover.svg' alt="No results" heigth="600px" width="600px"/>;

const listStyle = {
    listStyleType: 'none'
};

const listElementStyle = {
    marginBottom: '1rem'
};

// Todo: Refactor this out to a helper function or something
const getPropertiesToDisplay = (nodeData: any) => {
    if (!nodeData) return null;
    return getDisplayProperties(nodeData)
};

const desiredProps = ['schema:name']

const filterProps = (props: any) => {

    props = props || {hello: 'hello'}
    console.log(Object.keys(props))
    // let filteredProps = {};
    Object.keys(props).forEach(propKey => {
        console.log(propKey)
        if (propKey in desiredProps) {
            console.log(propKey)
        }
    });

    return {hello: 'yolo'}
}

function DataDrawer(props: any) {
    const { onClose } = useDisclosure();
    const nodes = filterProps(props.nodeData) || {hello: 'value'};



    // TODO: Set inn all correct types here in the union statement
    // Or should we just strive to get it all dynamic. Dynamically create the ListItems
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
                        {Object.entries(nodes).map(([key, value]) => {return <DataDrawerDisplayProperty key={key} propKey={key} value={value}></DataDrawerDisplayProperty>})}
                            {/* <ListItem style={listElementStyle}>
                                <Heading size="xs">Name</Heading>
                                {displayProperties?.name}
                            </ListItem>

                            {displayProperties?.alternateName ?
                            <ListItem style={listElementStyle}><Heading size="xs">Alternate Name</Heading>
                                {displayProperties?.alternateName}
                            </ListItem>: null}

                            {displayProperties?.birthDate ?
                            <ListItem style={listElementStyle}><Heading size="xs">Birth Date</Heading>
                                {displayProperties?.birthDate}
                            </ListItem>: null}

                            {displayProperties?.deathDate ?
                            <ListItem style={listElementStyle}><Heading size="xs">Death Date</Heading>
                                {displayProperties?.deathDate}
                            </ListItem>: null}

                            {displayProperties?.birthDateCertainty ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Birth Date Certainty</Heading>
                                {displayProperties?.birthDateCertainty}
                            </ListItem>: null}

                            {displayProperties?.deathDateCertainty ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Death Date Certainty</Heading>
                                {displayProperties?.deathDateCertainty}
                            </ListItem>: null}

                            {displayProperties?.comment ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Comment</Heading>
                                {displayProperties?.comment}
                            </ListItem>: null}

                            {displayProperties?.mentionedInInscription ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Mentioned in Inscription</Heading>
                                {displayProperties?.mentionedInInscription}
                            </ListItem>: null}

                            {displayProperties?.isScribeOf ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Is Scribe of</Heading>
                                {displayProperties?.isScribeOf}
                            </ListItem>: null}

                            {displayProperties?.isMakerOf ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Is Maker of</Heading>
                                {displayProperties?.isMakerOf}
                            </ListItem>: null}

                            {displayProperties?.associatedPlace ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Associated Place</Heading>
                                {displayProperties?.associatedPlace}
                            </ListItem>: null}

                            {displayProperties?.profession ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Profession</Heading>
                                {displayProperties?.profession}
                            </ListItem>: null}

                            {displayProperties?.publishes ?
                            <ListItem style={listElementStyle}>
                                <Heading size="xs">Published</Heading>
                                {displayProperties?.publishes}
                            </ListItem>: null}

                            <ListItem style={listElementStyle}><a href={displayProperties?.link} target='_blank' rel='noopener noreferrer'>See full resource page</a></ListItem> */}
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