import { SatisfactoryItem } from '../../data/product';
import satisfactoryData from '../../data/satisfactory-data';
import SatisfactoryNode, { SatisfactoryNodeProps } from './satisfactory-node';

const getLabel = (item: string, amount: number) => {
  const prodName = satisfactoryData.getProduct(item)?.name as string;
  return `${prodName}\n${amount} / min`;
};

export default class ProductNode extends SatisfactoryNode {
  public product: SatisfactoryItem;
  constructor(node: SatisfactoryNodeProps) {
    super({
      ...node,
      label: node.label ?? getLabel(node.item, node.amount),
    });
    this.product = satisfactoryData.getProduct(node.item) as SatisfactoryItem;
    if (!this.product) {
      throw new Error(`Product ${node.item} not found`);
    }
    this.initAmounts();
  }

  initAmounts = () => {
    this.usedAmount = {
      [this.product.className]: 0,
      [this.product.className]: this.amount,
    };
  };

  getInputs = () => {
    // Mine or Input dont have inputs
    if (['mine', 'input', 'item'].includes(this.type)) {
      return [];
      // Recipe has ingredients
    } else {
      return [
        {
          item: this.item,
          amount: this.amount,
        },
      ];
    }
  };

  getOutputs = () => {
    if (['mine', 'input'].includes(this.type)) {
      return [
        {
          item: this.item,
          amount: this.amount,
        },
      ];
    }
    return [];
  };
}
