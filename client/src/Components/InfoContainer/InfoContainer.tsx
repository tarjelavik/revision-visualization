import React from 'react';
import { Box, Flex, Text, Center } from '@chakra-ui/react';
import { Fade } from "@chakra-ui/react"
import { FaHandPointer, FaMap, FaArrowDown, FaBinoculars, FaCameraRetro, FaCamera  } from "react-icons/fa";

import InfoHeader from '../InfoHeader/InfoHeader';

export default function InfoContainer(props: any) {
    return(
        <>
        <Flex mx="5rem" textAlign="center" letterSpacing="1px" Flexwrap="wrap" align='center' justifyContent='space-between' mt="4rem">
            <Box w="30%">
                <InfoHeader text="Select"/>
                <Center mb="1rem">
                    <Fade in={true}>
                        <FaHandPointer size="10%"/>
                    </Fade>
                </Center>
                <Text>
                    Select the classes you'd like to explore relations between. You can narrow your selection by choosing specific values after you have selected one or more classes.
                </Text>
            </Box>
            <Box w="30%">
                <InfoHeader text="Explore"/>
                <Center mb="1rem">
                    <FaMap size="10%"/>
                </Center>
                <Text>
                    When you have created your network, you can rearrange the layout by draging individual nodes. You can explore either nodes or connections by clicking on them.
                </Text>
            </Box>
            <Box w="30%">
                <InfoHeader text="Export"/>
                <Center mb="1rem">
                    <FaCameraRetro size="10%"/>
                </Center>
                <Text>
                    When you have created an interesting network, you can export it as PDF or JPG by clicking the 'export' button.
                </Text>
            </Box>
        </Flex>
        </>
    );
}

