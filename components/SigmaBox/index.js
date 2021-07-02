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
import { getConstructLocationClause } from '../../pages/api/lib/query-templates/locationTemplate';

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
    // TODO: debug
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
    // TODO: debug
    relatedEdges.forEach(e => console.log('edge label:', e.label))
    relatedEdges.forEach(e => console.log('edge id:', e.id))
    relatedEdges.forEach(e => console.log('edge:', e))
    relatedEdges.forEach(e => console.log('edge label color:', e.labelColor))
    // change the color of the edges related to the clicked node
    relatedEdges.forEach(e => e.color = '#C21F30')

    const allUnrelatedEdges = graph.edges.filter(e => e.source !== event.data.node.id && e.target !== event.data.node.id)
    // keep the color of the unlated edges to original color
    allUnrelatedEdges.forEach(e => e.color = '#CFCCC9')
    getClickedNodeData(event.data.node.id);
    setDisplayDrawer();
  };

  const onClickStageHandler = (event) => {
    // TODO: debug
    console.log("stage is clicked, ", event.data)
    console.log("stage is clicked, camera", event.data.renderer.settings)
    console.log("stage is clicked, settings", event.data.renderer.settings)
    console.log("stage is clicked, ", event.data.renderer.settings)
    console.log("stage is clicked, edges on screens", event.data.renderer.edgesOnScreen)
    // TODO: it seems the following 2 lines dose not work
    event.data.renderer.settings('defaultEdgeHoverColor:', 'green')
    event.data.renderer.edgesOnScreen.forEach(e => e.edgeLabelColor = "black")
    // set color of edges to default color when clicking the stage
    event.data.renderer.edgesOnScreen.forEach(e => e.color = "#CFCCC9")
  }

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
            // TODO: debug
            onOverEdge={(edgeEvent) => {
              console.log("Mouse over edge: ", edgeEvent.data.edge.label);
            }}
            onClickStage={(stageEvent)=> onClickStageHandler(stageEvent)}
            renderer="canvas"
            settings={{
              // Global settings
              sideMargin: 400,
              scalingMode: "outside",
              font: "arial",
              hoverFontStyle: "bold",
              fontStyle: "bold",
              activeFontStyle: "bold",
              autoRescale: true,
              autoResize: true,
              clone: false,
              verbose: true, // log errors and warnings
              // Node
              minNodeSize: 5,
              maxNodeSize: 10,
              defaultNodeColor: '#4C566A',
              nodeHoverColor: "default",
              defaultNodeHoverColor: "#C1BE45",
              defaultNodeBorderColor: "#C1BE45",
              singleHover: true,
              // Node label
              drawLabels: false,
              labelThreshold: 100, // or 200
              labelColor: "default",
              labelHoverShadow: "default",
              labelHoverShadowColor: "#000",
              labelHoverBGColor: "default",
              labelHoverColor: "default",
              defaultHoverLabelBGColor: "#002147",
              defaultLabelHoverColor: "#fff",
              defaultLabelColor: "#fff",
              defaultLabelSize: 14,
              defaultLabelBGColor: "#002147",
              // Edge
              defaultEdgeColor: '#CFCCC9',
              defaultEdgeType: "curvedArrow",
              enableEdgeHovering: true,
              edgeHoverPrecision: 5,
              edgeHoverHighlightNodes: 'circle',
              edgeHoverSizeRatio: 3,
              edgeHoverExtremities: true,
              edgeColor: "default",
              edgeHoverColor: 'default',
              defaultEdgeHoverColor: "#2775B6",
              minArrowSize: 5,
              minEdgeSize: 1,
              // Edge label
              drawEdgeLabels: true,
              edgeLabelColor: 'default',
              // defaultEdgeLabelColor: '#000',
              // defaultEdgeLabelActiveColor: '#000',
              // defaultEdgeLabelSize: 12,
              // edgeLabelSize: 'fixed',              // Available values: fixed, proportional
              // edgeLabelAlignment: 'auto',          // Available values: auto, horizontal
              // edgeLabelSizePowRatio: 1,
              // edgeLabelThreshold: 1,
              // defaultEdgeHoverLabelBGColor: '#002147',
              // edgeLabelHoverBGColor: 'default',
              // edgeLabelHoverShadow: 'default',
              // edgeLabelHoverShadowColor: '#fff',
              // Captors
              zoomingRatio: 1.6,
              doubleClickZoomingRatio: 1.6,
              mouseZoomDuration: 500,
              doubleClickZoomDuration: 500,
              zoomMin: 0.001,
              zoomMax: 300
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
