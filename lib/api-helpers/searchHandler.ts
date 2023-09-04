import SigmaGraph from '../../model/SigmaGraph';
import { createRequest } from './getGraphData';

// TODO: This function is superfluous. Can be deleted?
export const searchHandler = async (search: string): Promise<void | SigmaGraph> => {
    // let data: void | SigmaGraph;

    // console.log('2: SearchHandler: ', search);
    const data: void | SigmaGraph = await createRequest(search);

    // console.log('2.1: Data from searchhandler->creatrequest: ', data);
    return data;
};