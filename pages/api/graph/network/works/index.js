import axios from 'axios';

const ENDPOINT = process.env.NEXT_PUBLIC_SPARQL_ENDPOINT

const nodesQuery = `
  PREFIX dcterms: <http://purl.org/dc/terms/>
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
    FILTER(EXISTS {?s ^bdm2:object|bdm2:object|^bdm2:composedOf|bdm2:composedOf|^bdm2:formsPartOf|bdm2:formsPartOf|^bdm2:carriesWork|bdm2:carriesWork ?o .})
    FILTER(?type != o:Item)
  }
`

const linksQuery = `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX bdm2: <http://purl.org/bdm2/>
  PREFIX o: <http://omeka.org/s/vocabs/o#>

  SELECT DISTINCT ?source ?target
  WHERE {
    VALUES ?class {bdm2:Work bdm2:BookObject bdm2:WorkItem bdm2:Institution}
    ?s a ?class .
    ?s o:id ?target .
    
    OPTIONAL { ?s bdm2:object/o:id ?source } .
    OPTIONAL { ?s bdm2:composedOf/o:id ?source } .
    OPTIONAL { ?s bdm2:formsPartOf/o:id ?source } .
    OPTIONAL { ?s bdm2:carriesWork/o:id ?source } .
    OPTIONAL { ?s ^bdm2:carriesWork/o:id ?source } .
    FILTER(!isBlank(?source))
  }
`

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

        const edges = await axios.get(`${ENDPOINT}/query?query=${encodeURIComponent(linksQuery)}`, { headers: { 'Accept': 'application/json' } })
          // .then((res) => { console.log(JSON.stringify(res.data, null, 2)) })
          .then((res) => { return res.data })
          .catch(error => console.log(error));



        const data = {
          nodes: [
            ...nodes.results.bindings
          ],
          edges: [
            ...edges.results.bindings
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
