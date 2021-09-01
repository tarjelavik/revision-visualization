import {
  Container,
  Stack,
} from '@chakra-ui/layout';
import Layout from '../../components/Layout';
import Link from '../../components/Link';


const Networks = () => {

  return (
    <Layout>
      <Container
        maxW="full"
        m="0"
        pt="2"
        as="header"
        align="center"
        justify="center"
        wrap="wrap"
        bgColor="gray.100"
        borderColor="gray.600"
        borderBottom="solid 2px"
      >
        <Stack spacing={2} direction="row">
          <Link href="/networks/gifts-donations" fontSize="sm" mr="5" pr="5" borderRight="solid 1px">
            Build your network
          </Link>
          <Link href="/networks/works-books" fontSize="sm" mr="5" pr="5" borderRight="solid 1px">
            Works
          </Link>
          {/* <Link href="/networks/revelations" fontSize="sm" mr="5" pr="5" borderRight="solid 1px">
            Revelations
          </Link> */}
        </Stack>
      </Container>

    </Layout>
  );
};

export default Networks;
