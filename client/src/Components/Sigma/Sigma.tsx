import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';

type SigmaProps = {
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
};

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

const sigma = ({graph}: SigmaProps) => {

    console.log(graph);

    return (
            <div style={containerStyle}>
                <Sigma style={sigmaStyle} graph={graph} rendered='canvas' settings={{drawEdges: true, clone: false}}>
                        <ForceLink/>
                        <RandomizeNodePositions/>
                        <RelativeSize initialSize={15}/>
                </Sigma>
            </div>
    );
};

export default sigma;