import useSWR from 'swr'
import { Graph } from 'react-d3-graph';
import Layout from '../../../components/Layout';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import HeaderNetworks from '../../../components/Layout/HeaderNetworks';

const onClickNode = function (nodeId) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const fetcher = (url) => fetch(url).then((res) => res.json())

function useWorksNetwork() {
  const { data, error } = useSWR('/api/graph/network/works', fetcher)

  return {
    graph: data,
    isLoading: !error && !data,
    isError: error
  }
}

const Works = () => {
  const { graph, isLoading, isError } = useWorksNetwork()

  // the graph configuration, just override the ones you need
  const myConfig = {
    directed: true,
    initialZoom: 0.5,
    height: 800,
    width: 1200,
    nodeHighlightBehavior: true,
    node: {
      labelProperty: 'label',
      size: 120,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
    d3: {
      gravity: -80,
      linkStrength: 0.8,
      alphaTarget: 0.5
    }
  }

  return (
    <Layout>
      <HeaderNetworks />
      {isLoading && (
        <Flex h="80vh" justifyContent="center" align="center">
          <Heading as="p" size="xl">
            Loading data...
          </Heading>
        </Flex>
      )}

      {isError && (
        <Flex h="80vh" justifyContent="center" align="center">
          <Heading as="p" size="xl">
            Error loading data... Please, try to reload the page
          </Heading>
        </Flex>
      )}

      {!isLoading && (
        <Container
          centerContent
          maxW="full"
          overflowX="hidden"
          m="0"
          as="header"
          align="center"
          justify="center"
          wrap="wrap"
          // bgColor="gray.100"
          borderColor="gray.600"
          borderBottom="solid 2px"
        >
          {graph && (
            <Box
              borderColor="blackAlpha.400"
              borderWidth="thin"
              bgColor="rgba(200,200,200, 0.2)"
            >
              <Graph
                id="works-network"
                data={graph}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
              />
            </Box>
          )}
        </Container>
      )}
    </Layout>
  )
}

export default Works
