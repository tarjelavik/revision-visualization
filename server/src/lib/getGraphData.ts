import axios from 'axios';
import SigmaGraph from '../../../model/SigmaGraph';
import { parseToSigmaFormat } from './formatGraphData';



export const createRequest = async(req: any) => {
    const namespaces = {
        'query': `
        PREFIX dcterms: <http://purl.org/dc/terms/>
        PREFIX schema: <http://schema.org/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX bdm2: <http://purl.org/bdm2>
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        SELECT ?s ?o WHERE {
            ?s ?p <${req}> .
            ?s bdm2:hasType/dcterms:title ?o
        } LIMIT 100`
    };

    const result = await queryData(namespaces);
    console.log(result);

}


export const queryData = async(req: Record<string, unknown>): Promise<SigmaGraph | void> => {
    
    try {
        const sigmaGraph = axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/sparql-results+json'}})
            .then((res) => {console.log(res.data); return parseToSigmaFormat(res.data);})
            .catch(Error => console.log(Error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};