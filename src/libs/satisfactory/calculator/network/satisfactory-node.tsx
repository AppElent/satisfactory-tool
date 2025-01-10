import Node from './node';

export type NodeType =
  | 'mine'
  | 'sink'
  | 'product'
  | 'byproduct'
  | 'input'
  | 'recipe'
  | 'intermediate';

// interface NodeInterface {
//   id: string;
//   type: NodeType;
//   item: string;
//   amount: number;
// }

interface ItemAmount {
  item: string;
  amount: number;
}

export interface SatisfactoryNodeProps {
  type: NodeType;
  item: string;
  amount: number;
  label?: string;
}

const getLabel = (item: string, amount: number) => {
  return `${item}\n${amount} / min`;
};

const getNodeClass = (type: NodeType): string => {
  return type;
};

export default class SatisfactoryNode extends Node implements SatisfactoryNodeProps {
  public id: string;
  public type: NodeType;
  public item: string;
  public amount: number;
  public grossAmount: { [key: string]: number } = {};
  public usedAmount: { [key: string]: number } = {};

  constructor(node: SatisfactoryNodeProps) {
    super({
      id: node.type === 'recipe' ? node.item : `${node.item}-${node.type}`,
      label: node.label ?? getLabel(node.item, node.amount),
      class: getNodeClass(node.type),
    });
    this.id = node.type === 'recipe' ? node.item : `${node.item}-${node.type}`;
    this.type = node.type;
    this.item = node.item;
    this.amount = node.amount;
  }

  getInputs = (): ItemAmount[] => {
    throw new Error('Method not implemented.');
  };

  getOutputs = (): ItemAmount[] => {
    throw new Error('Method not implemented.');
  };

  useAmount = (item: string, amount: number) => {
    // Check usedAmount against amount and return the amount that can be used
    // Also account for overflow
    // TODO: add item to params and add to usedAmount
    const usedAmount = this.usedAmount[item];
    const grossAmount = this.grossAmount[item];
    if (usedAmount + amount > grossAmount) {
      const remaining = Math.round((grossAmount - usedAmount) * 1000) / 1000;
      this.usedAmount[item] = grossAmount;
      // If remaining is negative, return 0
      return remaining < 0 ? 0 : remaining;
    } else {
      this.usedAmount[item] += amount;
      return amount;
    }
  };

  toObject = () => {
    return {
      ...super.toObject(),
      type: this.type,
      item: this.item,
      amount: this.amount,
    };
  };
}
