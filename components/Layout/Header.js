import React from 'react';
import Link from 'next/link';
import {
  Box,
  Wrap,
  WrapItem,
  Flex,
  Heading,
  useDisclosure,
  Container,
} from '@chakra-ui/react';
import ActiveLink from '../Link/ActiveLink';
/* import {CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons'
import { HamburgerIcon } from '@chakra-ui/icons' */

const Header = () => {
  /* const {colorMode, toggleColorMode} = useColorMode() */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const site = process.env.NEXT_PUBLIC_OMEKA_BASE_URL;

  return (
    <Container maxW="full" px="0">
      <Flex
        as="header"
        align="center"
        justify="center"
        wrap="wrap"
        padding={4}
        maxW="full"
        bgColor="rgba(255, 204, 0, 0.8)"
      >
        <Heading
          textTransform="uppercase"
          fontSize={['lg', 'xl', '3xl', '3xl']}
          px={{ base: '5', md: '0' }}
        >
          <Link href="/">
            <a>Digital Birgitta</a>
          </Link>
        </Heading>
      </Flex>

      <Box py="2" bgColor="rgba(200,200,200, 0.5)">
        <Wrap
          pb="2"
          px="8"
          spacing=""
          justify="center"
          alignItems="center"
          fontSize="18px"
        >
          <WrapItem pr="4">
            <ActiveLink href={`${site}`} activeClassName="active">
              <a>Home</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={`${site}booksmss`} activeClassName="active">
              <a>Books & Manuscripts</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={`${site}works`} activeClassName="active">
              <a>Works</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={`${site}people`} activeClassName="active">
              <a>People</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={`${site}places`} activeClassName="active">
              <a>Places</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink
              href={`${site}digital-editions`}
              activeClassName="active"
            >
              <a>Digital editions</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={'/networks'} activeClassName="active">
              <a>Networks</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={'/graph'} activeClassName="active">
              <a>Graph</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={`${site}bibliography`} activeClassName="active">
              <a>Bibliography</a>
            </ActiveLink>
          </WrapItem>
          <WrapItem pr="4">
            <ActiveLink href={`${site}search`} activeClassName="active">
              <a>Search</a>
            </ActiveLink>
          </WrapItem>

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
        </Wrap>
      </Box>
    </Container>
  );
};

export default Header;
