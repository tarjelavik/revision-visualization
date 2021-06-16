import React from 'react'
import Link from 'next/link'
import {Box, Stack, Flex, Heading, useDisclosure} from '@chakra-ui/react'
import ActiveLink from '../Link/ActiveLink'
/* import {CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import { HamburgerIcon } from '@chakra-ui/icons' */

export default function Header() {
    /* const {colorMode, toggleColorMode} = useColorMode() */
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    const site = process.env.NEXT_PUBLIC_OMEKA_BASE_URL

  return (
    <Box 
      w="full"
    >
      <Flex
        as="header"
        align="center"
        justify="center"
        wrap="wrap"
        padding={4}
        w="full"
        bgColor="#ffcc00"
      >
        <Heading 
          fontSize={["lg", "xl", "3xl", "3xl"]} 
          px={{base: "5", md: "0"}}
        >
          <Link href="/">
            <a>Digital Birgitta</a>
          </Link>
        </Heading>
      </Flex>

      <Flex
        as="nav"
        align="center"
        wrap="wrap"
        padding={4}
        w="full"
        bgColor="gray.300"
      >
        <Stack
          justify="center"
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <ActiveLink href={`${site}`} activeClassName="active">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href={`${site}`} activeClassName="active">
            <a>Books & Manuscripts</a>
          </ActiveLink>
          <ActiveLink href={`${site}works`} activeClassName="active">
            <a>Works</a>
          </ActiveLink>
          <ActiveLink href={`${site}people`} activeClassName="active">
            <a>People</a>
          </ActiveLink>
          <ActiveLink href={`${site}places`} activeClassName="active">
            <a>Places</a>
          </ActiveLink>
          <ActiveLink href={`${site}digital-editions`} activeClassName="active">
            <a>Digital editions</a>
          </ActiveLink>
          <ActiveLink href={`/networks`} activeClassName="active">
            <a>Networks</a>
          </ActiveLink>
          <ActiveLink href={`/graph`} activeClassName="active">
            <a>Graph</a>
          </ActiveLink>
          <ActiveLink href={`${site}bibliography`} activeClassName="active">
            <a>Bibliography</a>
          </ActiveLink>
          <ActiveLink href={`${site}search`} activeClassName="active">
            <a>Search</a>
          </ActiveLink>

          {/* <Button 
            display={{base: 'none', md:'inherit'}}
            mt="2"
            p="0" 
            h="5" 
            w="1" 
            onClick={toggleColorMode}
          >
            {colorMode === 'light' ? <MoonIcon w={3} h={3} /> : <SunIcon w={3} h={3} />}
          </Button> */}
        </Stack>
      </Flex>
    </Box>
  )
}
