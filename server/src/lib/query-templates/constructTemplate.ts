import { getConstructLocationClause, getWhereLocationClause } from './locationTemplate';
import { getConstructInstigatorClause, getWhereInstigatorClause } from './instigatorTemplate';

export const createConstructClause = (searchCategory: string):string => {
    let construct = '';
    let searchCategories: string[] = [];

    if (!searchCategory.includes(',')) {
        searchCategories.push(searchCategory);
    } else {
        searchCategories = searchCategory.split(',');
    }

    searchCategories.forEach(category => {
        switch (category) {
            case 'https://birgitta.test.uib.no/api/resource_templates/17':
                construct = construct.concat(getConstructLocationClause());
                break;
            case 'https://birgitta.test.uib.no/api/resource_templates/13':
                construct = construct.concat(getConstructInstigatorClause());
                break;
            default:
                construct = '';
                break;
        }
    });
    return construct;
};

export const createWhereClause = (searchCategory: string):string => {
    let whereClause = '';
    let searchCategories: string[] = [];

    if (!searchCategory.includes(',')) {
        searchCategories.push(searchCategory);
    } else {
        searchCategories = searchCategory.split(',');
    }

    searchCategories.forEach(category => {
        switch (category) {
            case 'https://birgitta.test.uib.no/api/resource_templates/17':
                whereClause = whereClause.concat(getWhereLocationClause());
                break;
            case 'https://birgitta.test.uib.no/api/resource_templates/13':
                whereClause = whereClause.concat(getWhereInstigatorClause());
                break;
            default:
                whereClause = '';
                break;
        }
    });
    return whereClause;
};

export interface Query {
    query: string;
}

export const constructTemplate = (searchParameter: string): Query => {
    const query: Query = {query:`
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX schema: <http://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bdm2: <http://purl.org/bdm2>
    PREFIX o: <http://omeka.org/s/vocabs/o#>
    CONSTRUCT {
        ?s o:actionTitle ?action .
        ?s o:actionId ?actionId .
		${createConstructClause(searchParameter)}
      }
      WHERE {
        ?s ?p <https://birgitta.test.uib.no/api/resource_templates/21> .
        ?s bdm2:hasType/o:title ?action .
        ?s bdm2:hasType/o:id ?actionId .
        ${createWhereClause(searchParameter)}
      }`
    };
    return query;
};


