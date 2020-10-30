import React, { CSSProperties } from 'react';

interface DisplayData {
    type: string,
    name: string,
    link: string
}

const displayBoxStyle = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    backgroundColor: "#f8fdfe",
    width: "20vw",
    position: "relative" as "relative",
    zIndex: 1
}

const listStyle = {
    listStyleType: "none"
}

const listElementStyle = {
    marginBottom: "1rem"
}

const getDisplayType = (dataType: string) => {
    switch (dataType) {
        case 'bdm2:Institution':
            return 'Institution'
        case 'bdm2:BookObject':
            return 'Book object'
        case 'bdm2:Person':
            return 'Person'
        default:
            return ''
    }
}

const getDisplayProperties = (nodeData: any) => {
    if (!nodeData) return null;
    const displayData: DisplayData = {
        type: '',
        name: '',
        link: 'https://birgitta.test.uib.no/s/birgitta/item/'
    }

    try {
        displayData.name = nodeData['o:title'];
        displayData.type = getDisplayType(nodeData['@type'][1]);
        displayData.link = displayData.link+nodeData['o:id']
    } catch (error) {

    }
    return displayData;
}

const dataBox = (props: any) => {
    const displayProperties = getDisplayProperties(props.nodeData);
    return (
        <div style={displayBoxStyle}>
            {props.nodeData ?
            <ul style={listStyle}>
                <li style={listElementStyle}>{displayProperties?.name}</li>
                <li style={listElementStyle}>{displayProperties?.type}</li>
                <li style={listElementStyle}><a href={displayProperties?.link} target="_blank" rel="noopener noreferrer">See full resource page</a></li>
            </ul>
            : <div></div>}
        </div>
    );
}

export default dataBox;