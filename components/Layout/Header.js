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
        pt="3"
        pb={4}
        maxW="full"
        bgColor="rgba(255, 204, 0, 0.8)"
      >
        <Heading
          textTransform="uppercase"
          fontSize={['lg', 'xl', '3xl', '3xl']}
          px={{ base: '5', md: '0' }}
        >
          <Link href={`${site}`}>
            <a>Digital Birgitta</a>
          </Link>
        </Heading>
      </Flex>
    </Container>
  );
};

export default Header;
