import axios from 'axios';
import SigmaGraph from '../../../model/SigmaGraph';
import { parseToSigmaFormat } from './formatGraphData';


export const queryData = async(req: Record<string, unknown>): Promise<SigmaGraph | void> => {
    try {
        const sigmaGraph = axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/sparql-results+json'}})
            .then((res) => {return parseToSigmaFormat(res.data);})
            .catch(Error => console.log(Error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};