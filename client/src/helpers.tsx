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