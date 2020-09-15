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
    },
  };

const sigma = ({graph}: SigmaProps) => {

    console.log(graph);

    return (
        <div>
            <Sigma graph={graph} settings={{drawEdges: true, clone: false}} style={{width:'600px', height:'600px'}}>
            <RelativeSize initialSize={1}/>
            <ForceLink background easing='cubicInOut'/>
            <RandomizeNodePositions/>
            </Sigma>
        </div>
    );
};

export default sigma;