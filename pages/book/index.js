import axios from 'axios'
const jsonld = require('jsonld');
import omit from 'lodash/omit'
import getFrame from '../../lib/getFrame'
import { Box, Container, Flex, HStack, Heading, Tag, Text } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Link from '../../components/Link';

const ENDPOINT = process.env.NEXT_PUBLIC_SPARQL_ENDPOINT

export default function Books({ books }) {
  return (
    <Layout>
      <Container maxW="3x" p="10">
        <Heading>Books - {books.length}</Heading>
        {books && books.map(book => (
          <Box
            key={book['o:id']}
            p="3"
            my="3"
            borderColor="black"
            borderWidth="1px"
            borderRadius="sm"
            boxShadow="sm"

          >
            <Heading as="h2"><Link href={`/book/${book['o:id']}`}>{book.omeka_title}</Link></Heading>
            <Text>{book.title}</Text>
            <Text>
              {/* <Link href={`/book/${book.ownedBy['o:id']}`}> */}
              Owner: {book.ownedBy?.omeka_title}
              {/* </Link> */}
            </Text>
            <Flex borderTop="dashed 1px" borderColor="black" pt="2">
              <HStack spacing={4} mb="2" mr="2">
                {book.composedOf && (
                  <Tag>
                    {Array.isArray(book.composedOf) ? `${book.composedOf.length} sections` : '1 section'}
                  </Tag>
                )}
              </HStack>
            </Flex>
          </Box>
        ))}
      </Container>
    </Layout>
  )
}

const getBooks = `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX bdm2: <http://purl.org/bdm2/>
  PREFIX o: <http://omeka.org/s/vocabs/o#>
  DESCRIBE ?s ?ow WHERE { ?s a bdm2:BookObject ; bdm2:ownedBy ?ow .} LIMIT 10
`

export async function getStaticProps() {
  const res = await axios.get(`${ENDPOINT}/query?query=${encodeURIComponent(getBooks)}`, { headers: { 'Accept': 'application/ld+json' } })
    //.then((res) => { console.log(JSON.stringify(res.data, null, 2)) })
    .then((res) => { return res.data })
    .catch(error => console.log(error));
  const frame = await getFrame('bdm2:BookObject')
  const data = await res
  console.log(JSON.stringify(data, null, 2))
  const proto = {
    ['@graph']: data['@graph'],
    ['@context']: frame['@context']
  }
  //const expanded = await jsonld.expand(proto);
  //const compacted = await jsonld.compact(proto, frame['@context']);
  const framed = jsonld.frame(proto, frame)
  const books = await framed

  return {
    props: {
      books: books['@graph']
    }
  }
}
