import React from 'react';
import { Heading, Center } from "@chakra-ui/react"

export default function Header(props: any) {

    return(
        <>
        {!props.isLoading && !props.displayGraph ?
        <Center>
            <Heading color="#4D7494" mt="2rem">Build your own networks</Heading>
        </Center>
        : null}
        </>
    )
};