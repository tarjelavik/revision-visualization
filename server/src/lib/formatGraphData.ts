import RawGraphData from '../../../model/RawGraphData';
import SigmaGraph from '../../../model/SigmaGraph';
import Node from '../../../model/Node';
import Edge from '../../../model/Edge';

import { generateId } from './generateId';
import { getActionId } from './helpers';

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
                label: object.associatedPlaceName.value,
                type: 'arrow'
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
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Todo: Make interface for graphData
    graphData['@graph'].forEach(object => {
        console.log(object)
        try {
            if (object['o:bookObject']) {
                nodes.push({
                    id: object['o:bookObject'],
                    label: object.bookObjectTitle,
                    type: 'cross',
                    class: 'BookObject'
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
                    type: 'star',
                    color: 'red'
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
                    type: 'diamond'
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
                    type: 'circle'
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
                    type: 'square'
                });
            } catch (error) {
                console.log('not found');
            }
        }
        try {
            if (object['o:bookObject']) {
                edges.push({
                    id: generateId(),
                    source: object['o:bookObject'],
                    target: object['o:creatorId'],
                    label: object.actionTitle,
                    type: 'arrow',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
                edges.push({
                    id: generateId(),
                    source: object['o:bookObject'],
                    target: object['locationCreated:Id'],
                    label: '',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
                edges.push({
                    id: generateId(),
                    source: object['o:bookObject'],
                    target: object['toLocation:Id'],
                    label: '',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
            }
            if (object['o:recipientId']) {
                edges.push({
                    id: generateId(),
                    source: object['o:bookObject'],
                    target: object['o:recipientId'],
                    label: '',
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
                edges.push({
                    id: generateId(),
                    source: object['o:recipientId'],
                    target: object['o:creatorId'],
                    label: object.actionTitle,
                    type: 'arrow',
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
                    size: 4,
                    actionId: getActionId(object['@id'])
                });
            }
            if (object['locationCreated:Id']) {
                edges.push({
                    id: generateId(),
                    source: object['locationCreated:Id'],
                    target: object['o:creatorId'],
                    label: object.actionTitle,
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

    // Filter out all spurious edges which either miss target or source
    sigmaGraph.graph.edges = sigmaGraph.graph.edges.filter(edge => typeof(edge.source) !== 'undefined' && typeof(edge.target) !== 'undefined');

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

