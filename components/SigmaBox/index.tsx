import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Box, Stack, Center, Heading } from '@chakra-ui/react';
import {Sigma, RandomizeNodePositions, NOverlap, RelativeSize, DragNodes, ForceAtlas2, SigmaEnableSVG } from 'react-sigma';
import IllustrationContainer from '../IllustrationContainer/IllustrationContainer';

// const noResults = <IllustrationContainer src={ASSSET} alt='No results' heigth='800px' width='800px'/>;

/* const onClickEdgeHandler = (e: any, props: any) => {
  props.getClickedNodeData(e.data.edge.actionId);
  props.setDisplayDrawer(true);
};

const onClickNodeHandler = (event: any, props: any) => {
  props.getClickedNodeData(event.data.node.id);
  props.setDisplayDrawer(true);
};
*/
const sigmaStyle = {
  height: '100vh',
  width: '100vw'
};


const SigmaBox = ({classes}) => {
  if(!classes) return null;
  console.log('From SigmaBox', classes);

  const [graph, setGraph] = useState({});

  const getGraph = async() => {
    console.log(graph);
    const response = await fetch(`api/graph/network/${encodeURIComponent(JSON.stringify(classes))}`);
    const body = await response.json();
    setGraph(body.graph);
  };

  useLayoutEffect(() => {
    getGraph();
    // Sigma.sigma.refresh()
  }, [classes]);

  return (
    <>
    {graph?.nodes ?
      <Box w='100%' h='100vh'>
        <Sigma
          style={sigmaStyle}
          graph={graph}
          /* onClickEdge={(e: any) => onClickEdgeHandler(e, props)}
          onClickNode={(event: any) => onClickNodeHandler(event, props)} */
          renderer='svg'
          settings={{
            sideMargin: 10,
            defaultLabelSize: 16,
            labelThreshold: 0,
            drawEdgeLabels: true,
            drawLabels: true,
            minArrowSize: 6,
            clone: false,
            defaultNodeColor: '#454554',
            enableEdgeHovering: true,
            edgeHoverSizeRatio: 1,
            edgeHoverPrecision: 5,
            minEdgeSize: 10
          }}
        >
          <ForceAtlas2/>
          <NOverlap gridSize={10} maxIterations={100}/>
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
        </Sigma>

      </Box>
      :
      <Center>
        <Stack direction='column'>
          {/* <Box>
            {noResults}
          </Box> */}
          <Box>
            <Heading as='h1' size='4xl' textAlign='center'>No results!</Heading>
            <Heading as='h2' size='2xl' mt='4rem' textAlign='center'>Refresh the page to search again</Heading>
          </Box>
        </Stack>
      </Center>}
    </>
  );
};

export default SigmaBox;
