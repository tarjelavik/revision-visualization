import CytoscapeComponent from 'react-cytoscapejs';

const layout = {
  name: 'cose',
  animate: false,
  nodeDimensionsIncludeLabels: true,
  nodeOverlap: 280,
  componentSpacing: 40,
  nodeRepulsion: (node) => { return 2248; },
  gravity: 5.5,
  // Ideal edge (non nested) length
  idealEdgeLength(edge) { return 64; },

  // Divisor to compute edge forces
  edgeElasticity(edge) { return 32; },
};

const CytoscapeCose = (props) => {
  return (
    <CytoscapeComponent {...props} layout={layout} />
  );
};

export default CytoscapeCose;
