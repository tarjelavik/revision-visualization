import { parseToSigmaFormat } from './formatGraphData';
import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';

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

const sigmaGraphObject: SigmaGraph = {
    graph: {
        nodes: [
            {
                id: '1337',
                label: 'Gothmog',
            }
        ],
        edges: [
            {
                id: '1337',
                source: '1337',
                target: '1338',
                label: 'Angband'
            }
        ]
    }
};

test('parseToSigmaFormat should return a SigmaGraph object', () => {
    expect(parseToSigmaFormat(dummyGraphData)).toMatchObject(sigmaGraphObject);
});