import { createRequest } from './getGraphData';


/* interface SearchTerm {
    value: string
} */

enum SearchCategory {
    Action = 'ACTION',
    Place = 'PLACE',
    Person = 'PERSON',
    BookObject = 'BOOKOBJECT'
}

export const searchHandler = async(search: string) => {

    let data: any = '';

    switch (search) {
        case "https://birgitta.test.uib.no/api/resource_templates/14":
            data = await createRequest(search, SearchCategory.Place)
            break;
        case "https://birgitta.test.uib.no/api/resource_templates/21":
            data = await createRequest(search, SearchCategory.Action)
            break;

        default:
            break;
    }

    return data;
}