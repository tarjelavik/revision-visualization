export const getConstructInstigatorClause = (): string => {
  return `
    ?s o:creatorId ?instigatorId .
    ?s o:creatorName ?instigator .
    ?s o:recipientId ?recipientId .
    ?s o:recipientName ?recipient .
  `;
};

export const getWhereInstigatorClause = (): string => {
  return `
    ?s bdm2:carriedOutBy/o:title ?instigator .
    ?s bdm2:carriedOutBy/o:id ?instigatorId .
    OPTIONAL { ?s bdm2:recipient/o:title ?recipient } .
    OPTIONAL { ?s bdm2:recipient/o:id ?recipientId } .
  `;
};
