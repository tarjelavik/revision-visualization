import React from 'react';

import { Heading } from '@chakra-ui/react';

export default function InfoHeader(props: any) {
    return(
            <Heading mb="2rem">{props.text}</Heading>
    );
}

