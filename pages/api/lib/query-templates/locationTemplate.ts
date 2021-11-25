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
    OPTIONAL { ?s bdm2:locationCreated/o:title ?locationCreated } .
    OPTIONAL { ?s bdm2:locationCreated/o:id ?locationCreatedId } .
    OPTIONAL { ?s bdm2:movedTo/o:title ?toLocation } .
    OPTIONAL { ?s bdm2:movedTo/o:id ?toLocationId } .
  `;
};
