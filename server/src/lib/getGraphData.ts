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

    const personsAndBookObjects = {
        'query': `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX schema: <http://schema.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bdm2: <http://purl.org/bdm2>
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        SELECT ?bookObject ?action ?instigator ?recipient WHERE {
            ?s ?p <https://birgitta.test.uib.no/api/resource_templates/21> .
            ?s schema:object/o:title ?bookObject .
            ?s bdm2:hasType/o:title ?action .
            ?s schema:creator/o:title ?instigator .
            OPTIONAL { ?s schema:recipient/o:title ?recipient}
        } LIMIT 100`
    };


    const result = await queryData(personsAndBookObjects, searchCategory);
    return result;
};

export const queryData = async(req: Record<string, unknown>, searchCategory: any): Promise<SigmaGraph | void> => {

    try {
        const sigmaGraph: Promise<SigmaGraph | void> = axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/sparql-results+json'}})
            .then((res) => {return parseToSigmaFormat(res.data, searchCategory);})
            .catch(Error => console.log(Error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};