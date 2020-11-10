import SigmaGraph from '../../../model/SigmaGraph';
import { createRequest } from './getGraphData';


/* interface SearchTerm {
    value: string
} */


export enum SearchCategory {
    Action = 'ACTION',
    Place = 'PLACE',
    Person = 'PERSON',
    BookObject = 'BOOKOBJECT',
    Work = 'WORK',
    WorkItem = 'WORKITEM',
    LocationInTime = 'LOCATIONINTIME',
    Institutions = 'INSTITUTIONS',
    NonBookObject = 'NONBOOKOBJECT',
    DataSources = 'DATASOURCES',
}


export const searchHandler = async(search: string): Promise<void | SigmaGraph> => {

    let data: void | SigmaGraph;

    switch (search) {
        case 'https://birgitta.test.uib.no/api/resource_templates/13':
            data = await createRequest(search, 'Person');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/14':
            data = await createRequest(search, 'Place');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/15':
            data = await createRequest(search, 'LocationInTime');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/16':
            data = await createRequest(search, 'BookObject');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/17':
            data = await createRequest(search, 'Institution');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/18':
            data = await createRequest(search, 'WorkItem');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/19':
            data = await createRequest(search, 'Work');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/20':
            data = await createRequest(search, 'NonBookObject');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/21':
            data = await createRequest(search, 'Action');
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/22':
            data = await createRequest(search, 'DataSources');
            break;
        default:
            return null;
    }
    return data;
};