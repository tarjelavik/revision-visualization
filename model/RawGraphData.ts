export default interface RawGraphData {
    head: {
        vars: string[]
    };
    results: {
        bindings: [
                {
                    personName: {
                        type: string,
                        value: string
                    },
                    personId: {
                        type: string,
                        datatype: string,
                        value: string
                    },
                    associatedPlaceName: {
                        type: string,
                        value: string
                    },
                    associatedPlaceId: {
                        type: string,
                        datatype: string,
                        value: string
                    }
                    s: {
                        value: string
                    }
                    o: {
                        value: string
                    }
                }
        ]
    };
}