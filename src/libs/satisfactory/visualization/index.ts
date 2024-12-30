import Edge from '../calculator/network/edge';
import Network from '../calculator/network/network';
import Node from '../calculator/network/node';

export default class Vizualization {
  //public cytoscape: Cytoscape;
  public network: Network;
  constructor(
    public nodes: Node[],
    public edges: Edge[]
  ) {
    //this.cytoscape = new Cytoscape();
    this.network = new Network(nodes, edges);
  }

  toMermaid = () => {
    return '';
  };

  toCytoscape = () => {
    return '';
  };
}
