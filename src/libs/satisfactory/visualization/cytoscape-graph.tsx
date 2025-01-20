import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { useEffect, useRef } from 'react';
import SatisfactoryNetwork from '../calculator/network/satisfactory-network';
import Cytoscape from './cytoscape';

cytoscape.use(dagre);

const CytoscapeGraph = ({ network }: { network: SatisfactoryNetwork }) => {
  const cyRef = useRef<HTMLDivElement>(null);

  //   const network = useMemo(() => {
  //     return new SatisfactoryNetwork();
  //   }, []);

  useEffect(() => {
    if (!cyRef.current) return;
    const cyNetwork = network.toCytoscape();
    const cy = new Cytoscape(cyRef.current, {
      elements: {
        nodes: cyNetwork.nodes,
        edges: cyNetwork.edges,
      },
      minZoom: 0.1,
      maxZoom: 1.5,
    }).get();
    console.log('CY', cyNetwork);

    // cy.on('mouseover', 'node', (event) => {
    //   const node = event.target.data();
    //   setSelectedNode(node);
    //   const position = event.target.renderedPosition();
    //   setTooltipPosition({ x: position.x, y: position.y });
    //   setIsTooltipOpen(true);
    // });

    // cy.on('mouseout', 'node', () => {
    //   setIsTooltipOpen(false);
    // });

    // cy.on('tap', (event) => {
    //   if (event.target === cy) {
    //     setSelectedNode(null);
    //     setIsTooltipOpen(false);
    //   }
    // });

    return () => {
      cy.destroy();
    };
  }, [network]);

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '600px' }}>
        <div
          ref={cyRef}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default CytoscapeGraph;
