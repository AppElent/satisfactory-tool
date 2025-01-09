import satisfactoryData from '../../data/satisfactory-data';
import Edge from './edge';

interface SatisfactoryEdgeProps {
  source: string;
  target: string;
  amount: number;
  item: string;
  label?: string;
}

const getLabel = (item: string, amount: number) => {
  const prodName = satisfactoryData.getProduct(item)?.name as string;
  return `${prodName}\n${+amount.toFixed(3)} / min`;
};

export default class SatisfactoryEdge extends Edge implements SatisfactoryEdgeProps {
  public item: string;
  public amount: number;

  constructor(edge: SatisfactoryEdgeProps) {
    super({
      source: edge.source,
      target: edge.target,
      label: edge.label ?? getLabel(edge.item, edge.amount),
      class: 'edge',
    });
    this.item = edge.item;
    this.amount = edge.amount;
  }

  toObject = () => {
    return {
      source: this.source,
      target: this.target,
      amount: this.amount,
      item: this.item,
      label: this.label,
    };
  };
}
