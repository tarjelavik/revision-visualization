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