import React from 'react';
import {
    Tag,
    TagLabel,
    TagRightIcon,
    TagCloseButton,
} from "@chakra-ui/react";

const getLabel = (resourceTemplate?: string) => {
    // Do we need to fill out the rest of the icons... Do we have to have them all in our DD?
    switch (resourceTemplate) {
        case 'https://birgitta.test.uib.no/api/resource_templates/13':
            return 'Person';
        case 'https://birgitta.test.uib.no/api/resource_templates/14':
            return 'Place';
        case 'https://birgitta.test.uib.no/api/resource_templates/16':
            return 'Book object';
        case 'https://birgitta.test.uib.no/api/resource_templates/17':
            return 'Institution';
        default:
            return null;
    }
};

// TOdo: this doesn't have any functionality now
const removeClass = (clickedClass: any): void => {
    console.log(clickedClass.target.innerHTML)
}

export default function ResultIcons(props: any) {

    return(
        <>
            <Tag>
                <TagLabel onClick={(e) => removeClass(e)}>{getLabel(props.selected)}
                </TagLabel>
            </Tag>
        </>
    );
}

