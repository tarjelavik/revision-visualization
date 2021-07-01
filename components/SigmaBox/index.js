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
import ForceLink from 'react-sigma/lib/ForceLink'
import SigmaLoader from './SigmaLoader';

const sigmaStyle = {
  height: '100vh',
  width: '100vw',
};

const SigmaBox = ({ classes, getClickedNodeData, setDisplayDrawer }) => {
  const [graph, setGraph] = useState({});
  const [loading, setLoading] = useState(false);

  const onClickEdgeHandler = (event) => {
    // change color of edges of the clicked edge
    event.data.edge.color = '#C21F30'
    console.log('id of the clicked edge:', event.data.edge.id)
    const allOtherEdges = graph.edges.filter(e => e.id !== event.data.edge.id)
    // keep color of unclicked edges to original color:
    allOtherEdges.forEach(e => e.color = '#CFCCC9')
    console.log(allOtherEdges)
    getClickedNodeData(event.data.edge.actionId);
    setDisplayDrawer();
  };

  const onClickNodeHandler = (event) => {
    const relatedEdges = graph.edges.filter(e => e.source === event.data.node.id || e.target === event.data.node.id)
    // change the color of the edges related to the clicked node 
    relatedEdges.forEach(e => e.color = '#C21F30')
    const allUnrelatedEdges = graph.edges.filter(e => e.source !== event.data.node.id && e.target != event.data.node.id)
    // keep the color of the unlated edges to original color 
    allUnrelatedEdges.forEach(e => e.color = '#CFCCC9')
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
              labelThreshold: 200,
              drawEdgeLabels: true,
              drawLabels: true,
              clone: false,
              minArrowSize: 5,
              minNodeSize: 6,
              minEdgeSize: 1,
              enableEdgeHovering: true,
              defaultEdgeHoverColor: "#2775B6",
              edgeHoverColor: 'default',
              edgeHoverSizeRatio: 3,
              edgeHoverPrecision: 5,
              defaultNodeColor: '#4C566A',
              defaultEdgeColor: '#CFCCC9',
              edgeColor: "default",
              verbose: true,
            }}
          >
            <SigmaLoader graph={graph}>
              <RandomizeNodePositions>
                <NOverlap 
                    easing="quadraticInOut"
                    duration={2000}
                    gridSize={20}
                    maxIterations = { 100 }
                    nodeMargin={20}
                    scaleNodes = { 4 }
                    speed={10} 
                />
                <RelativeSize initialSize={100} />
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
              </RandomizeNodePositions>
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
