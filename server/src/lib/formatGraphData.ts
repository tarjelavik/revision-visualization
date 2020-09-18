
interface RawGraphData {
    head: {
        vars: string[]
    };
    results: {
        bindings: [
                {
                    personName: {
                        type: 'string',
                        value: 'string'
                    },
                    personId: {
                        type: 'literal',
                        datatype: 'string',
                        value: 'string'
                    }
                    associatedPlaceName: {
                        type: 'string',
                        value: 'string'
                    },
                    associatedPlaceId: {
                        type: 'literal',
                        datatype: 'string',
                        value: 'string'
                    }
                }
        ]
    };
}

interface SigmaGraph {
        nodes: [
            {
                id: string,
                label: string
            }
        ];
        edges: [
            {
                id: string,
                source: string,
                target: string,
                label: string
            }
        ];
}


export const parseToSigmaFormat = (graphData: RawGraphData) => {
    // console.log(graphData.results.bindings);

    const sigmaGraph = graphData.results.bindings.map(object => {
        console.log(object);
        const graph: SigmaGraph = {
            nodes: [
                {
                    id: object.personId.value || object.associatedPlaceId.value || null,
                    label: object.personName.value || object.associatedPlaceName.value || null
                }
            ],
            edges: [
                {
                    id: object.personId.value || null,
                    source: object.personId.value || null,
                    target: object.associatedPlaceId.value || null,
                    label: object.personName.value
                }
            ]
        };
        return graph;
    });

/*     const sigmaGraph: sigmaGraph = {
        nodes: [
            {
                id: '',
                label: ''
            }
        ],
        edges: [
            {
                id: '',
                source: '',
                target: '',
                label: ''
            }
        ]
    }; */

    return sigmaGraph;

};