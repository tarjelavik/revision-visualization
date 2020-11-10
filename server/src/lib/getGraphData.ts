import axios from 'axios';

import SigmaGraph from '../../../model/SigmaGraph';
import { parseToSigmaFormat } from './formatGraphData';
import { constructTemplate, Query } from './query-templates/constructTemplate';



export const createRequest = async(req: string, searchCategory: string): Promise<void | SigmaGraph> => {
    req;
    const query: Query = constructTemplate(searchCategory);
    query.query = query.query.replace(/[\t\n\r]/gm,'');
    const result = await queryData(query, searchCategory);
    return result;
};

export const queryData = async(req: any, searchCategory: string): Promise<SigmaGraph | void> => {
    console.log(req);
    try {
        const sigmaGraph: Promise<SigmaGraph | void> = axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/ld+json'}})
            .then((res) => {return parseToSigmaFormat(res.data, searchCategory);})
            .catch(error => console.log(error));
        return sigmaGraph;
    } catch (Error) {
        console.log(Error);
    }
};