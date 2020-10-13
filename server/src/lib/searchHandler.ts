import { createRequest } from './getGraphData';


interface SearchTerm {
    value: string
}

export const searchHandler = async(search: SearchTerm) => {
    switch (search.value) {
        case "https://birgitta.test.uib.no/api/resource_templates/14":
            createRequest(search.value)
            break;
        case "https://birgitta.test.uib.no/api/resource_templates/21":
            createRequest(search.value)
            break;
    
        default:
            break;
    }
    
    return search;
}