import React from 'react';
import { Box } from '@chakra-ui/react';
import {Sigma, RandomizeNodePositions, NOverlap, RelativeSize, DragNodes, ForceAtlas2, NodeShapes } from 'react-sigma';

// This has to be modified
const containerStyle = {
    backgroundColor: 'red',
    width: '10%',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    position: 'absolute' as 'absolute'
};

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
    return (
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
    );
};

export default sigma;