import React from 'react';
import { Box, Center, Flex, Heading } from '@chakra-ui/react';
import {Sigma, RandomizeNodePositions, NOverlap, RelativeSize, DragNodes, ForceAtlas2, NodeShapes } from 'react-sigma';
import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';

const noResults = <IllustrationContainer src='Empty.png' alt="No results" heigth="800px" width="800px"/>;


// Hardcoded pixels as 100vh does not work.
const sigmaStyle = {
    width: '1920px',
    height: '1080px',
};

const onClickEdgeHandler = (e: any, props: any) => {
    props.getClickedNodeData(e.data.edge.actionId);
    props.setDisplayDrawer(true);
};

const onClickNodeHandler = (event: any, props: any) => {
    console.log('clicked node')
    props.getClickedNodeData(event.data.node.id);
    props.setDisplayDrawer(true);
};


const sigma = (props: any) => {
    console.log(props.graph.graph.nodes.length)
    return (
        <>
        {props.graph.graph.nodes.length ?
            <Box w='100%'>
                <Sigma
                style={sigmaStyle}
                graph={props.graph.graph}
                onClickEdge={(e: any) => onClickEdgeHandler(e, props)}
                onClickNode={(event: any) => onClickNodeHandler(event, props)}
                renderer='canvas'
                settings={
                    {
                    scalingMode: 'outside',
                    defaultLabelSize: 16,
                    labelThreshold: 0,
                    drawEdgeLabels: true,
                    drawLabels: true,
                    minArrowSize: 6,
                    clone: false,
                    defaultNodeColor: '#454554',
                    enableEdgeHovering: true,
                    edgeHoverPrecision: 5,
                    minEdgeSize: 10
                    }
                    }>
                        <NodeShapes default='circle' />
                        <ForceAtlas2/>
                        <NOverlap gridSize={10} maxIterations={100}/>
                        <RandomizeNodePositions/>
                        <DragNodes
                        onDrag={function noRefCheck() {}}
                        onDragend={function noRefCheck() {}}
                        onDrop={function noRefCheck() {}}
                        onStartdrag={function noRefCheck() {}}
                        />
                        <RelativeSize initialSize={5}/>
                </Sigma>

            </Box>
            :
            <Center>
                <Flex>
                    <Heading>No results</Heading>
                    {noResults}
                </Flex>
            </Center>}
        </>
    );
};

export default sigma;