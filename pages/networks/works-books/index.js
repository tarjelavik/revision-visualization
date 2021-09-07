import useSWR from 'swr'
import { Graph } from 'react-d3-graph';
import Layout from '../../../components/Layout';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import HeaderNetworks from '../../../components/Layout/HeaderNetworks';

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

const D3Graph = () => {
  const { graph, isLoading, isError } = useWorksNetwork()

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
      links: [
        ...graph.edges.map(link => {
          return {
            source: String(link.source.value),
            target: String(link.target.value)
          }
        })
      ]
    }
  }

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
                data={data}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
              />
            </Box>
          )}
        </Container>
      )}
      <Container maxW="full">

        <Text fontSize="md">
          Data: <a target="_blank" href="http://yasgui.triply.cc/#query=PREFIX%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0APREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20bdm2%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fbdm2%2F%3E%0APREFIX%20o%3A%20%3Chttp%3A%2F%2Fomeka.org%2Fs%2Fvocabs%2Fo%23%3E%0A%0ASELECT%20DISTINCT%20%3Fid%20%3Flabel%20%3Ftype%0AWHERE%20%7B%0A%20%20VALUES%20%3Fclass%20%7Bbdm2%3AWork%20bdm2%3ABookObject%20bdm2%3AWorkItem%20bdm2%3AInstitution%7D%0A%20%20%3Fs%20a%20%3Fclass%20.%0A%20%20%3Fs%20a%20%3Ftype%20.%0A%20%20OPTIONAL%20%7B%20%3Fs%20o%3Atitle%20%3Ftitle%20%7D%0A%20%20%3Fs%20o%3Aid%20%3Fid%20.%0A%20%20BIND(COALESCE(%3Ftitle%2C%20%3Fid)%20AS%20%3Flabel)%0A%20%20FILTER(EXISTS%20%7B%3Fs%20%5Eschema%3Aobject%7Cschema%3Aobject%7C%5Eschema%3AincludesObject%7Cschema%3AincludesObject%7C%5Eschema%3AisPartOf%7Cschema%3AisPartOf%7C%5Eschema%3AcontainedIn%7Cschema%3AcontainedIn%20%3Fo%20.%7D)%0A%20%20FILTER(%3Ftype%20!%3D%20o%3AItem)%0A%7D&endpoint=https%3A%2F%2Fsparql.birgitta.uib.no%2Fbirgitta-revision-test%2Fquery&requestMethod=POST&tabTitle=Query%204&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table">nodes</a>, <a target="_blank" href="http://yasgui.triply.cc/#query=PREFIX%20dcterms%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0APREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20bdm2%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fbdm2%2F%3E%0APREFIX%20o%3A%20%3Chttp%3A%2F%2Fomeka.org%2Fs%2Fvocabs%2Fo%23%3E%0A%0ASELECT%20DISTINCT%20%3Fsource%20%3Ftarget%0AWHERE%20%7B%0A%20%20VALUES%20%3Fclass%20%7Bbdm2%3AWork%20bdm2%3ABookObject%20bdm2%3AWorkItem%20bdm2%3AInstitution%7D%0A%20%20%3Fs%20a%20%3Fclass%20.%0A%20%20%3Fs%20o%3Aid%20%3Ftarget%20.%0A%0A%20%20OPTIONAL%20%7B%20%3Fs%20schema%3Aobject%2Fo%3Aid%20%3Fsource%20%7D%20.%0A%20%20OPTIONAL%20%7B%20%3Fs%20schema%3AincludesObject%2Fo%3Aid%20%3Fsource%20%7D%20.%0A%20%20OPTIONAL%20%7B%20%3Fs%20schema%3AisPartOf%2Fo%3Aid%20%3Fsource%20%7D%20.%0A%20%20OPTIONAL%20%7B%20%3Fs%20schema%3AcontainedIn%2Fo%3Aid%20%3Fsource%20%7D%20.%0A%20%20OPTIONAL%20%7B%20%3Fs%20%5Eschema%3AcontainedIn%2Fo%3Aid%20%3Fsource%20%7D%20.%0A%20%20FILTER(!isBlank(%3Fsource))%0A%7D&endpoint=https%3A%2F%2Fsparql.birgitta.uib.no%2Fbirgitta-revision-test%2Fquery&requestMethod=POST&tabTitle=Query%203&headers=%7B%7D&contentTypeConstruct=application%2Fn-triples%2C*%2F*%3Bq%3D0.9&contentTypeSelect=application%2Fsparql-results%2Bjson%2C*%2F*%3Bq%3D0.9&outputFormat=table">edges</a>
        </Text>

      </Container>
    </Layout>
  )
}

export default D3Graph
