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
  OPTIONAL { ?s bdm2:alternateName ?alternateName } .
  OPTIONAL { ?s o:resource_template_property/bdm2:authorityId ?authorityId } .
  OPTIONAL { ?s bdm2:location ?associatedPlace } .
  OPTIONAL { ?s bdm2:birthDate ?birthDate } .
  OPTIONAL { ?s bdm2:deathDate ?deathDate } .
  OPTIONAL { ?s bdm2:birthDateCertainty ?birthDateCertainty } .
  OPTIONAL { ?s bdm2:deathDateCertainty ?deathDateCertainty } .
  OPTIONAL { ?s bdm2:relatedLink ?relatedLink } .
  OPTIONAL { ?s bdm2:lifeRole ?occupationalCategory } .
  OPTIONAL { ?s bdm2:comment ?comment }
  `
};