import React from 'react';
import { Tag, TagRightIcon } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

import { getLabel } from '../../pages/helpers';

const removeClass = (selected: any, props: any): void => {
    props.updateSelectedValues(selected.target.innerHTML, props.dropDownKey);
};

export default function ResultIcons(props: any) {
    return(
        <>
            <Tag mt='10px' mx='5px' variant='solid' bg='#8BBAE0' color='white' onClick={(e) => removeClass(e, props)}>{getLabel(props.selected)}
                <TagRightIcon as={FaTrashAlt} />
            </Tag>
        </>
    );
}

