// import React from 'react';

export const resetState = () => {
  const state = {
    resourceTemplates: [{id: String, label: String}] as unknown,
    isLoading: false,
    displayGraph: false,
    graph: {
      nodes:[ {
        id: '',
        label: ''
      }],
      edges:[ {
        id: '',
        source: '',
        target: '',
        label: ''
      }]
    },
    formData: [] as string[],
    selectedClasses: [] as string[],
    nodeData: null,
    displayDrawer: false,
    appURL: ''
  };

  return state;
};

export const getResourceTemplateId = (selectedClass: string): string => {
  switch (selectedClass) {
    case 'Person':
      return 'https://birgitta.test.uib.no/api/resource_templates/13';
    case 'Place':
      return 'https://birgitta.test.uib.no/api/resource_templates/14';
    case 'Location in Time':
      return 'https://birgitta.test.uib.no/api/resource_templates/15';
    case 'Book Object':
      return 'https://birgitta.test.uib.no/api/resource_templates/16';
    case 'Institution':
      return 'https://birgitta.test.uib.no/api/resource_templates/17';
    case 'Work Item':
      return 'https://birgitta.test.uib.no/api/resource_templates/18';
    case 'Work':
      return 'https://birgitta.test.uib.no/api/resource_templates/19';
    case 'Non Book Object':
      return 'https://birgitta.test.uib.no/api/resource_templates/20';
    case 'Action':
      return 'https://birgitta.test.uib.no/api/resource_templates/21';
    case 'Data Source':
      return 'https://birgitta.test.uib.no/api/resource_templates/22';
    default:
      return '0';
  }
};

export const getLabel = (resourceTemplate?: string): string => {
  switch (resourceTemplate) {
    case 'https://birgitta.test.uib.no/api/resource_templates/13':
      return 'Person';
    case 'https://birgitta.test.uib.no/api/resource_templates/14':
      return 'Place';
    case 'https://birgitta.test.uib.no/api/resource_templates/15':
      return 'Location in Time';
    case 'https://birgitta.test.uib.no/api/resource_templates/16':
      return 'Book Object';
    case 'https://birgitta.test.uib.no/api/resource_templates/17':
      return 'Institution';
    case 'https://birgitta.test.uib.no/api/resource_templates/18':
      return 'Work Item';
    case 'https://birgitta.test.uib.no/api/resource_templates/19':
      return 'Work';
    case 'https://birgitta.test.uib.no/api/resource_templates/20':
      return 'Non Book Object';
    case 'https://birgitta.test.uib.no/api/resource_templates/21':
      return 'Action';
    case 'https://birgitta.test.uib.no/api/resource_templates/22':
      return 'Data Source';
    default:
      return '';
  }
};


export interface PersonData {
  type: string;
  name: string;
  alternateName?: string;
  birthDate?: string;
  deathDate?: string;
  birthDateCertainty?: boolean;
  deathDateCertainty?: boolean;
  comment?: string;
  mentionedInInscription?: string;
  isScribeOf?: string;
  isMakerOf?: string;
  associatedPlace?: string;
  profession?: string;
  publishes?: string;
  link: string;
}

export const getDisplayType = (dataType: string): string => {
  switch (dataType) {
    case 'bdm2:Institution':
      return 'Institution';
    case 'bdm2:BookObject':
      return 'Book Object';
    case 'bdm2:Person':
      return 'Person';
    case 'bdm2:Action':
      return 'Action';
    default:
      return '';
  }
};

export const getDisplayProperties = (nodeData: any) => {
  if (!nodeData) return null;
  return getDisplayType(nodeData['@type'][1]);
};

export const desiredProps = [
  'schema:name',
  'schema:alternateName',
  'schema:birthDate',
  'schema:deathDate',
  'bdm2:birthDateCertainty',
  'bdm2:deathDateCertainty',
  'schema:comment',
  'bdm2:mention',
  'bdm2:scribe',
  'bdm2:made',
  'schema:location',
  'schema:occupationalCategory',
  'bdm2:publication',
  'bdm2:shelfmark',
  'schema:location',
  'schema:containedInPlace',
  'schema:includesObject',
  'bdm2:dataSource',
  'bdm2:previousShelfmark',
  'bdm2:stcID',
  'bdm2:hasType',
  'bdm2:needsCheck',
  'bdm2:referencesBirgitta',
  'bdm2:referenceDetails',
  'bdm2:checked',
  'schema:comment',
  'bdm2:writingSupport',
  'bdm2:leafPageDimensions',
  'bdm2:numberLeaves',
  'bdm2:collationStatement',
  'schema:pagination'
];
