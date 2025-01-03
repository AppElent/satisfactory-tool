export interface NodeInterface {
  id: string;
  label: string;
  class?: string;
}

export default class Node implements NodeInterface {
  public id: string;
  public label: string;
  public class?: string;

  constructor(node: NodeInterface) {
    this.id = node.id;
    this.label = node.label;
    this.class = node.class;
  }

  getLabel = (): string => {
    return this.label;
  };

  toObject() {
    return {
      id: this.id,
      label: this.label,
      class: this.class,
    };
  }
}
