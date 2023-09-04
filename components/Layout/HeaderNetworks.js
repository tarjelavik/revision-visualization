import React from 'react';
import {
  Box,
  Wrap,
  WrapItem,
  Container,
} from '@chakra-ui/react';
import ActiveLink from '../Link/ActiveLink';

const HeaderNetworks = () => {
  return (
    <Container maxW="full" px="0">
      <Box py="2" bgColor="rgba(200,200,200, 0.2)">
        <Wrap
          pb="1"
          px="8"
          spacing="4"
          justify="center"
          alignItems="center"
          fontSize="16px"
        >
          {/* <WrapItem pr="4">
            <ActiveLink href={'/networks/gifts-donations'} activeClassName="active">
              <a>Build your network</a>
            </ActiveLink>
          </WrapItem> */}
          <WrapItem pr="4">
            <ActiveLink href={'/networks/works-books'} activeClassName="active">
              <a>Works</a>
            </ActiveLink>
          </WrapItem>
        </Wrap>
      </Box>
    </Container>
  );
};

export default HeaderNetworks;
