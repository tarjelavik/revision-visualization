import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize, LoadGEXF} from 'react-sigma';
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
            <div style={{width:'auto', height:'auto'}}>
                <Sigma rendered='canvas' settings={{clone: false}}>
                    <LoadGEXF path='miserables.gexf'>
                        <ForceLink/>
                        <RandomizeNodePositions/>
                        <RelativeSize initialSize={15}/>
                    </LoadGEXF>
                </Sigma>
            </div>
    );
};

export default sigma;