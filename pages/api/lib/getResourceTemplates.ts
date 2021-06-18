import axios from 'axios';
import { formatResourceTemplate } from './formatResourceTemplate';
import ResourceTemplate from '../../../model/ResourceTemplate';

export const getResourceTemplates = async(): Promise<ResourceTemplate[] | void> => {
    try {
        const resourceTemplates = axios.get('https://birgitta.test.uib.no/api/resource_templates', { headers: {'Accept': 'application/json'}})
            .then(res => {return formatResourceTemplate(res);})
            .catch(Error => console.log(Error));
        return resourceTemplates;
    } catch (Error) {
        console.log(Error);
    }
};