export const getConstructBookObjectClause = (): string => {
  return `
    ?s o:bookObjectId ?bookObjectId .
    ?s o:bookObjectTitle ?bookObject .
  `;
};

export const getWhereBookObjectClause = (): string => {
  return `
    OPTIONAL { ?s bdm2:object/o:title ?bookObject } .
    OPTIONAL { ?s bdm2:object/o:id ?bookObjectId } .
  `;
};
