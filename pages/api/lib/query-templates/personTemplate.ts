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
    ?s schema:creator/o:title ?instigator .
    ?s schema:creator/o:id ?instigatorId .
    OPTIONAL { ?s schema:recipient/o:title ?recipient } .
    OPTIONAL { ?s schema:recipient/o:id ?recipientId } .
  `;
};
