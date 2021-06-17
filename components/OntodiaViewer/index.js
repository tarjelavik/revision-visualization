import React from 'react'
import ReactDOM from 'react-dom'
import Ontodia from 'ontodia'
import { Box, Flex, Heading } from '@chakra-ui/layout'

const OntodiaViewer = () => {

/*   let model = Ontodia.getModel();
  
  model.graph.on('action:iriClick', (iri) => {
      window.open(iri);
      console.log(iri);
  });

  model.importLayout({
    validateLinks: true,
    dataProvider: new Ontodia.SparqlDataProvider({
      endpointUrl: 'https://sparql.birgitta.uib.no/birgitta-revision-test',
      imagePropertyUris: [
        'http://muna.xyz/model/0.1/image',
      ],
    }, Ontodia.OWLStatsSettings),
  });

  model.id("ontodia")
 */
  return (
    <Box
      h="100%"
      position="relative"
      bgColor="#eeeeee" 
    >
      <Box h="100%" id="ontodia" />
      <Flex
        h="90vh"  
        justifyContent="center"
        align="center"
      >
        <Heading as='h1' size='xl' textAlign='center'>Ontodia here...</Heading>
      </Flex>
    </Box>
  )
}

export default OntodiaViewer