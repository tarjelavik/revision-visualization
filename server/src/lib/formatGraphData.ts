import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';

import { generateId } from './generateId';

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
    console.log(graphData['@graph'])
    // const vars = graphData.head.vars;
    let nodes: Node[] = [];
    let edges: Edge[] = [];

    // Create a function that flattens any array. This does not work yet which means that when there are two of an id in an array, one is lost. Now we splice away the troublesome elements.
    const flattenedTriples: any = graphData['@graph'].splice(4, 23)
    
    flattenedTriples.forEach(object => {
        try {
            nodes.push({
                id: object['o:bookObject'],
                label: object.bookObjectTitle
            })
        } catch (error) {
            console.log('not found')
        }

/*         try {
            nodes.push({
                id: object['o:actionId'],
                label: object.actionTitle
            })
        } catch (error) {
            console.log('not found')
        } */

        try {
            nodes.push({
                id: object['o:creatorId'],
                label: object.creatorName
            })
        } catch (error) {
            console.log('not found')
        }
        if (object['o:recipientId']) {
            try {
                nodes.push({
                    id: object['o:recipientId'],
                    label: object.recipientName
                })
            } catch (error) {
                console.log('not found')
            }
        }
        if (object['locationCreated:Id']) {
            try {
                nodes.push({
                    id: object['locationCreated:Id'],
                    label: object.locationCreated
                })
            } catch (error) {
                console.log('not found')
            }
        }
        if (object['o:toLocation']) {
            try {
                nodes.push({
                    id: object.toLocationId,
                    label: object.toLocation
                })
            } catch (error) {
                console.log('not found')
            }
        }
        // IF YOU WANT TO INCLUDE ACTIONS AS SEPARATE NODES, UNCOMMENT THIS
/*         try {
            edges.push({
                id: generateId(),
                source: object['o:bookObjectId'],
                target: object['o:actionId'],
                label: object.actionTitle
            })
            edges.push({
                id: generateId(),
                source: object['o:actionId'],
                target: object['o:creatorId'],
                label: object.actionTitle
            })
            edges.push({
                id: generateId(),
                source: object['o:bookObjectId'],
                target: object['o:creatorId'],
                label: ''
            })
            if (object['o:recipientId']) {
                edges.push({
                    id: generateId(),
                    source: object['o:bookObjectId'],
                    target: object['o:recipientId'],
                    label: ''
                })
                edges.push({
                    id: generateId(),
                    source: object['o:recipientId'],
                    target: object['o:creatorId'],
                    label: ''
                })
            }
        } catch (error) {
            console.log(error)
        } */
        // ACTION AS LABEL:
 
        try {
            edges.push({
                id: generateId(),
                source: object['o:bookObject'],
                target: object['o:creatorId'],
                label: object.actionTitle
            })
            if (object['o:recipientId']) {
                edges.push({
                    id: generateId(),
                    source: object['o:bookObject'],
                    target: object['o:recipientId'],
                    label: object.actionTitle
                })
               edges.push({
                    id: generateId(),
                    source: object['o:recipientId'],
                    target: object['o:creatorId'],
                    label: object.actionTitle
                }) 
            }
/*             if (object['locationCreated:Id']) {
                edges.push({
                    id: generateId(),
                    source: object['o:bookObject'],
                    target: object.locationCreated,
                    label: ''
                })
            }
            if (object['o:toLocation']) {
                    edges.push({
                        id: generateId(),
                        source: object['o:bookObject'],
                        target: object.toLocation,
                        label: ''
                    })
            } */
        } catch (error) {
            console.log(error)
        }
       
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

    // console.log(JSON.stringify(sigmaGraph, null, 2))
    return sigmaGraph;
};

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

