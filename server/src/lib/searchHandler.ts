import SigmaGraph from '../../../model/SigmaGraph';
import { createRequest } from './getGraphData';

// TODO: This function is superfluous. Can be deleted?
export const searchHandler = async(search: string): Promise<void | SigmaGraph> => {
    let data: void | SigmaGraph;
    data = await createRequest(search);
    return data;
};