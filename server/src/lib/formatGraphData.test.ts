import { parseToSigmaFormat } from './formatGraphData';
import RawGraphData from '../../../model/RawGraphData';

const dummyGraphData: RawGraphData = {
    head: {
        vars: ['dummyString']
    },
    results: {
        bindings: [
                {
                    personName: {
                        type: 'literal',
                        value: 'Gothmog'
                    },
                    personId: {
                        type: 'literal',
                        datatype: 'http://www.w3.org/2001/XMLSchema#integer',
                        value: '1337'
                    },
                    associatedPlaceName: {
                        type: 'literal',
                        value: 'Angband'
                    },
                    associatedPlaceId: {
                        type: 'literal',
                        datatype: 'http://www.w3.org/2001/XMLSchema#integer',
                        value: '1338'
                    }
                }
        ]
    }
};


test('parseToSigmaFormat', () => {
    expect(parseToSigmaFormat(dummyGraphData)).toBeTruthy();
});