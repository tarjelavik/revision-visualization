import React from 'react';

import { Heading } from '@chakra-ui/react';

export default function InfoHeader(props: any) {
    return(
            <Heading letterSpacing="2px" mb="2rem">{props.text}</Heading>
    );
}

