import cytoscape from 'cytoscape';

export default class Cytoscape {
  public cy: any;
  public options: cytoscape.CytoscapeOptions;
  public style = [
    {
      selector: 'node[label]',
      style: {
        width: 'label',
        height: 'label',
        shape: 'round-rectangle',
        'font-size': '12px',
        label: 'data(label)',
        'text-valign': 'center',
        'text-halign': 'center',
      },
    },
    {
      selector: 'edge[label]',
      style: {
        label: 'data(label)',
        width: 3,
        'curve-style': 'segments',
      },
    },
  ];
  public layout = {
    name: 'elk',
    fit: true,
    padding: 200,
    nodeDimensionIncludeLabels: true,
    elk: {
      algorithm: 'layered',
      edgeRouting: 'POLYLINE',
      'spacing.nodeNode': 200,
    },
  };

  constructor() {
    this.options = {
      container: document.getElementById('cy'),
      elements: {
        nodes: [],
        edges: [],
      },
      // @ts-ignore
      style: this.style,
      layout: this.layout,
    };
    this.cy = cytoscape(this.options);
  }

  toMermaid = () => {
    return '';
  };

  toCytoscape = () => {
    return '';
  };
}
