export default interface RawGraphData {
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