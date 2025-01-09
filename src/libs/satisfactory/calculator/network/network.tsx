import Edge from './edge';
import Node from './node';

interface NetworkInterface {
  nodes: Node[];
  edges: Edge[];
}

export default class Network implements NetworkInterface {
  public nodes: Node[] = [];
  public edges: Edge[] = [];
  constructor(nodes?: Node[], edges?: Edge[]) {
    this.nodes = nodes || [];
    this.edges = edges || [];
  }

  setNodes = (nodes: Node[]) => {
    this.nodes = nodes;
  };

  setEdges = (edges: Edge[]) => {
    this.edges = edges;
  };

  addNode = (node: Node) => {
    this.nodes.push(node);
  };

  addEdge = (edge: Edge) => {
    this.edges.push(edge);
  };

  removeNode = (node: Node) => {
    this.nodes = this.nodes.filter((n) => n.id !== node.id);
  };

  removeEdge = (edge: Edge) => {
    this.edges = this.edges.filter((e) => e.id !== edge.id);
  };

  toMermaid = () => {};

  toCytoscape = () => {
    console.log(this);
    return {
      nodes: this.nodes.map((n) => ({
        data: {
          id: n.id,
          label: n.getLabel(),
        },
        classes: n.class,
      })),
      edges: this.edges.map((e) => ({
        data: {
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.getLabel(),
        },
        classes: e.class,
      })),
    };
  };

  toObject = () => {
    return {
      nodes: this.nodes.map((n) => n.toObject()),
      edges: this.edges.map((e) => e.toObject()),
    };
  };

  mergeNetworks = (networks: Network[]): void => {
    const nodes = this.nodes || [];
    const edges = this.edges || [];
    for (const network of networks) {
      nodes.push(...network.nodes);
      edges.push(...network.edges);
    }
    this.nodes = nodes;
    this.edges = edges;
  };
}
