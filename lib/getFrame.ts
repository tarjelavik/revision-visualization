import { JsonLd } from "jsonld/jsonld-spec";

export default async function getFrame(type): Promise<JsonLd> {
  const frame: JsonLd = {
    '@context': {
      id: '@id',
      type: '@type',
      BookObject: {
        '@id': 'http://purl.org/bdm2/BookObject',
        '@type': '@id'
      },
      WorkItem: {
        '@id': 'http://purl.org/bdm2/WorkItem',
        '@type': '@id'
      },
      Institution: {
        '@id': 'http://purl.org/bdm2/Institution',
        '@type': '@id'
      },
      Item: {
        '@id': 'http://omeka.org/s/vocabs/o#Item',
        '@type': '@id'
      },
      Concept: {
        '@id': 'http://www.w3.org/2004/02/skos/core#Concept',
        '@type': '@id'
      },
      owner: {
        '@id': 'http://omeka.org/s/vocabs/o#owner',
        '@type': '@id'
      },
      resource_template: {
        '@id': 'http://omeka.org/s/vocabs/o#resource_template',
        '@type': '@id'
      },
      resource_class: {
        '@id': 'http://omeka.org/s/vocabs/o#resource_class',
        '@type': '@id'
      },
      label: {
        '@id': 'http://omeka.org/s/vocabs/o#title'
      },
      title: {
        '@id': 'http://purl.org/dc/terms/title'
      },
      hand: {
        '@id': 'http://purl.org/bdm2/hand'
      },
      carriesWork: {
        '@id': 'http://purl.org/bdm2/carriesWork',
        '@type': '@id'
      },
      referencesBirgitta: {
        '@id': 'http://purl.org/bdm2/referencesBirgitta'
      },
      is_public: {
        '@id': 'http://omeka.org/s/vocabs/o#is_public',
        '@type': 'http://www.w3.org/2001/XMLSchema#boolean'
      },
      folios: {
        '@id': 'http://purl.org/bdm2/folios'
      },
      formsPartOf: {
        '@id': 'http://purl.org/bdm2/formsPartOf',
        '@type': '@id'
      },
      created: {
        '@id': 'http://omeka.org/s/vocabs/o#created',
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime'
      },
      identifier: {
        '@id': 'http://omeka.org/s/vocabs/o#id',
        '@type': 'http://www.w3.org/2001/XMLSchema#integer'
      },
      language: {
        '@id': 'http://purl.org/bdm2/language'
      },
      modified: {
        '@id': 'http://omeka.org/s/vocabs/o#modified',
        '@type': 'http://www.w3.org/2001/XMLSchema#dateTime'
      },
      description: {
        '@id': 'http://purl.org/dc/terms/description'
      },
      composedOf: {
        '@id': 'http://purl.org/bdm2/composedOf',
        '@type': '@id'
      },
      leafPageDimensions: {
        '@id': 'http://purl.org/bdm2/leafPageDimensions'
      },
      relatedLink: {
        '@id': 'http://purl.org/bdm2/relatedLink',
        '@type': '@id'
      },
      productionDate: {
        '@id': 'http://purl.org/bdm2/productionDate'
      },
      shelfmark: {
        '@id': 'http://purl.org/bdm2/shelfmark'
      },
      comment: {
        '@id': 'http://purl.org/bdm2/comment'
      },
      writingSupport: {
        '@id': 'http://purl.org/bdm2/writingSupport'
      },
      location: {
        '@id': 'http://purl.org/bdm2/location',
        '@type': '@id'
      },
      referenceDetails: {
        '@id': 'http://purl.org/bdm2/referenceDetails'
      },
      hasType: {
        '@id': 'http://purl.org/bdm2/hasType',
        '@type': '@id'
      },
      ownedBy: {
        '@id': 'http://purl.org/bdm2/ownedBy',
        '@type': '@id'
      },
      o: 'http://omeka.org/s/vocabs/o#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      dcterms: 'http://purl.org/dc/terms/',
      bdm2: 'http://purl.org/bdm2/',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#'
    },
    '@type': `${type}`,
    '@embed': '@always',
  }
  return frame
}