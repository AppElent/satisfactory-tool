import Edge from '../calculator/edge';
import Node from '../calculator/node';
import Cytoscape from './cytoscape';

export default class Vizualization {
  public cytoscape: Cytoscape;
  constructor(
    public nodes: Node[],
    public edges: Edge[]
  ) {
    this.cytoscape = new Cytoscape();
  }

  toMermaid = () => {
    return '';
  };

  toCytoscape = () => {
    return '';
  };
}
