import React, { useEffect, useState } from 'react';
import { Box, Stack, Center, Heading } from '@chakra-ui/react';
import {Sigma, RandomizeNodePositions, NOverlap, RelativeSize, DragNodes, ForceAtlas2 } from 'react-sigma';
import SigmaLoader from './SigmaLoader';
import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';
import { getActionId } from '../../pages/api/lib/helpers';

// const noResults = <IllustrationContainer src={ASSSET} alt='No results' heigth='800px' width='800px'/>;

const sigmaStyle = {
  height: '100vh',
  width: '100vw'
};

const SigmaBox = ({classes, getClickedNodeData, setDisplayDrawer}) => {
  const [graph, setGraph] = useState({});
  const [loading, setLoading] = useState(false);
  
  const onClickEdgeHandler = (event) => {
    // console.log('Edge clicked: ', event)
    getClickedNodeData(event.data.edge.actionId);
    setDisplayDrawer(true);
  };
  
  const onClickNodeHandler = (event) => {
    // console.log('Node clicked: ', event)
    getClickedNodeData(event.data.node.id);
    setDisplayDrawer(true);
  };

  const getGraph = async() => {
    setLoading(true);
    const response = await fetch(`api/graph/network/${encodeURIComponent(JSON.stringify(classes))}`);
    const body = await response.json();
    setGraph(body.graph);
    setLoading(false);
  };

  useEffect(() => {
    getGraph();
  }, [classes]);

  return (
    <>
    {graph?.nodes && !loading &&
      <Box w='100%' h='100%'>
        <Sigma
          style={sigmaStyle}
          onClickEdge={(edgeEvent) => onClickEdgeHandler(edgeEvent)}
          onClickNode={(nodeEvent) => onClickNodeHandler(nodeEvent)}
          renderer='canvas'
          settings={{
            sideMargin: 50,
            defaultLabelSize: 14,
            labelThreshold: 0,
            drawEdgeLabels: true,
            drawLabels: true,
            minArrowSize: 8,
            clone: false,
            minNodeSize: 16,
            defaultNodeColor: '#454554',
            enableEdgeHovering: true,
            edgeHoverSizeRatio: 3,
            edgeHoverPrecision: 5,
            minEdgeSize: 1,
            verbose: true
          }}
        >
          <SigmaLoader graph={graph}>
            <ForceAtlas2/>
            <NOverlap gridSize={1} maxIterations={1000}/>
            <RandomizeNodePositions/>
            <DragNodes
              // tslint:disable-next-line:no-empty
              onDrag={function noRefCheck() {}}
              // tslint:disable-next-line:no-empty
              onDragend={function noRefCheck() {}}
              // tslint:disable-next-line:no-empty
              onDrop={function noRefCheck() {}}
              // tslint:disable-next-line:no-empty
              onStartdrag={function noRefCheck() {}}
            />
            <RelativeSize initialSize={10}/>
          </SigmaLoader>
        </Sigma>

      </Box>}

      {loading &&
        <Center>
          <Stack direction='column'>
            <Box>
              <Heading as='h1' size='2xl' textAlign='center'>Loading data...</Heading>
            </Box>
          </Stack>
        </Center>
      } 

      {!graph.node && !loading && ( 
        <Center>
          <Stack direction='column'>
            {/* <Box>
              {noResults}
            </Box> */}
            <Box>
              <Heading as='h1' size='2xl' textAlign='center'>No results!</Heading>
              <Heading as='h2' size='xl' mt='4rem' textAlign='center'>Refresh the page to search again</Heading>
            </Box>
          </Stack>
        </Center>
      )}
    </>
  );
};

export default SigmaBox;
