import axios from 'axios';
import SigmaGraph from '../../../model/SigmaGraph';
import { parseToSigmaFormat } from './formatGraphData';

const namespaces = {
    'query': `
    PREFIX schema: <http://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bdm2: <http://purl.org/bdm2>
    PREFIX o: <http://omeka.org/s/vocabs/o#>
    SELECT `
};


// TODO: Query must be proper built. One suggestion is to populate the variables array with selected variables, or just SPO?
const variables = ['?personName', '?personId', '?associatedPlaceName', '?associatedPlaceId'];
console.log(variables);

export const queryData = async(req: Record<string, unknown>): Promise<SigmaGraph | void> => {
    console.log(JSON.stringify(namespaces.query) + '?person');
    try {
        const sigmaGraph = axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/sparql-results+json'}})
            .then((res) => {return parseToSigmaFormat(res.data);})
            .catch(Error => console.log(Error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};