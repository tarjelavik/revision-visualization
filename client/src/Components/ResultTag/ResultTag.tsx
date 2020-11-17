import React from 'react';

const getLabel = (resourceTemplate?: string) => {
    // Do we need to fill out the rest of the labels... Do we have to have them all in our DD?
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

const tagStyle = {
    border: '1px solid',
    borderRadius: '50px',
    margin: '5px 10px'
}


const removeClass = (selected: any, props: any): void => {
    props.updateSelectedValues(selected.target.innerHTML, props.dropDownKey);
}

export default function ResultIcons(props: any) {
    return(
        <>
            <span style={tagStyle} onClick={(e) => removeClass(e, props)}>{getLabel(props.selected)}</span>
        </>
    );
}

