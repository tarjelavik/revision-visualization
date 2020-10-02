import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';

export const parseToSigmaFormat = (graphData: RawGraphData): SigmaGraph => {

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    graphData.results.bindings.map(object => {
        if (object.personId.value) {
            nodes.push(
                {
                    id: `node_${object.personId.value}`,
                    label: object.personName.value
                });
        }
        if (object.associatedPlaceId.value) {
            nodes.push(
                {
                    id: `node_${object.associatedPlaceId.value}`,
                    label: object.associatedPlaceName.value
                });
        }

        edges.push(
            {
                id: `edge_${object.personId.value}`,
                source: `node_${object.personId.value}`,
                target: `node_${object.associatedPlaceId.value}`,
                label: object.associatedPlaceName.value
            });
    });

    const sigmaGraph: SigmaGraph = {
        graph: {
            nodes,
            edges
        }
    };


    // We need this filter to remove duplicate associated place ids. We get duplicates because we retrieve
    // the associated place of each person, which is often the same place.
    sigmaGraph.graph.nodes = sigmaGraph.graph.nodes.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    return sigmaGraph;

};