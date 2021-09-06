import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import d3Force from 'cytoscape-d3-force';

Cytoscape.use(d3Force);

const layout = {
  name: 'd3-force',
  animate: true, // whether to show the layout as it's running; special 'end' value makes the layout animate like a discrete layout
  maxIterations: 0, // max iterations before the layout will bail out
  maxSimulationTime: 0, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fixedAfterDragging: false, // fixed node after dragging
  fit: false, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  /** d3-force API**/
  alpha: 1, // sets the current alpha to the specified number in the range [0,1]
  alphaMin: 0.001, // sets the minimum alpha to the specified number in the range [0,1]
  alphaDecay: 1 - Math.pow(0.001, 1 / 300), // sets the alpha decay rate to the specified number in the range [0,1]
  alphaTarget: 0, // sets the current target alpha to the specified number in the range [0,1]
  velocityDecay: 0.4, // sets the velocity decay factor to the specified number in the range [0,1]
  collideRadius: 1, // sets the radius accessor to the specified number or function
  collideStrength: 0.7, // sets the force strength to the specified number in the range [0,1]
  collideIterations: 1, // sets the number of iterations per application to the specified number
  linkId: (d) => {
    return d.index;
  }, // sets the node id accessor to the specified function
  linkDistance: 30, // sets the distance accessor to the specified number or function
  linkStrength: (link) => {
    return 1 / Math.min(count(link.source), count(link.target));
  }, // sets the strength accessor to the specified number or function
  linkIterations: 1, // sets the number of iterations per application to the specified number
  manyBodyStrength: -30, // sets the strength accessor to the specified number or function
  manyBodyTheta: 0.9, // sets the Barnes–Hut approximation criterion to the specified number
  manyBodyDistanceMin: 1, // sets the minimum distance between nodes over which this force is considered
  manyBodyDistanceMax: Infinity, // sets the maximum distance between nodes over which this force is considered
  xStrength: 0.1, // sets the strength accessor to the specified number or function
  xX: 0, // sets the x-coordinate accessor to the specified number or function
  yStrength: 0.1, // sets the strength accessor to the specified number or function
  yY: 0, // sets the y-coordinate accessor to the specified number or function
  radialStrength: 0.1, // sets the strength accessor to the specified number or function
  radialRadius: [radius], // sets the circle radius to the specified number or function
  radialX: 0, // sets the x-coordinate of the circle center to the specified number
  radialY: 0, // sets the y-coordinate of the circle center to the specified number
  // layout event callbacks
  ready() { }, // on layoutready
  stop() { }, // on layoutstop
  tick(progress) { }, // on every iteration
  // positioning options
  randomize: false, // use random node positions at beginning of layout
  // infinite layout options
  infinite: false // overrides all other options for a forces-all-the-time mode
};

// NB! Breaks on missing nodes and adges

const CytoscapeCola = (props) => {
  return (
    <CytoscapeComponent {...props} layout={layout} />
  );
};

export default CytoscapeCola;
