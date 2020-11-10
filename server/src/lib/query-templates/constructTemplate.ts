import { getConstructLocationClause, getWhereLocationClause } from './locationTemplate';

export const createConstructClause = (searchCategory: string):string => {
    let construct = '';
    switch (searchCategory) {
        case 'Institution':
            construct = getConstructLocationClause();
            break;
        default:
            construct = '';
            break;
    }
    return construct;
};

export const createWhereClause = (searchCategory: string):string => {
    let whereClause = '';
    switch (searchCategory) {
        case 'Institution':
            whereClause = getWhereLocationClause();
            break;
        default:
            whereClause = '';
            break;
    }
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
        ?s schema:locationCreated/o:title ?locationCreated .
        ?s schema:locationCreated/o:id ?locationCreatedId .
        OPTIONAL {?s schema:toLocation/o:title ?toLocation } .
        OPTIONAL {?s schema:toLocation/o:id ?toLocationId }
      }`
    };
    return query;
};


