import React, { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

interface Edge {
  from: number;
  to: number;
}

const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8; // 80% of viewport height
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Create nodes
    const nodeCount = 25;
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    
    // Orange color variations
    const orangeColors = [
      'rgba(255, 165, 0, 0.8)',   // Orange
      'rgba(255, 140, 0, 0.8)',   // Dark Orange
      'rgba(255, 120, 0, 0.8)',   // Redder Orange
      'rgba(255, 190, 0, 0.8)',   // Golden Orange
    ];
    
    // Generate random nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 3,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: orangeColors[Math.floor(Math.random() * orangeColors.length)]
      });
    }
    
    // Generate more connections (edges)
    // Ensure each node has at least 3 connections
    for (let i = 0; i < nodeCount; i++) {
      // Each node connects to 3-5 other nodes
      const connectionCount = Math.floor(Math.random() * 3) + 3;
      const connectedNodes = new Set<number>();
      
      for (let j = 0; j < connectionCount; j++) {
        // Try to find a node we haven't connected to yet
        let attempts = 0;
        let toNode;
        
        do {
          toNode = Math.floor(Math.random() * nodeCount);
          attempts++;
        } while ((toNode === i || connectedNodes.has(toNode)) && attempts < 10);
        
        if (toNode !== i) {
          edges.push({ from: i, to: toNode });
          connectedNodes.add(toNode);
        }
      }
    }
    
    // Animation frame function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw edges
      edges.forEach(edge => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        
        // Calculate distance for opacity
        const dx = fromNode.x - toNode.x;
        const dy = fromNode.y - toNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250; // Increased max distance for more connections
        
        if (distance < maxDistance) {
          const opacity = 0.7 * (1 - distance / maxDistance);
          
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = `rgba(255, 140, 0, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      
      // Draw and update nodes
      nodes.forEach(node => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace(')', ', 0.3)').replace('rgba', 'rgba');
        ctx.fill();
        
        // Update position with slight wiggle
        node.vx += (Math.random() - 0.5) * 0.03;
        node.vy += (Math.random() - 0.5) * 0.03;
        
        // Limit velocity
        const maxVel = 0.6;
        node.vx = Math.max(Math.min(node.vx, maxVel), -maxVel);
        node.vy = Math.max(Math.min(node.vy, maxVel), -maxVel);
        
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

export default NeuralNetworkBackground;