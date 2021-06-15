import ResourceTemplate from '../../../model/ResourceTemplate';
import RawResourceTemplate from '../../../model/RawResourceTemplate';


export const formatResourceTemplate = (rawResourceTemplate: RawResourceTemplate ): ResourceTemplate[] => {
    const resourceTemplates: ResourceTemplate[] = [];

    try {
        rawResourceTemplate.data.map((object) => {
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