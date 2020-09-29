import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';

export const parseToSigmaFormat = (graphData: RawGraphData) => {

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    graphData.results.bindings.map(object => {
        nodes.push(
                {
                    id: object.personId.value || object.associatedPlaceId.value || null,
                    label: object.personName.value || object.associatedPlaceName.value || null
                });
        edges.push(
                {
                    id: object.personId.value || null,
                    source: object.personId.value || null,
                    target: object.associatedPlaceId.value || null,
                    label: object.personName.value
                });
    });

    const sigmaGraph: SigmaGraph = {
        graph: {
            'nodes': nodes,
            'edges': edges
        }
    };

    return sigmaGraph;

};