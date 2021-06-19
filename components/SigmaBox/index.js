import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import {
  Sigma,
  RandomizeNodePositions,
  NOverlap,
  RelativeSize,
  DragNodes,
  ForceAtlas2,
} from 'react-sigma';
import SigmaLoader from './SigmaLoader';

const sigmaStyle = {
  height: '100vh',
  width: '100vw',
};

const SigmaBox = ({ classes, getClickedNodeData, setDisplayDrawer }) => {
  const [graph, setGraph] = useState({});
  const [loading, setLoading] = useState(false);

  const onClickEdgeHandler = (event) => {
    // console.log('Edge clicked: ', event)
    getClickedNodeData(event.data.edge.actionId);
    setDisplayDrawer();
  };

  const onClickNodeHandler = (event) => {
    // console.log('Node clicked: ', event)
    getClickedNodeData(event.data.node.id);
    setDisplayDrawer();
  };

  const getGraph = async () => {
    setLoading(true);
    const response = await fetch(
      `api/graph/network/${encodeURIComponent(JSON.stringify(classes))}`
    );
    const body = await response.json();
    setGraph(body.graph);
    setLoading(false);
  };

  useEffect(() => {
    void getGraph();
  }, [classes]);

  return (
    <>
      {loading && (
        <Flex h="80vh" justifyContent="center" align="center">
          <Heading as="p" size="xl">
            Loading data...
          </Heading>
        </Flex>
      )}

      {graph?.nodes && !loading && (
        <Box w="full" h="full" position="relative">
          <Sigma
            style={sigmaStyle}
            onClickEdge={(edgeEvent) => onClickEdgeHandler(edgeEvent)}
            onClickNode={(nodeEvent) => onClickNodeHandler(nodeEvent)}
            renderer="canvas"
            settings={{
              sideMargin: 50,
              defaultLabelSize: 14,
              labelThreshold: 0,
              drawEdgeLabels: true,
              drawLabels: true,
              minArrowSize: 8,
              clone: false,
              minNodeSize: 10,
              defaultNodeColor: '#454554',
              enableEdgeHovering: true,
              edgeHoverSizeRatio: 5,
              edgeHoverPrecision: 5,
              minEdgeSize: 1,
              verbose: true,
            }}
          >
            <SigmaLoader graph={graph}>
              <ForceAtlas2 background easing="cubicInOut" />
              <RandomizeNodePositions />
              <NOverlap gridSize={20} maxIterations={100} />
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
              <RelativeSize initialSize={8} />
            </SigmaLoader>
          </Sigma>
        </Box>
      )}

      {!graph.nodes && !loading && (
        <Flex h="80vh" justifyContent="center" align="center">
          <Heading as="h1" size="2xl" textAlign="center">
            No results!
          </Heading>
          <Heading as="h2" size="xl" mt="4rem" textAlign="center">
            Refresh the page to search again
          </Heading>
        </Flex>
      )}
    </>
  );
};

export default SigmaBox;