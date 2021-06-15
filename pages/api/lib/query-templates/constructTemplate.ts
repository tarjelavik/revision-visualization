import { getConstructLocationClause, getWhereLocationClause } from './locationTemplate';
import { getConstructInstigatorClause, getWhereInstigatorClause } from './personTemplate';
import { getConstructBookObjectClause, getWhereBookObjectClause } from './bookObjectTemplate';

export const createConstructClause = (searchCategory) => {
    // console.log('4.1: input to createConstructClause: ', searchCategory);
    const types = JSON.parse(searchCategory);

    const constructStatementMap = {
        'https://birgitta.test.uib.no/api/resource_templates/17': getConstructLocationClause(),
        'https://birgitta.test.uib.no/api/resource_templates/13': getConstructInstigatorClause(),
        'https://birgitta.test.uib.no/api/resource_templates/16': getConstructBookObjectClause(),
    };

    const construct = types.map(template => {
        if(constructStatementMap[template]) {
            return constructStatementMap[template];
        }
    });

    // console.log('4.1.1: constructClause: ', construct);
    return construct.filter(Boolean).join('\n');
};

export const createWhereClause = (searchCategory) => {
    // console.log('4.2: input to createConstructClause: ', searchCategory);
    const types = JSON.parse(searchCategory);

    const whereStatementMap = {
        'https://birgitta.test.uib.no/api/resource_templates/17': getWhereLocationClause(),
        'https://birgitta.test.uib.no/api/resource_templates/13': getWhereInstigatorClause(),
        'https://birgitta.test.uib.no/api/resource_templates/16': getWhereBookObjectClause(),
    };

    const whereClause = types.map(template => {
        if(whereStatementMap[template]) {
            return whereStatementMap[template];
        }
    });

    // console.log('4.2.1: whereClause: ', whereClause);
    return whereClause.filter(Boolean).join('\n');
};

export interface Query {
    query: string;
}

export const constructTemplate = (searchParameter) => {
    // console.log('4: searchParameter in constructTemplate', searchParameter);
    const query: Query = {query:
        `PREFIX dcterms: <http://purl.org/dc/terms/>
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
    // console.log('43: query in constructTemplate', query);
    return query;
};


