import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';
import { generateId } from './generateId';
import { getActionId } from './helpers';

// TODO: Make this function a function that triages incoming requests based on searchCategory, and then calls
// that specific function.
export const parseToSigmaFormat = (graphData: RawGraphData): SigmaGraph => {
    return parseToGraph(graphData);
};

const parseToGraph = (graphData: any): SigmaGraph => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Get first element of graphData. Used for debugging.
    // graphData = graphData['@graph'].slice(0,1);

    // Todo: Make interface for graphData
    graphData['@graph'].forEach(object => {
    // console.log(object);
        try {
            if (object['o:bookObjectId']) {
                nodes.push({
                    id: object['o:bookObjectId'],
                    label: object.bookObjectTitle,
                    image: {
                        url: '/icons/book-item-svgrepo.svg',
                    },
                    type: 'square',
                    color: '#D08770',
                    class: 'BookObject',
                });
            }
        } catch (error) {
            console.log('not found');
        }

        try {
            if (object['o:creatorId']) {
                nodes.push({
                    id: object['o:creatorId'],
                    label: object.creatorName,
                    image: {
                        url: '',
                    },
                    color: '#B48EAD',
                    type: 'circle',
                });
                // TODO: Let the client know that the object ['o:creatorId'] is now using "star" as its shape and "red" as color
            }
        } catch (error) {
            console.log('not found');
        }
        if (object.recipientName) {
            try {
                nodes.push({
                    id: object['o:recipientId'],
                    label: object.recipientName,
                    image: {
                        url: '',
                    },
                    color: '#A3BE8C',
                    type: 'circle',
                });
            } catch (error) {
                console.log('not found');
            }
        }
        if (object['locationCreated:Id']) {
            try {
                nodes.push({
                    id: object['locationCreated:Id'],
                    label: object.locationCreated,
                    color: '#EBCB8B',
                    type: 'diamond',
                });
            } catch (error) {
                console.log('not found');
            }
        }
        if (object.toLocation) {
            try {
                nodes.push({
                    id: object['toLocation:Id'],
                    label: object.toLocation,
                    color: '#BF616A',
                    type: 'diamond',
                });
            } catch (error) {
                console.log('not found');
            }
        }
        try {
            // let redundantEdge = null
            if (object['o:bookObjectId']) {
                // TODO filter out redundant edges
                // console.log("current edge source:", object['o:creatorId'])
                // console.log("current edge target:", object['o:bookObjectId'])
                // redundantEdge = edges.find(edge => edge.source === object['o:creatorId'] && edge.target === object['o:bookObjectId'])
                // debug - Rui
                // if (typeof(redundantEdge) === 'undefined'){
                // console.log("didn't find redundant edge, so push a new edge ...")
                    edges.push({
                        id: generateId(),
                        source: object['o:creatorId'],
                        target: object['o:bookObjectId'],
                        label: object.actionTitle,
                        type: 'curvedArrow',
                        size: 4,
                        actionId: getActionId(object['@id'])
                    });
                    // console.log("length of the edges array:", edges.length)
                // }else {
                //     console.log("find a redundant edge:", redundantEdge)
                //     const idxOfRedundantEdge = edges.indexOf(redundantEdge)
                //     console.log("index of the redundant edge:", idxOfRedundantEdge)
                //     edges[idxOfRedundantEdge].size += 10
                //     console.log("modified edge:", edges[idxOfRedundantEdge])
                //     console.log("length of the edges array without pushing:", edges.length)
                // }
                // TODO: empty array:
                // redundantEdges.splice(0, redundantEdges.length)
                // console.log("emptyed redundantEdges:", redundantEdges)
                edges.push({
                    id: generateId(),
                    source: object['locationCreated:Id'],
                    target: object['o:bookObjectId'],
                    label: object.actionTitle,
                    type: 'curvedArrow',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
                edges.push({
                    id: generateId(),
                    source: object['toLocation:Id'],
                    target: object['o:bookObjectId'],
                    label: object.actionTitle,
                    type: 'curvedArrow',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
            }
            if (object['o:recipientId']) {
                edges.push({
                    id: generateId(),
                    source: object['o:bookObjectId'],
                    target: object['o:recipientId'],
                    label: object.actionTitle,
                    type: 'curvedArrow',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
                edges.push({
                    id: generateId(),
                    source: object['o:creatorId'],
                    target: object['o:recipientId'],
                    label: object.actionTitle,
                    type: 'curvedArrow',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
            }
            if (object['locationCreated:Id']) {
                edges.push({
                    id: generateId(),
                    source: object['locationCreated:Id'],
                    target: object['toLocation:Id'],
                    label: object.actionTitle,
                    type: 'curvedArrow',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
            }
            // TODO: Why is the code block below is the same with the code above in addition to the label? -Rui
            if (object['locationCreated:Id']) {
                edges.push({
                    id: generateId(),
                    source: object['locationCreated:Id'],
                    target: object['o:creatorId'],
                    label: 'Action created at',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
            }
        } catch (error) {
            console.log(error);
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

    // let nodes to be initialized as a circle on canvas
    sigmaGraph.graph.nodes.forEach(function(node, i, a){
        node.x = 1000 * Math.cos(2 * i * Math.PI / a.length);
        node.y = 1000 * Math.sin(2 * i * Math.PI / a.length);
    });

    // Filter out all spurious edges which either miss target or source
    sigmaGraph.graph.edges = sigmaGraph.graph.edges.filter(edge => typeof(edge.source) !== 'undefined' && typeof(edge.target) !== 'undefined');

    // console.log(JSON.stringify(sigmaGraph, null, 2))
    return sigmaGraph;
};



