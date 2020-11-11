
export const getConstructInstigatorClause = (): string => {
    return ` ?s o:creatorId ?instigatorId .
    ?s o:creatorName ?instigator .`;
};

export const getWhereInstigatorClause = (): string => {
    return `?s schema:creator/o:title ?instigator .
    ?s schema:creator/o:id ?instigatorId .`;
};