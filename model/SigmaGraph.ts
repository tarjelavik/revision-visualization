import Node from './Node';
import Edge from './Edge';

export default interface SigmaGraph {
  graph: {
    nodes: Node[],
    edges: Edge[]
  };
}