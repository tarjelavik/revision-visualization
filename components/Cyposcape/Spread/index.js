import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import spread from 'cytoscape-spread';

spread(Cytoscape);

const layout = {
  name: 'spread',
  animate: true, // Whether to show the layout as it's running
  ready: undefined, // Callback on layoutready
  stop: undefined, // Callback on layoutstop
  fit: true, // Reset viewport to fit default simulationBounds
  minDist: 20, // Minimum distance between nodes
  padding: 20, // Padding
  expandingFactor: -1.0, // If the network does not satisfy the minDist
  // criterium then it expands the network of this amount
  // If it is set to -1.0 the amount of expansion is automatically
  // calculated based on the minDist, the aspect ratio and the
  // number of nodes
  prelayout: { name: 'cose' }, // Layout options for the first phase
  maxExpandIterations: 4, // Maximum number of expanding iterations
  boundingBox: undefined, // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  randomize: false // Uses random initial node positions on true
};

// Something wrong here!!

const CytoscapeSpread = (props) => {
  return (
    <CytoscapeComponent {...props} layout={layout} />
  );
};

export default CytoscapeSpread;
