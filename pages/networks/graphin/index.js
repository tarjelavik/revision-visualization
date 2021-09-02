import useSWR from 'swr'
// import Graphin, { Behaviors, Utils } from '@antv/graphin';

import Layout from '../../../components/Layout';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import HeaderNetworks from '../../../components/Layout/HeaderNetworks';

// const { ZoomCanvas, FitView } = Behaviors;

const onClickNode = function (nodeId) {
  window.alert(`Clicked node ${nodeId}`);
};

const onClickLink = function (source, target) {
  window.alert(`Clicked link between ${source} and ${target}`);
};

const getShape = (type) => {
  switch (type) {
    case 'birgitta':
      return {
        svg: '/icons/birgitta.png', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 350
      }
      break;
    case 'http://purl.org/bdm2/Work':
      return {
        svg: '/icons/idea.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 200
      }
      break;
    case 'http://purl.org/bdm2/WorkItem':
      return {
        svg: '/icons/open-book.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 200
      }
      break;
    case 'http://purl.org/bdm2/BookObject':
      return {
        svg: '/icons/closed-book.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 200
      }
      break;
    case 'http://purl.org/bdm2/Institution':
      return {
        svg: '/icons/library.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 200
      }
      break;
    default:
      return {
        svg: 'circle',
        size: 200
      }
  }
}

const truncate = (fullStr, strLen, separator) => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || ' ... ';

  const sepLen = separator.length;
  const charsToShow = strLen - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars);
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

  console.log(graph)

  let data = {}

  if (graph) {
    data = {
      nodes: [
        ...graph.nodes.map(node => {
          return {
            id: String(node.id.value),
            label: truncate(node.label.value, 52),
            ...getShape(node.id.value === '224' ? 'birgitta' : node.type.value),
          }
        })
      ],
      edges: [
        ...graph.edges.map(link => {
          return {
            source: String(link.source.value),
            target: String(link.target.value)
          }
        })
      ]
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
              {/* <Graphin data={data} layout={{ type: 'dagre' }}>
                <ZoomCanvas disabled />
                <FitView />
              </Graphin> */}
            </Box>
          )}
        </Container>
      )}
    </Layout>
  )
}

export default Works
