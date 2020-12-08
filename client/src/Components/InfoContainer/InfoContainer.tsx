import React from 'react';
import { Box, Flex, Text, Center, Divider } from '@chakra-ui/react';
import { FaHandPointer, FaMap, FaCameraRetro  } from "react-icons/fa";

import InfoHeader from '../InfoHeader/InfoHeader';

export default function InfoContainer(props: any) {
    return(
        <>
        {!props.isLoading && !props.displayGraph ?
        <Flex mx="5rem" textAlign="center" letterSpacing="1px" align='center' justifyContent='space-between' mt="8rem">
            <Box w="30%" color="#4D7494">
                <InfoHeader text="Select"/>
                <Center mb="1rem">
                    <FaHandPointer color="#8BBAE0" size="10%"/>
                </Center>
                <Text>
                    Select the classes you'd like to explore relations between. You can narrow your selection by choosing specific values after you have selected one or more classes
                </Text>
                <Center>
                    <Divider borderColor="black" mt="2rem" w="30%"/>
                </Center>
            </Box>
            <Box w="30%" color="#4D7494">
                <InfoHeader text="Explore"/>
                <Center mb="1rem">
                    <FaMap color="#8BBAE0" size="10%"/>
                </Center>
                <Text>
                    When you have created your network, you can rearrange the layout by draging individual nodes. You can explore either nodes or connections by clicking on them
                </Text>
                <Center>
                    <Divider borderColor="black" mt="2rem" w="30%"/>
                </Center>
            </Box>
            <Box w="30%" color="#4D7494">
                <InfoHeader text="Export"/>
                <Center mb="1rem">
                    <FaCameraRetro color="#8BBAE0" size="10%"/>
                </Center>
                <Text>
                    When you have created an interesting network, you can export it as PDF or JPG by clicking the 'export' button
                </Text>
                <Center>
                    <Divider borderColor="black" mt="2rem" w="30%"/>
                </Center>
            </Box>
        </Flex>
        : null}
        </>
    );
}

