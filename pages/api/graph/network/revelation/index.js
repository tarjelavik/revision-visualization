import axios from 'axios';

const ENDPOINT = process.env.NEXT_PUBLIC_SPARQL_ENDPOINT

const nodesQuery = `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX schema: <http://schema.org/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX bdm2: <http://purl.org/bdm2/>
  PREFIX o: <http://omeka.org/s/vocabs/o#>

  SELECT DISTINCT ?id ?label ?type
  WHERE {
    VALUES ?class {bdm2:Work bdm2:BookObject bdm2:WorkItem bdm2:Institution}
    ?s a ?class .
    ?s a ?type .
    OPTIONAL { ?s o:title ?title }
    ?s o:id ?id .
    BIND(COALESCE(?title, ?id) AS ?label)
    FILTER(EXISTS {?s ^schema:object|schema:object|^schema:includesObject|schema:includesObject|^schema:isPartOf|schema:isPartOf|^schema:containedIn|schema:containedIn ?o .})
    FILTER(?type != o:Item)
  }
`

const linksQuery = `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX schema: <http://schema.org/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX bdm2: <http://purl.org/bdm2/>
  PREFIX o: <http://omeka.org/s/vocabs/o#>

  SELECT DISTINCT ?source ?target
  WHERE {
    VALUES ?revelation { <https://birgitta.uib.no/api/items/224> }
    VALUES ?class {bdm2:Work bdm2:BookObject bdm2:WorkItem bdm2:Institution}
    ?revelation a ?class .
    ?revelation o:id ?target .
    OPTIONAL { ?x ?p ?revelation . ?x o:id ?source } .
    OPTIONAL { 
      ?revelation ^schema:containedIn ?sourceURI . 
      ?sourceURI o:id ?source .
    } .
    FILTER(!isBlank(?source))
  }
`


const getShape = (type) => {
  switch (type) {
    case 'birgitta':
      return {
        svg: '/icons/birgitta.png', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 650
      }
      break;
    case 'http://purl.org/bdm2/Work':
      return {
        svg: '/icons/idea.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 250
      }
      break;
    case 'http://purl.org/bdm2/WorkItem':
      return {
        svg: '/icons/open-book.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 250
      }
      break;
    case 'http://purl.org/bdm2/BookObject':
      return {
        svg: '/icons/closed-book.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 250
      }
      break;
    case 'http://purl.org/bdm2/Institution':
      return {
        svg: '/icons/library.svg', // <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        size: 250
      }
      break;
    default:
      return {
        svg: 'circle',
        size: 250
      }
  }
}

/**
 * Query the SPARQL endpoint for data
 * 
 * @param {*} req 
 * @param {*} res 
 */

export default async function handler(req, res) {
  const {
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const nodes = await axios.get(`${ENDPOINT}/query?query=${encodeURIComponent(nodesQuery)}`, { headers: { 'Accept': 'application/json' } })
          // .then((res) => { console.log(JSON.stringify(res.data, null, 2)) })
          .then((res) => { return res.data })
          .catch(error => console.log(error));

        const links = await axios.get(`${ENDPOINT}/query?query=${encodeURIComponent(linksQuery)}`, { headers: { 'Accept': 'application/json' } })
          // .then((res) => { console.log(JSON.stringify(res.data, null, 2)) })
          .then((res) => { return res.data })
          .catch(error => console.log(error));

        const data = {
          nodes: [
            ...nodes.results.bindings.map(node => {
              return {
                id: String(node.id.value),
                label: node.label.value,
                ...getShape(node.id.value === '224' ? 'birgitta' : node.type.value),
              }
            })
          ],
          links: [
            ...links.results.bindings.map(link => {
              return {
                source: String(link.source.value),
                target: String(link.target.value)
              }
            })
          ]
        }

        // console.log(data)

        res.status(200).json(data)
      } catch (error) {
        res.status(400).json(error);
      }

      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
