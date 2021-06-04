import React from 'react';
import { Heading, Center } from "@chakra-ui/react"

interface HeaderProps {
    isLoading: boolean,
    displayGraph: boolean
}

export default function Header(props: HeaderProps) {

    return(
        <>
        {!props.isLoading && !props.displayGraph ?
        <Center>
            <Heading size="2xl" color="#4D7494" mt="2rem">Build your own networks</Heading>
        </Center>
        : null}
        </>
    )
};