interface EdgeInterface {
  id?: string;
  source: string;
  target: string;
  label: string;
  class?: string;
}

export default class Edge implements EdgeInterface {
  public id: string;
  public source: string;
  public target: string;
  public label: string;
  public class?: string;

  constructor(edge: EdgeInterface) {
    this.id = edge.id || `${edge.source}-${edge.target}`;
    this.source = edge.source;
    this.target = edge.target;
    this.label = edge.label;
    this.class = edge.class;
  }

  getLabel = (): string => {
    return this.label;
  };

  toObject = (): EdgeInterface => {
    return {
      id: this.id,
      source: this.source,
      target: this.target,
      label: this.label,
      class: this.class,
    };
  };
}
