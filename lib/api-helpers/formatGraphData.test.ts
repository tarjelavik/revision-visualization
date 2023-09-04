import { parseToSigmaFormat } from './formatGraphData';
import RawGraphData from '../../model/RawGraphData';
import SigmaGraph from '../../model/SigmaGraph';

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
                },
                s: {
                    value: ''
                },
                o: {
                    value: ''
                }
            }
        ]
    }
};

const sigmaGraphObject: SigmaGraph = {
    graph: {
        nodes: [
            {
                id: 'node_1337',
                label: 'Gothmog',
            },
            {
                id: 'node_1338',
                label: 'Angband',
            }
        ],
        edges: [
            {
                id: 'edge_1337',
                source: 'node_1337',
                target: 'node_1338',
                label: 'Angband'
            }
        ]
    }
};

test('parseToSigmaFormat should return a SigmaGraph object', () => {
    expect(parseToSigmaFormat(dummyGraphData)).toMatchObject(sigmaGraphObject);
});