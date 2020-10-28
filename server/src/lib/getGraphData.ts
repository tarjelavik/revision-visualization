import axios from 'axios';
import SigmaGraph from '../../../model/SigmaGraph';
import { parseToSigmaFormat } from './formatGraphData';



export const createRequest = async(req: string, searchCategory: any) => {
    console.log(req)
    /*     const namespaces = {
        'query': `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX schema: <http://schema.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bdm2: <http://purl.org/bdm2>
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        SELECT ?s ?o WHERE {
            ?s ?p <${req}> .

            OPTIONAL { ?s bdm2:hasType/dcterms:title ?bookTitle }
            OPTIONAL { ?s schema:name ?name }
            OPTIONAL { ?s o:title ?resourceTitle }
            BIND(coalesce(?resourceTitle, ?bookTitle, ?name) AS ?o)
        } LIMIT 100`
    }; */

/*     const personsAndBookObjects = {
        'query': `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX schema: <http://schema.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bdm2: <http://purl.org/bdm2>
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        SELECT ?bookObject ?bookObjectId ?action ?actionId ?instigator ?instigatorId ?recipient ?recipientId WHERE {
            ?s ?p <https://birgitta.test.uib.no/api/resource_templates/21> .
            ?s schema:object/o:title ?bookObject .
            ?s schema:object/o:id ?bookObjectId.
            ?s bdm2:hasType/o:title ?action .
            ?s bdm2:hasType/o:id ?actionId .
            ?s schema:creator/o:title ?instigator .
            ?s schema:creator/o:id ?instigatorId .
            ?s schema:recipient/o:id ?recipientId
            OPTIONAL { ?s schema:recipient/o:title ?recipient}
        } LIMIT 100`
    }; */

    const construct = {
        'query': `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX schema: <http://schema.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bdm2: <http://purl.org/bdm2>
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        CONSTRUCT {
            ?s o:bookObjectTitle ?bookObject .
            ?s o:bookObject ?bookObjectId .
            ?s o:actionTitle ?action .
            ?s o:actionId ?actionId .
            ?s o:creatorId ?instigatorId .
            ?s o:creatorName ?instigator .
            ?s o:recipientId ?recipientId .
            ?s o:recipientName ?recipientName .
            ?s o:locationCreated ?locationCreated .
            ?s o:locationCreatedId ?locationCreatedId .
            ?s o:toLocationId ?toLocationId .
            ?s o:toLocation ?toLocation
          }
          WHERE {
            ?s ?p <https://birgitta.test.uib.no/api/resource_templates/21> .
            ?s schema:object/o:title ?bookObject .
            ?s schema:object/o:id ?bookObjectId.
            ?s bdm2:hasType/o:title ?action .
            ?s bdm2:hasType/o:id ?actionId .
            ?s schema:creator/o:title ?instigator .
            ?s schema:creator/o:id ?instigatorId .
            OPTIONAL { ?s schema:recipient/o:title ?recipientName }
            OPTIONAL { ?s schema:recipient/o:id ?recipientId }
            OPTIONAL { ?s schema:locationCreated/o:title ?locationCreated }
            OPTIONAL { ?s schema:locationCreated/o:id ?locationCreatedId }
            OPTIONAL { ?s schema:toLocation/o:title ?toLocation }
            OPTIONAL { ?s schema:toLocation/o:id ?toLocationId }
          }`
    };

   /*  const genericConstruct = {
        'query': `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX schema: <http://schema.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bdm2: <http://purl.org/bdm2>
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        CONSTRUCT {
            ?s o:bookObjectTitle ?bookObject .
            ?s o:bookObject ?bookObjectId .
            ?s o:actionTitle ?action .
            ?s o:actionId ?actionId .
            ?s o:creatorId ?instigatorId .
            ?s o:creatorName ?instigator .
            ?s o:recipientId ?recipientId .
            ?s o:recipientName ?recipientName .
            ?s o:locationCreated ?locationCreated .
            ?s o:locationCreatedId ?locationCreatedId .
            ?s o:toLocationId ?toLocationId .
            ?s o:toLocation ?toLocation
          }
          WHERE {
            ?s ?p <https://birgitta.test.uib.no/api/resource_templates/21> .
            ?s schema:object/o:title ?bookObject .
            ?s schema:object/o:id ?bookObjectId.
            ?s bdm2:hasType/o:title ?action .
            ?s bdm2:hasType/o:id ?actionId .
            ?s schema:creator/o:title ?instigator .
            ?s schema:creator/o:id ?instigatorId .
            OPTIONAL {
              ?s schema:recipient/o:title ?recipientName .
              ?s schema:recipient/o:id ?recipientId .
              ?s schema:locationCreated/o:title ?locationCreated .
              ?s schema:locationCreated/o:id ?locationCreatedId .
              ?s schema:toLocation/o:title ?toLocation .
              ?s schema:toLocation/o:id ?toLocationId
            }
          }`
    }; */


    let searchcat = searchCategory;
    searchcat = 'blabal'
    const result = await queryData(construct, searchcat);
    return result;
};

export const queryData = async(req: Record<string, unknown>, searchCategory: any): Promise<SigmaGraph | void> => {
    try {
        const sigmaGraph: Promise<SigmaGraph | void> = axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/ld+json'}})
            .then((res) => {return parseToSigmaFormat(res.data, searchCategory);})
            .catch(Error => console.log(Error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};