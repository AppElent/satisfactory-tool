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
  return `${prodName}\n${amount} / min`;
};

export default class SatisfactoryEdge extends Edge {
  constructor(edge: SatisfactoryEdgeProps) {
    super({
      source: edge.source,
      target: edge.target,
      label: edge.label ?? getLabel(edge.item, edge.amount),
      class: 'edge',
    });
  }
}
