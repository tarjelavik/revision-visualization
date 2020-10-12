import ResourceTemplate from '../../../model/ResourceTemplate';

/* 
interface RawResourceTemplateData {
    '@context': string,
    '@id': string,
    'o:id': number,
    'o:owner': {
        '@id': string,
        'o:id': number
    },
    'o:title_property': {
        '@id': string,
        'o:id': number
    },
    'o:description_property': {
        '@id': string,
        'o:id': number
    },
    'o:resource_template_property': [
        {
            'o:property': {
                '@id': string,
                'o:id': number
            },
            'o:alternate_label': string,
            'o:alternate_comment': string,
            'o:data_type': string,
            'o:is_required': boolean,
            'o:is_private': false
        }
    ]
} */


export const formatResourceTemplate = (rawResourceTemplate): ResourceTemplate[] => {

    console.log(rawResourceTemplate)

    const resourceTemplates: ResourceTemplate[] = [];

    try {
        rawResourceTemplate.data.map(object => {
    
            const resourceTemplate: ResourceTemplate = {
                id: '',
                label: ''
            };
    
            if (object['@id']) {
                resourceTemplate.id = object['@id'];
            }
            if (object['o:label']) {
                resourceTemplate.label = object['o:label'];
            }
            resourceTemplates.push(resourceTemplate);
        });
    } catch (error) {
        console.log(error);
    }

    return resourceTemplates;
};