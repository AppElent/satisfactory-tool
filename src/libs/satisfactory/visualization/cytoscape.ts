import cytoscape, { Core, CytoscapeOptions, LayoutOptions, Stylesheet } from 'cytoscape';

// Default stylesheet
// const defaultStyles: Stylesheet[] = [
//   {
//     selector: 'node',
//     style: {
//       'background-color': '#666',
//       label: 'data(id)',
//     },
//   },
//   {
//     selector: 'edge',
//     style: {
//       width: 3,
//       'line-color': '#ccc',
//       'target-arrow-color': '#ccc',
//       'target-arrow-shape': 'triangle',
//       'curve-style': 'bezier',
//     },
//   },
// ];

const defaultStyles: Stylesheet[] = [
  // {
  //   selector: 'node[label]',
  //   style: {
  //     width: (node: any) => node.data('label').length * 7,
  //     height: 50,
  //     shape: 'round-rectangle',
  //     'font-size': '12px',
  //     label: 'data(label)',
  //     'text-valign': 'center',
  //     'text-halign': 'center',
  //     'text-wrap': 'wrap',
  //   },
  // },
  {
    selector: 'node',
    style: {
      'background-color': '#999',
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': '12px',
      color: '#fff',
      'text-wrap': 'wrap',
      //'text-max-width': '100px',
      shape: 'round-rectangle',
      width: (node: any) => node.data('label').length * 7,
      height: 50,
      // 'padding': '10px',
      'font-weight': 'bold',
    },
  },
  {
    selector: 'edge[label]',
    style: {
      label: 'data(label)',
      width: 3,
      // 'curve-style': 'segments',
      'text-wrap': 'wrap',
    },
  },
  {
    selector: '.input',
    style: {
      'background-color': '#af6d0e',
    },
  },
  {
    selector: '.product',
    style: {
      'background-color': '#50a050',
    },
  },
  {
    selector: '.recipe',
    style: {
      'background-color': '#df691a',
    },
  },
  {
    selector: '.byproduct',
    style: {
      'background-color': '#1b7089',
    },
  },
  {
    selector: '.mine',
    style: {
      'background-color': '#4e5d6c',
    },
  },
];

const defaultLayout: CustomLayout = {
  name: 'dagre',
  rankDir: 'LR',
  rankSep: 150,
  nodeSep: 100,
  edgeSep: 80,
  animate: true,
};

interface CyOptions extends Partial<CytoscapeOptions> {
  elements?: CytoscapeOptions['elements'];
}

type CustomLayout = LayoutOptions & {
  name: 'dagre' | 'elk';
  rankDir: 'LR' | 'TB';
  rankSep: number;
  nodeSep: number;
  edgeSep: number;
  animate: boolean;
};

export default class Cytoscape {
  public cy: Core;
  // public options: cytoscape.CytoscapeOptions;
  // public style = [
  //   {
  //     selector: 'node[label]',
  //     style: {
  //       width: 'label',
  //       height: 'label',
  //       shape: 'round-rectangle',
  //       'font-size': '12px',
  //       label: 'data(label)',
  //       'text-valign': 'center',
  //       'text-halign': 'center',
  //     },
  //   },
  //   {
  //     selector: 'edge[label]',
  //     style: {
  //       label: 'data(label)',
  //       width: 3,
  //       'curve-style': 'segments',
  //     },
  //   },
  // ];
  // public layout = {
  //   name: 'elk',
  //   fit: true,
  //   padding: 200,
  //   nodeDimensionIncludeLabels: true,
  //   elk: {
  //     algorithm: 'layered',
  //     edgeRouting: 'POLYLINE',
  //     'spacing.nodeNode': 200,
  //   },
  // };

  constructor(container: HTMLDivElement, options?: CyOptions) {
    this.cy = cytoscape({
      container,
      elements: options?.elements || [],
      style: options?.style || defaultStyles,
      layout: options?.layout || defaultLayout,
      zoom: options?.zoom || 1,
      pan: options?.pan || { x: 0, y: 0 },
      minZoom: options?.minZoom || 1e-50,
      maxZoom: options?.maxZoom || 1e50,
      zoomingEnabled: options?.zoomingEnabled ?? true,
      userZoomingEnabled: options?.userZoomingEnabled ?? true,
      panningEnabled: options?.panningEnabled ?? true,
      userPanningEnabled: options?.userPanningEnabled ?? true,
      boxSelectionEnabled: options?.boxSelectionEnabled ?? true,
      selectionType: options?.selectionType || 'single',
      ...options, // Spread additional options if provided
    });
  }

  get = () => {
    return this.cy;
  };

  toMermaid = () => {
    return '';
  };

  toCytoscape = () => {
    return '';
  };
}
