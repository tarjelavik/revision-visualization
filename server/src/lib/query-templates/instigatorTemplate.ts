
export const constructInstigatorClause =
`?s o:creatorId ?instigatorId .
?s o:creatorName ?instigator .`;

export const whereInstigatorClause =
`?s schema:creator/o:title ?instigator .
?s schema:creator/o:id ?instigatorId .`;