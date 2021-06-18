export const getConstructBookObjectClause = (): string => {
    return `
  ?s o:bookObjectId?bookObjectId .
  ?s o:bookObjectTitle ?bookObject .`;
};

export const getWhereBookObjectClause = (): string => {
    return `
  ?s schema:object/o:title ?bookObject .
  ?s schema:object/o:id ?bookObjectId .`;
};
