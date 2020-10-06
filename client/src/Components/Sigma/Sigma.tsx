import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize, Filter, ForceAtlas2 } from 'react-sigma';

/* type SigmaProps = {
    graph: {
        nodes: {
            id: string,
            label: string
        }[],
        edges: {
                id: string,
                source: string,
                target: string,
                label: string
        }[]
    }
}; */

const containerStyle = {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    position: 'absolute' as 'absolute'
};

const sigmaStyle = {
    width: '50%',
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
                <Sigma style={sigmaStyle} graph={props.graph.graph} onOverNode={onOverNodeHandler} onClickNode={(event: any) => onClickNodeHandler(event)} rendered='canvas' settings={{drawLabels: true, clone: false}}>
                        <ForceAtlas2 background easing="cubicInOut"/>
                        <Filter/>
                        <RandomizeNodePositions/>
                        <RelativeSize initialSize={15}/>
                </Sigma>
            </div>
    );
};

export default sigma;