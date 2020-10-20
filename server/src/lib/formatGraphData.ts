import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';

// TODO: Make this function a function that triages incoming requests based on searchCategory, and then calls
// that specific function.
export const parseToSigmaFormat = (graphData: RawGraphData, searchCategory: any): any => {

    if (searchCategory === 'ACTION') {
        return parsetoActionGraph(graphData);
    }

    if (searchCategory === 'PLACE') {
        return parsetoPlaceGraph(graphData);
    }

};

export const parsetoActionGraph = (graphData: RawGraphData): SigmaGraph => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    graphData.results.bindings.map(object => {
        if (object.s.value) {
            nodes.push(
                {
                    id: `node_${object.s.value}`,
                    label: object.s.value
                });
        }
        if (object.o.value) {
            nodes.push(
                {
                    id: `node_${object.o.value}`,
                    label: object.o.value
                });
        }

        edges.push(
            {
                id: `edge_${object.s.value}`,
                source: `node_${object.s.value}`,
                target: `node_${object.o.value}`,
                label: object.o.value
            });
    });

    const actionGraph: SigmaGraph = {
        graph: {
            nodes,
            edges
        }
    };

    // We need this filter to remove duplicate associated place ids. We get duplicates because we retrieve
    // the associated place of each person, which is often the same place.
    actionGraph.graph.nodes = actionGraph.graph.nodes.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    return actionGraph;
};

export const parsetoPlaceGraph = (graphData: RawGraphData): SigmaGraph => {

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

    const placeGraph: SigmaGraph = {
        graph: {
            nodes,
            edges
        }
    };


    // We need this filter to remove duplicate associated place ids. We get duplicates because we retrieve
    // the associated place of each person, which is often the same place.
    placeGraph.graph.nodes = placeGraph.graph.nodes.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
    return placeGraph;
};
