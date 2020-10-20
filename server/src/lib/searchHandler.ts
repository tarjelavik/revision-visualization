import SigmaGraph from '../../../model/SigmaGraph';
import { createRequest } from './getGraphData';


/* interface SearchTerm {
    value: string
} */


export const searchHandler = async(search: string) => {

    enum SearchCategory {
        Action = 'ACTION',
        Place = 'PLACE',
        Person = 'PERSON',
        BookObject = 'BOOKOBJECT',
        Work = 'WORK',
        WorkItem = 'WORKITEM',
        LocationInTime = 'LOCATIONINTIME',
        Institutions = 'INSTITUTIONS',
        NonBookObject = 'NONBOOKOBJECT',
        DataSources = 'DATASOURCES'
    }
    let data: void | SigmaGraph;

    switch (search) {
        case 'https://birgitta.test.uib.no/api/resource_templates/13':
            data = await createRequest(search, SearchCategory.Person);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/14':
            data = await createRequest(search, SearchCategory.Place);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/15':
            data = await createRequest(search, SearchCategory.LocationInTime);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/16':
            data = await createRequest(search, SearchCategory.BookObject);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/17':
            data = await createRequest(search, SearchCategory.Institutions);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/18':
            data = await createRequest(search, SearchCategory.WorkItem);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/19':
            data = await createRequest(search, SearchCategory.Work);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/20':
            data = await createRequest(search, SearchCategory.NonBookObject);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/21':
            data = await createRequest(search, SearchCategory.Action);
            break;
        case 'https://birgitta.test.uib.no/api/resource_templates/22':
            data = await createRequest(search, SearchCategory.DataSources);
            break;

        default:
            break;
    }

    return data;
};