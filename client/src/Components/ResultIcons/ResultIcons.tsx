import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaBook } from 'react-icons/fa';
import { HiLibrary } from 'react-icons/hi';
import { MdPlace } from 'react-icons/md';

const getIcon = (resourceTemplate?: string) => {
    // Do we need to fill out the rest of the icons... Do we have to have them all in our DD?
    switch (resourceTemplate) {
        case 'https://birgitta.test.uib.no/api/resource_templates/13':
            return <BsFillPersonFill size='4em'/>;
        case 'https://birgitta.test.uib.no/api/resource_templates/14':
            return <MdPlace size='4em'/>;
        case 'https://birgitta.test.uib.no/api/resource_templates/16':
            return <FaBook size='4em'/>;
        case 'https://birgitta.test.uib.no/api/resource_templates/17':
            return <HiLibrary size='4em'/>;
        default:
            return null;
    }
};

export default function ResultIcons(props: any) {

    return(
        <div>{getIcon(props.selected)}</div>
    );
}

