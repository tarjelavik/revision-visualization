import axios from 'axios'
const jsonld = require('jsonld');
import omit from 'lodash/omit'
import getFrame from '../../lib/getFrame'
import { Box, Container, Heading, OrderedList, ListItem, Text } from '@chakra-ui/layout';
import Layout from '../../components/Layout'
import { Tag } from '@chakra-ui/tag';

const ENDPOINT = process.env.NEXT_PUBLIC_SPARQL_ENDPOINT
const ES_DOMAIN = process.env.NEXT_PUBLIC_ES_DOMAIN
const KEY = process.env.NEXT_PUBLIC_ES_KEY
const APP_ID = process.env.NEXT_PUBLIC_ES_APP_ID

function Book({ book }) {
  return (
    <Layout>
      <Container maxW="3x" p="10">
        <Heading>{book.title || book.shelfmark}</Heading>
        <Tag>{book.type?.[0]}</Tag><Tag>{`ID: ${book['o:id']}`}</Tag>
        <Text>{book.description}</Text>
        <Text>{book.referencesBirgitta === '1' ? 'References Birgitta' : ''}</Text>
        <Text>Production date: {book.productionDate ?? 'Unknown'}</Text>
        <Text>{book.ownedby?.label}</Text>
        <Text>{book.location?.title}</Text>
        <Text>{book.folios}</Text>
        <Text>{book.writingSupport}</Text>
        <Text>{book.leafPageDimensions}</Text>
        {book.composedOf && book.composedOf?.length && (
          <OrderedList>
            {book.composedOf.map((c) => (
              <ListItem>{c.title}</ListItem>
            ))}
          </OrderedList>
        )}
        {book.composedOf && !book.composedOf.length && (
          <OrderedList>
            <ListItem>{book.composedOf.title ?? book.composedOf.shelfmark}</ListItem>
          </OrderedList>
        )}
        {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
      </Container>
    </Layout>
  )
}

function sortBy(array, fn) {
  return array.map(v => [fn(v), v]).sort(([a], [b]) => a - b).map(v => v[1]);
}

function getIdQuery(id) {
  let query = `
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bdm2: <http://purl.org/bdm2/>
    PREFIX o: <http://omeka.org/s/vocabs/o#>
    DESCRIBE ?s ?o WHERE { ?s o:id ${id} . ?s ?p ?o . FILTER(?p != o:resource_class && ?p != o:resource_template && ?p != o:owner ) }
  `
  return query
}

const idQuery = `
  PREFIX bdm2: <http://purl.org/bdm2/>
  PREFIX o: <http://omeka.org/s/vocabs/o#>
  CONSTRUCT {
    ?s o:id ?id
  }
  WHERE {
    VALUES ?class {bdm2:BookObject}
    ?s a ?class ;
      o:id ?id .
  }`

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  const res = await axios.get(`${ENDPOINT}/query?query=${encodeURIComponent(getIdQuery(params.id))}`, { headers: { 'Accept': 'application/ld+json' } })
    //.then((res) => { console.log(JSON.stringify(res.data, null, 2)) })
    .then((res) => { return res.data })
    .catch(error => console.log(error));
  const frame = await getFrame('bdm2:BookObject')
  const proto = {
    ['@graph']: sortBy(res['@graph'].map(i => { const { owner, resource_class, resource_template, ...rest } = i; return rest }), (item) => item['o:id'] == params.id ? 0 : 1),
    ['@context']: frame['@context']
  }
  //const expanded = await jsonld.expand(proto);
  //console.log(expanded)
  const compacted = await jsonld.compact(proto, frame['@context']);
  const framed = jsonld.frame(compacted, frame)
  const book = omit(await framed, ['@context'])

  /* setTimeout(async () => {
    const index = await axios.put(`${ES_DOMAIN}/all/id/${params.id}`, book, { headers: { 'x-api-key': KEY, 'x-api-id': APP_ID, 'Content-Type': 'application/json' } })
      .catch(error => console.log(error));
  }, 300) */

  return {
    props: {
      book,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await axios.get(`${ENDPOINT}/query?query=${encodeURIComponent(idQuery)}`, { headers: { 'Accept': 'application/ld+json' } })
    .then(res => { return res.data })
  const books = await res

  // Get the paths we want to pre-render based on books
  const paths = books['@graph'].map((post) => ({
    params: { id: (post['o:id']).toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}

export default Book