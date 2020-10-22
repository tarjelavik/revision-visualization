import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';

// TODO: Make this function a function that triages incoming requests based on searchCategory, and then calls
// that specific function.
export const parseToSigmaFormat = (graphData: RawGraphData, searchCategory: any): SigmaGraph => {

    if (searchCategory === 'ACTION') {
        return parsetoActionGraph(graphData);
    }

    if (searchCategory === 'PLACE') {
        return parsetoPlaceGraph(graphData);
    }

    if (searchCategory === 'PERSON') {
        return parseToPersonGraph(graphData);
    }

    if (searchCategory === 'BOOKOBJECT') {
        return parseToBookObjectGraph (graphData);
    }

    return parseToGraph(graphData);
};

const parsetoActionGraph = (graphData: RawGraphData): SigmaGraph => {
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

const parsetoPlaceGraph = (graphData: RawGraphData): SigmaGraph => {
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

const parseToGraph = (graphData: any): SigmaGraph => {
    // const vars = graphData.head.vars;
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    // let edgeId = 0;
    // console.log(JSON.stringify(graphData, null, 2))
    // Send in one triple for testing
    nodes = createNode(graphData['@graph'][0]);
    edges = createEdges(nodes)


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

const createEdges = (nodes: any): Edge[] => {
    let edges: Edge[] = [];
    console.log(nodes)

    return edges
}

const createNode = (triple: any): Node[] => {

    const nodes: Node[] = [];
    
    // Create a function that flattens any array. This does not work yet which means that when there are two of an id in an array, one is lost
    const flattenedTriples: any = flattenTriples(triple)

    try {
        nodes.push({
            id: flattenedTriples['o:bookObjectId'],
            label: flattenedTriples.bookObjectTitle
        })
    } catch (error) {
        console.log('not found')
    }

    try {
        nodes.push({
            id: flattenedTriples['o:actionId'],
            label: flattenedTriples.actionTitle
        })
    } catch (error) {
        console.log('not found')
    }

    try {
        nodes.push({
            id: flattenedTriples['o:creatorId'],
            label: flattenedTriples.creatorName
        })
    } catch (error) {
        console.log('not found')
    }

    return nodes;
}

const flattenTriples = (triple) => {

   let customNode: any = {}
   for (const key of Object.keys(triple)) {
        if (typeof(triple[key]) === 'object') {
            triple[key].forEach(element => {
                customNode[key] = element
            });

        } else {
            customNode[key] = triple[key]
        }
    }
    return customNode;
}

const parseToBookObjectGraph = (graphData: RawGraphData): SigmaGraph => {
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

    const bookObjectGraph: SigmaGraph = {
        graph: {
            nodes,
            edges
        }
    };

    // We need this filter to remove duplicate associated place ids. We get duplicates because we retrieve
    // the associated place of each person, which is often the same place.
    bookObjectGraph.graph.nodes = bookObjectGraph.graph.nodes.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    return bookObjectGraph;
};

const parseToPersonGraph = (graphData: RawGraphData): SigmaGraph => {

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

    const personGraph: SigmaGraph = {
        graph: {
            nodes,
            edges
        }
    };

    // We need this filter to remove duplicate associated place ids. We get duplicates because we retrieve
    // the associated place of each person, which is often the same place.
    personGraph.graph.nodes = personGraph.graph.nodes.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

    return personGraph;
};

