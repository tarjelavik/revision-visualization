import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize, Filter, ForceAtlas2, DragNodes } from 'react-sigma';

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

const onOverNodeHandler = () => {
    console.log('im hovering over a node');
}

const onClickNodeHandler = (event: any) => {
    console.log('im clicking a node');
    console.log(event);
}


const sigma = (props: any) => {
    return (
            <div style={containerStyle}>
                <Sigma
                style={sigmaStyle}
                graph={props.graph.graph}
                onOverNode={onOverNodeHandler}
                onClickNode={(event: any) => onClickNodeHandler(event)}
                renderer='canvas'
                settings={
                    {
                    scalingMode: 'outside',
                    drawEdgeLabels: true,
                    drawLabels: true,
                    clone: false,
                    defaultNodeColor: '#3388AA',
                    }
                    }>
                        <ForceAtlas2 background easing="cubicInOut"/>
                        <Filter/>
                        <RandomizeNodePositions>
                        <DragNodes
                        onDrag={function noRefCheck() {}}
                        onDragend={function noRefCheck() {}}
                        onDrop={function noRefCheck() {}}
                        onStartdrag={function noRefCheck() {}}
                        />
                        </RandomizeNodePositions>
                        <RelativeSize initialSize={15}/>
                </Sigma>
            </div>
    );
};

export default sigma;