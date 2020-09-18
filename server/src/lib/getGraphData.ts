import axios from 'axios';
import { parseToSigmaFormat } from './formatGraphData';


export const queryData = async(req: object) => {
    try {
        return axios.get('https://sparql.birgitta.uib.no/birgitta-revision-test', { params: req, headers: {'Accept': 'application/sparql-results+json'}})
        .then((res) => {return parseToSigmaFormat(res.data);})
        .catch(Error => console.log(Error));
    } catch (error) {
        return error;
    }
};