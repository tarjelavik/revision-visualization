import axios from 'axios';
import SigmaGraph from '../../../model/SigmaGraph';
import { parseToSigmaFormat } from './formatGraphData';
import { constructTemplate, Query } from './query-templates/constructTemplate';

const endpoint = process.env.NEXT_PUBLIC_SPARQL_ENDPOINT

export const createRequest = async(req: any): Promise<void | SigmaGraph> => {
    // console.log('3: input to createRequest: ', req);
    const query: Query = constructTemplate(req);
    query.query = query.query.replace(/[\t\n\r]/gm,'');
    const result = await queryData(query);
    return result;
};

export const queryData = async(req: any): Promise<SigmaGraph | void> => {
    // console.log(req)
    try {
        const sigmaGraph: Promise<SigmaGraph | void> = axios.get(endpoint, { params: req, headers: {'Accept': 'application/ld+json'}})
            .then((res) => {return parseToSigmaFormat(res.data);})
            .catch(error => console.log(error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};