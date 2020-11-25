import React from 'react';
import { Heading, Center } from "@chakra-ui/react"

export default function Header(props: any) {

    return(
        <>
        {!props.isLoading && !props.displayGraph ?
        <Center>
            <Heading mt="2rem">Build your own graph</Heading>
        </Center>
        : null}
        </>
    )
};