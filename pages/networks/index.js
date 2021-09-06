import {
  Box,
  Container,
} from '@chakra-ui/layout';
import { Flex, Heading } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HeaderNetworks from '../../components/Layout/HeaderNetworks';
import Link from '../../components/Link';


const Networks = () => {

  return (
    <Layout>
      {/* <HeaderNetworks /> */}
      <Container
        centerContent
        maxW="full"
        m="0"
        pt="2"
        as="header"
        align="center"
        justify="center"
        wrap="wrap"
        borderBottom="solid 2px"
      >
        <Flex>
          <Box p="10">
            <Heading>
              <Link href="/networks/gifts-donations">
                Build your network
              </Link>
            </Heading>
          </Box>
          <Box p="10">
            <Heading>
              <Link href="/networks/works-books">
                Works, books and sections
              </Link>
            </Heading>
          </Box>
        </Flex>
      </Container>

    </Layout>
  );
};

export default Networks;
