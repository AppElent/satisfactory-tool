import Calculator from './calculator';
import SatisfactoryNode, { NodeType } from './network/satisfactory-node';

interface SatisfactoryModelerJson {
  Version: string;
  Zoom: number;
  Data: {
    Name: string;
    X: number;
    Y: number;
    Parent?: string;
    Max?: number;
    machine?: string;
    capacity?: 'Pure' | 'Normal' | 'Impure';
  }[];
}

export default class SatisfactoryModelerConnector {
  constructor(public calculator: Calculator) {}

  getNodes = (input: SatisfactoryModelerJson) => {
    const nodes: SatisfactoryNode[] = [];
    for (const node of input.Data) {
      if (node.machine) {
        // Node is a miner
        const template = {
          id: `${node.Name}-mine`,
          type: 'mine' as NodeType,
          item: node.Name,
          amount: node.Max || 0,
        };
        nodes.push(new SatisfactoryNode(template));
      }
    }
    //const recipes = this.input.Data.filter(r => this.data.).map()
  };
}
