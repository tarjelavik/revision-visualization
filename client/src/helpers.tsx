//import React from 'react';

export const resetState = () => {
    const state = {
        resourceTemplates: [{id: String, label: String}] as object[],
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
}

export const getInitialGraphState = () => {
    const state = {
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
      };

    return state;
}

export const getResourceTemplateId = (selectedClass: string) => {
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

export const getLabel = (resourceTemplate?: string) => {
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
          return null;
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

const getDisplayType = (dataType: string, nodeData: any) => {
  switch (dataType) {
      case 'bdm2:Institution':
          return 'Institution';
      case 'bdm2:BookObject':
          return getBookObjectData(nodeData);
      case 'bdm2:Person':
          return getPersonData(nodeData);
      case 'bdm2:Action':
          return 'Action';
      default:
          return '';
  }
};

export const getDisplayProperties = (nodeData: any) => {
  if (!nodeData) return null;
  return getDisplayType(nodeData['@type'][1], nodeData);
};

const getPersonData = (nodeData: any) => {
  const displayData: PersonData = {
        type: '',
        name: '',
        alternateName: '',
        birthDate: '',
        deathDate: '',
        birthDateCertainty: false,
        deathDateCertainty: false,
        comment: '',
        mentionedInInscription: '',
        isScribeOf: '',
        isMakerOf: '',
        associatedPlace: '',
        profession: '',
        publishes: '',
        link: 'https://birgitta.test.uib.no/s/birgitta/item/'
    };
    try {
        displayData.type = 'Person';
        displayData.name = nodeData['o:title'] || 'null';
        displayData.alternateName = nodeData['schema:alternateName']?.[0]['@value'];
        displayData.birthDate = nodeData['schema:birthDate']?.[0]['@value'];
        displayData.deathDate = nodeData['schema:deathDate']?.[0]['@value'];
        displayData.birthDateCertainty = nodeData['bdm2:birthDateCertainty']?.[0]['@value'];
        displayData.deathDateCertainty = nodeData['bdm2:deathDateCertainty']?.[0]['@value'];
        displayData.comment = nodeData['schema:comment']?.[0]['@value'];
        displayData.mentionedInInscription = nodeData['bdm2:mention']?.[0]['@value'];
        displayData.isScribeOf = nodeData['bdm2:scribe']?.[0]['@value'];
        displayData.isMakerOf = nodeData['bdm2:made']?.[0]['@value'];
        displayData.associatedPlace = nodeData['schema:location']?.[0]['display_title'];
        displayData.profession = nodeData['schema:occupationalCategory']?.[0]['@value'];
        displayData.publishes = nodeData['bdm2:publication']?.[0]['@value'];
        displayData.link = displayData.link+nodeData['o:id'];
    } catch (error) {
        console.log(error)
    }
    return displayData;
}

export interface BookObjectData {
  type: string;
  title: string;
  location: string;
  containedInPlace: string;
  includesObject: string;
  dataSource: string;
  previousShelfmark: string;
  stcID: string;
  hasType: string;
  needsCheck: string;
  referencesBirgitta: string;
  referenceDetails: string;
  checked: string;
  comment: string;
  writingSupport: string;
  leafPageDimensions: string;
  numberLeaves: string;
  collationStatement: string;
  pagination: string;
  link: string;
}

const getBookObjectData = (nodeData: any) => {
  const displayData: BookObjectData = {
        type: '',
        title: '',
        location: '',
        containedInPlace: '',
        includesObject: '',
        dataSource: '',
        previousShelfmark: '',
        stcID: '',
        hasType: '',
        needsCheck: '',
        referencesBirgitta: '',
        referenceDetails: '',
        checked: '',
        comment: '',
        writingSupport: '',
        leafPageDimensions: '',
        numberLeaves: '',
        collationStatement: '',
        pagination: '',
        link: 'https://birgitta.test.uib.no/s/birgitta/item/'
    };
    try {
        displayData.type = 'Book Object';
        displayData.title = nodeData['bdm2:shelfmark'][0]['@value'];
        displayData.location = nodeData['schema:location']?.[0]['@value'];
        displayData.containedInPlace = nodeData['schema:containedInPlace']?.[0]['@value'];
        displayData.includesObject = nodeData['schema:includesObject']?.[0]['@value'];
        displayData.dataSource = nodeData['bdm2:dataSource']?.[0]['display_title'];
        displayData.previousShelfmark = nodeData['bdm2:previousShelfmark']?.[0]['@value'];
        displayData.stcID = nodeData['bdm2:stcID']?.[0]['@value'];
        displayData.hasType = nodeData['bdm2:hasType']?.[0]['display_title'];
        displayData.needsCheck = nodeData['bdm2:needsCheck']?.[0]['@value'];
        displayData.referencesBirgitta = nodeData['bdm2:referencesBirgitta']?.[0]['@value'];
        displayData.referenceDetails = nodeData['bdm2:referenceDetails']?.[0]['@value'];
        displayData.checked = nodeData['bdm2:checked']?.[0]['@value'];
        displayData.comment = nodeData['schema:comment']?.[0]['@value'];
        displayData.writingSupport = nodeData['bdm2:writingSupport']?.[0]['@value'];
        displayData.leafPageDimensions = nodeData['bdm2:leafPageDimensions']?.[0]['@value'];
        displayData.numberLeaves = nodeData['bdm2:numberLeaves']?.[0]['@value'];
        displayData.collationStatement = nodeData['bdm2:collationStatement']?.[0]['@value'];
        displayData.collationStatement = nodeData['schema:pagination']?.[0]['@value'];
        displayData.link = displayData.link+nodeData['o:id'];
    } catch (error) {
        console.log(error)
    }
    return displayData;
}