export const getConstructLocationClause = (): string => {
  return `
    ?s o:locationCreated ?locationCreated .
    ?s o:locationCreatedId ?locationCreatedId .
    ?s o:toLocationId ?toLocationId .
    ?s o:toLocation ?toLocation .
  `;
};

export const getWhereLocationClause = (): string => {
  return `
    OPTIONAL { ?s schema:locationCreated/o:title ?locationCreated } .
    OPTIONAL { ?s schema:locationCreated/o:id ?locationCreatedId } .
    OPTIONAL { ?s schema:toLocation/o:title ?toLocation } .
    OPTIONAL { ?s schema:toLocation/o:id ?toLocationId } .
  `;
};
