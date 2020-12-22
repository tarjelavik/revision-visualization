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

const drawerIllustration = <IllustrationContainer src='book_lover.svg' alt="No results" heigth="600px" width="600px"/>;

// Todo: Refactor this interface out to somewhere else
interface DisplayData {
    type: string;
    name: string;
    alternateName?: string;
    birthDate?: string;
    deathDate?: string;
    birthDateCertainty?: boolean;
    deathDateCertainty?: boolean;
    comment?: string;
    mentionedInInscription?: string;
    isScribeOf?: string;
    isMakerOf?: string;
    associatedPlace?: string;
    profession?: string;
    publishes?: string;
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

// Todo: Refactor this out to a helper function or something
const getDisplayProperties = (nodeData: any) => {
    if (!nodeData) return null;
    const displayData: DisplayData = {
        type: '',
        name: '',
        alternateName: '',
        birthDate: '',
        deathDate: '',
        birthDateCertainty: false,
        deathDateCertainty: false,
        comment: '',
        mentionedInInscription: '',
        isScribeOf: '',
        isMakerOf: '',
        associatedPlace: '',
        profession: '',
        publishes: '',
        link: 'https://birgitta.test.uib.no/s/birgitta/item/'


    };

    try {
        displayData.type = getDisplayType(nodeData['@type'][1]);
        displayData.name = nodeData['o:title'] || 'null';
        displayData.alternateName = nodeData['schema:alternateName']?.[0]['@value'];
        displayData.birthDate = nodeData['schema:birthDate']?.[0]['@value'];
        displayData.deathDate = nodeData['schema:deathDate']?.[0]['@value'];
        displayData.birthDateCertainty = nodeData['bdm2:birthDateCertainty']?.[0]['@value'];
        displayData.deathDateCertainty = nodeData['bdm2:deathDateCertainty']?.[0]['@value'];
        displayData.comment = nodeData['schema:comment']?.[0]['@value'];
        displayData.mentionedInInscription = nodeData['bdm2:mention']?.[0]['@value'];
        displayData.isScribeOf = nodeData['bdm2:scribe']?.[0]['@value'];
        displayData.isMakerOf = nodeData['bdm2:made']?.[0]['@value'];
        displayData.associatedPlace = nodeData['schema:location']?.[0]['display_title'];
        displayData.profession = nodeData['schema:occupationalCategory']?.[0]['@value'];
        displayData.publishes = nodeData['bdm2:publication']?.[0]['@value'];
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
                            <ListItem style={listElementStyle}>
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

                            <ListItem style={listElementStyle}><a href={displayProperties?.link} target='_blank' rel='noopener noreferrer'>See full resource page</a></ListItem>
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