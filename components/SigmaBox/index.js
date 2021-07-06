import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import {
  Sigma,
  RandomizeNodePositions,
  NOverlap,
  RelativeSize,
  DragNodes,
  orceAtlas2,
} from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink'
import SigmaLoader from './SigmaLoader';
import { getConstructLocationClause } from '../../pages/api/lib/query-templates/locationTemplate';

const sigmaStyle = {
  height: '100vh',
  width: '100vw',
};

const SigmaBox = ({ classes, getClickedNodeDataInfo, setDisplayClickedNodeInfo, 
                  getClickedEdgeInfo, setDisplayClickedEdgeInfo, 
                  //getOverEdgeInfo, setDisplayOverEdgeInfo, closeDisplayOverEdgeInfo
                }) => {

  const [graph, setGraph] = useState({});
  const [loading, setLoading] = useState(false);

  const onClickEdgeHandler = (event) => {
    // change color of edges of the clicked edge
    event.data.edge.color = '#C21F30'
    
    const allOtherEdges = graph.edges.filter(e => e.id !== event.data.edge.id)
    // keep color of unclicked edges to original color:
    allOtherEdges.forEach(e => e.color = '#CFCCC9')
    // display edge label if it is not empty
    if (event.data.edge.label !== '') {
      const edgeSource = graph.nodes.filter(n => n.id === event.data.edge.source)
      const edgeTarget = graph.nodes.filter(n => n.id === event.data.edge.target) 
      // TODO: debug edge label and connected ndoes labels -Rui
      console.log('edge source: ', edgeSource[0].label)
      console.log('edge target: ', edgeTarget[0].label)
      const edgeInfo = {
        label: event.data.edge.label,
        source: edgeSource[0].label,
        target: edgeTarget[0].label,
        coordinateX: event.data.captor.clientX,
        coordinateY: event.data.captor.clientY,
      } 
      // display
      getClickedEdgeInfo(edgeInfo)
      //getClickedEdgeLabel(event.data.edge.label)
      setDisplayClickedEdgeInfo();
    }
  };

  const onClickNodeHandler = (event) => {
    const relatedEdges = graph.edges.filter(e => e.source === event.data.node.id || e.target === event.data.node.id)
    // change the color of the edges related to the clicked node
    relatedEdges.forEach(e => e.color = '#C21F30')

    const allUnrelatedEdges = graph.edges.filter(e => e.source !== event.data.node.id && e.target !== event.data.node.id)
    // keep the color of the unlated edges to original color
    allUnrelatedEdges.forEach(e => e.color = '#CFCCC9')
    // TODO: debug -Rui
    console.log("node info:", event.data.node)
    console.log("node info - client X:", event.data.captor.clientX)
    console.log("node info - client Y:", event.data.captor.clientY)
    // create node info -Rui
    const nodeInfo = {
      label: event.data.node.label,
      coordinateX: event.data.captor.clientX,
      coordinateY: event.data.captor.clientY,
    }
    getClickedNodeDataInfo(event.data.node.id, nodeInfo);
    setDisplayClickedNodeInfo();
  };

  const onClickStageHandler = (event) => {
    // TODO: debug -Rui
    console.log("stage is clicked, edges on screens", event.data.renderer.edgesOnScreen)
    console.log("tage is clicked, nodes on screens", event.data.renderer.nodesOnScreen)
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
            // add eventfor the stage -Rui
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
              drawLabels: true,
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
              drawEdgeLabels: false,
              //drawEdgeLabels: true,
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
