
import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  radius: number;
  value: number;
  layer: number;
  index: number;
}

interface Connection {
  from: Node;
  to: Node;
  weight: number;
}

const NeuralNetworkAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number>(0);

  const colors = {
    nodeRing: "#8B5CF6",
    nodeFill: "#9b87f5",
    connection: "#e5e1f9",
    activeConnection: "#7E69AB",
    text: "#FFFFFF",
    background: "rgba(255, 255, 255, 0.02)"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initNetwork();
    };

    const initNetwork = () => {
      const layerCount = 4;
      const nodesPerLayer = [4, 6, 6, 2];
      const layerPadding = 80;
      const layerWidth = (canvas.width - layerPadding * 2) / (layerCount - 1);
      const nodePadding = 20;
      
      nodesRef.current = [];
      connectionsRef.current = [];
      
      // Create nodes
      for (let layer = 0; layer < layerCount; layer++) {
        const layerHeight = Math.min(
          canvas.height - 100, 
          nodesPerLayer[layer] * 50
        );
        
        const startY = (canvas.height - layerHeight) / 2;
        const nodeSpacing = layerHeight / (nodesPerLayer[layer] - 1 || 1);
        
        for (let i = 0; i < nodesPerLayer[layer]; i++) {
          const y = nodesPerLayer[layer] === 1 
            ? canvas.height / 2 
            : startY + i * nodeSpacing;
          
          nodesRef.current.push({
            x: layerPadding + layer * layerWidth,
            y,
            radius: 8,
            value: Math.random(),
            layer,
            index: i
          });
        }
      }
      
      // Create connections
      for (let l = 0; l < layerCount - 1; l++) {
        const currentLayerNodes = nodesRef.current.filter(node => node.layer === l);
        const nextLayerNodes = nodesRef.current.filter(node => node.layer === l + 1);
        
        for (const fromNode of currentLayerNodes) {
          for (const toNode of nextLayerNodes) {
            connectionsRef.current.push({
              from: fromNode,
              to: toNode,
              weight: Math.random() * 2 - 1  // -1 to 1
            });
          }
        }
      }
    };

    const drawNetwork = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Subtle background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connectionsRef.current.forEach(conn => {
        const { from, to, weight } = conn;
        
        const now = Date.now() / 1000;
        const pulseSpeed = 0.5;
        const offset = (from.index * 0.1 + from.layer * 0.2) % 1;
        const phase = (now * pulseSpeed + offset) % 1;
        
        // Draw a pulse animation along the connection
        if (weight > 0) {
          const pulsePosX = from.x + (to.x - from.x) * phase;
          const pulsePosY = from.y + (to.y - from.y) * phase;
          
          ctx.beginPath();
          ctx.arc(pulsePosX, pulsePosY, 2, 0, Math.PI * 2);
          ctx.fillStyle = colors.activeConnection;
          ctx.fill();
        }
        
        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        
        const alpha = Math.abs(weight) * 0.5 + 0.1;
        ctx.strokeStyle = weight > 0 
          ? `rgba(155, 135, 245, ${alpha})` 
          : `rgba(51, 195, 240, ${alpha})`;
        
        ctx.lineWidth = Math.abs(weight) * 2;
        ctx.stroke();
      });
      
      // Draw nodes
      nodesRef.current.forEach(node => {
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        // Fill with gradient
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius
        );
        gradient.addColorStop(0, colors.nodeFill);
        gradient.addColorStop(1, colors.nodeRing);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Pulse effect
        const now = Date.now() / 1000;
        const pulsePeriod = 2 + node.index * 0.2 + node.layer * 0.5;
        const pulsePhase = (now % pulsePeriod) / pulsePeriod;
        
        if (pulsePhase < 0.2) {
          const pulseSize = (1 - pulsePhase / 0.2) * node.radius * 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + pulseSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(155, 135, 245, ${0.1 * (1 - pulsePhase / 0.2)})`;
          ctx.fill();
        }
      });
      
      // Update node values with some randomness for animation
      nodesRef.current.forEach(node => {
        // Gently vary node values
        const vibration = Math.sin(Date.now() / 1000 + node.index * 5) * 0.1;
        node.value = Math.max(0, Math.min(1, node.value + vibration * 0.01));
      });
    };

    const animate = () => {
      drawNetwork();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className={`w-full h-full ${className || ""}`}
    />
  );
};

export default NeuralNetworkAnimation;
