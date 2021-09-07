import Cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import klay from 'cytoscape-klay';

Cytoscape.use(klay);

const layout = { name: 'klay' };

const ClientCytoscape = (props) => {
  return (
    <CytoscapeComponent {...props} layout={layout} />
  );
};

export default ClientCytoscape;
