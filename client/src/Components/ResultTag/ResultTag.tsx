import React from 'react';
import { Tag } from "@chakra-ui/react";
import { getLabel } from '../../helpers';

const removeClass = (selected: any, props: any): void => {
    props.updateSelectedValues(selected.target.innerHTML, props.dropDownKey);
}

export default function ResultIcons(props: any) {
    return(
        <>
            <Tag mt="10px" mx="5px" variant="solid" bg="#8BBAE0" color="white" onClick={(e) => removeClass(e, props)}>{getLabel(props.selected)}</Tag>
        </>
    );
}

