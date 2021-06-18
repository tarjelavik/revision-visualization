export const personVariables = {
    construct: `
  ?s o:personName ?personName .
  ?s o:alternatePersonName ?alternateName .
  ?s o:PersonAuthorityId ?authorityId .
  ?s o:personAssociatedPlace ?associatedPlace .
  ?s o:birthDate ?birthDate .
  ?s o:deathDate ?deathDate .
  ?s o:birthDateCertainty ?birthDateCertainty .
  ?s o:deathDateCertainty ?deathDateCertainty .
  ?s o:personRelatedLink ?relatedLink .
  ?s o:occupationalCategory ?occupationalCategory .
  ?s o:personComment ?comment`,
    where: `
  ?s o:title ?personName .
  OPTIONAL { ?s schema:alternateName ?alternateName } .
  OPTIONAL { ?s o:resource_template_property/bdm2:authorityId ?authorityId } .
  OPTIONAL { ?s schema:location ?associatedPlace } .
  OPTIONAL { ?s schema:birthDate ?birthDate } .
  OPTIONAL { ?s schema:deathDate ?deathDate } .
  OPTIONAL { ?s bdm2:birthDateCertainty ?birthDateCertainty } .
  OPTIONAL { ?s bdm2:deathDateCertainty ?deathDateCertainty } .
  OPTIONAL { ?s schema:relatedLink ?relatedLink } .
  OPTIONAL { ?s schema:occupationalCategory ?occupationalCategory } .
  OPTIONAL { ?s schema:comment ?comment }
  `
};