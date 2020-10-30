import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize, DragNodes } from 'react-sigma';

const containerStyle = {
    maxWidth: '100%',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    position: 'absolute' as 'absolute'
};

const sigmaStyle = {
    width: '100%',
    height: '100%',
};

const onOverNodeHandler = (e: any) => {
    console.log(e)
    console.log('im hovering over a node');
}

const onClickNodeHandler = (event: any, props: any) => {
    props.getClickedNodeData(event.data.node.id);
    console.log(event.data)
}


const sigma = (props: any) => {
    return (
            <div style={containerStyle}>
                <Sigma
                style={sigmaStyle}
                graph={props.graph.graph}
                onClickEdge={(e: any) => onOverNodeHandler(e)}
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
                        <RandomizeNodePositions>
                        <DragNodes
                        onDrag={function noRefCheck() {}}
                        onDragend={function noRefCheck() {}}
                        onDrop={function noRefCheck() {}}
                        onStartdrag={function noRefCheck() {}}
                        />
                        </RandomizeNodePositions>
                        <RelativeSize initialSize={5}/>
                </Sigma>
            </div>
    );
};

export default sigma;