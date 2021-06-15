import React from 'react'
import Link from 'next/link'
import {Box, Button, Drawer, Container, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, DrawerCloseButton, Flex, Image, List, ListItem, Heading, Text, Icon, useDisclosure, useColorMode, useColorModeValue, VStack, Center, Spacer, DrawerFooter, Tag, Avatar, TagLabel, HStack} from '@chakra-ui/react'
import {CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import ActiveLink from '../Link/ActiveLink'
import { HamburgerIcon } from '@chakra-ui/icons'


export default function Header(props) {
  if(!props) {
    return null
  }
  
  const {colorMode, toggleColorMode} = useColorMode()
  const color = useColorModeValue('black', 'white')
  const bgcolor = useColorModeValue('white', 'black')
  const inverse = useColorModeValue('invert(0%)', 'invert(100%)')

  return (
      <Flex
        as="header"
        w="full"
      >
        <Heading 
          fontSize={["lg", "xl", "3xl", "3xl"]} 
          px={{base: "5", md: "0"}}
        >
          <Link href="/">
            <a>Birgitta</a>
          </Link>
        </Heading>
        
        <Flex 
          as="nav"
        >
          <List spacing="1" fontSize={["md", "md", "lg", "lg"]}>
            <ListItem>
              <ActiveLink href={`/network`} activeClassName="active">
                <a>Network</a>
              </ActiveLink>
            </ListItem>
          </List>

          <Button 
            display={{base: 'none', md:'inherit'}}
            mt="2"
            p="0" 
            h="5" 
            w="1" 
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <MoonIcon w={3} h={3} /> : <SunIcon w={3} h={3} />}
          </Button>

        </Flex>
      </Flex>
  )
}
