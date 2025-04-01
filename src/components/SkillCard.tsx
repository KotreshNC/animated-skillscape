import React, { useEffect, useRef } from "react";
import { Brain, Code, Network, Database } from "lucide-react";

interface SkillCardProps {
  title: string;
  icon: "ml" | "nn" | "dl" | "code";
  description: string;
  animationDelay?: number;
}

interface CanvasAnimations {
  ml: (canvas: HTMLCanvasElement) => void;
  nn: (canvas: HTMLCanvasElement) => void;
  dl: (canvas: HTMLCanvasElement) => void;
  code: (canvas: HTMLCanvasElement) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, icon, description, animationDelay = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  const getIcon = () => {
    switch(icon) {
      case "ml": return <Brain className="w-8 h-8 text-portfolio-purple" />;
      case "nn": return <Network className="w-8 h-8 text-portfolio-purple" />;
      case "dl": return <Database className="w-8 h-8 text-portfolio-purple" />;
      case "code": return <Code className="w-8 h-8 text-portfolio-purple" />;
      default: return null;
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = 120;
    
    const animations: CanvasAnimations = {
      ml: (canvas) => {
        const ctx = canvas.getContext('2d')!;
        const width = canvas.width;
        const height = canvas.height;
        
        // K-means clustering visualization
        const clusters = [
          { x: width * 0.3, y: height * 0.5, color: '#8B5CF6' },
          { x: width * 0.7, y: height * 0.3, color: '#33C3F0' },
          { x: width * 0.6, y: height * 0.7, color: '#6E59A5' }
        ];
        
        const points: {x: number, y: number, cluster: number}[] = [];
        for (let i = 0; i < 30; i++) {
          const cluster = Math.floor(Math.random() * clusters.length);
          points.push({
            x: clusters[cluster].x + (Math.random() - 0.5) * width * 0.3,
            y: clusters[cluster].y + (Math.random() - 0.5) * height * 0.3,
            cluster
          });
        }
        
        const animate = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Draw points
          points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = clusters[point.cluster].color;
            ctx.fill();
          });
          
          // Draw centroids
          clusters.forEach(cluster => {
            ctx.beginPath();
            ctx.arc(cluster.x, cluster.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = cluster.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Move clusters slightly for animation
            cluster.x += (Math.random() - 0.5) * 0.5;
            cluster.y += (Math.random() - 0.5) * 0.5;
            
            // Keep within bounds
            cluster.x = Math.max(20, Math.min(width - 20, cluster.x));
            cluster.y = Math.max(20, Math.min(height - 20, cluster.y));
          });
          
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
      },
      
      nn: (canvas) => {
        const ctx = canvas.getContext('2d')!;
        const width = canvas.width;
        const height = canvas.height;
        
        // Neural network visualization with 3 layers
        const layers = [
          { nodes: 4, x: width * 0.2 },
          { nodes: 6, x: width * 0.5 },
          { nodes: 2, x: width * 0.8 }
        ];
        
        const nodes: {x: number, y: number, layer: number}[] = [];
        
        // Create nodes
        layers.forEach((layer, layerIndex) => {
          const spacing = height / (layer.nodes + 1);
          for (let i = 0; i < layer.nodes; i++) {
            nodes.push({
              x: layer.x,
              y: spacing * (i + 1),
              layer: layerIndex
            });
          }
        });
        
        const animate = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Draw connections
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.layer < layers.length - 1) {
              // Connect to all nodes in next layer
              const nextLayer = nodes.filter(n => n.layer === node.layer + 1);
              nextLayer.forEach(nextNode => {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(nextNode.x, nextNode.y);
                
                // Animate connection with time-based opacity
                const time = Date.now() / 1000;
                const uniqueOffset = (i * 0.1 + nextNode.y * 0.01) % 1;
                const opacity = 0.1 + 0.2 * Math.sin(time * 2 + uniqueOffset * 10);
                
                ctx.strokeStyle = `rgba(155, 135, 245, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Pulse animation
                const pulsePhase = (time + uniqueOffset) % 1;
                if (pulsePhase < 0.3) {
                  const pulsePos = pulsePhase / 0.3;
                  const x = node.x + (nextNode.x - node.x) * pulsePos;
                  const y = node.y + (nextNode.y - node.y) * pulsePos;
                  
                  ctx.beginPath();
                  ctx.arc(x, y, 2, 0, Math.PI * 2);
                  ctx.fillStyle = '#8B5CF6';
                  ctx.fill();
                }
              });
            }
          }
          
          // Draw nodes
          nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#9b87f5';
            ctx.fill();
            ctx.strokeStyle = '#8B5CF6';
            ctx.lineWidth = 1;
            ctx.stroke();
          });
          
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
      },
      
      dl: (canvas) => {
        const ctx = canvas.getContext('2d')!;
        const width = canvas.width;
        const height = canvas.height;
        
        // Deep learning layers visualization
        const layers = [
          { name: 'Input', x: width * 0.1, w: width * 0.12, h: height * 0.7 },
          { name: 'Conv', x: width * 0.28, w: width * 0.12, h: height * 0.6 },
          { name: 'Pool', x: width * 0.46, w: width * 0.1, h: height * 0.5 },
          { name: 'FC', x: width * 0.62, w: width * 0.08, h: height * 0.4 },
          { name: 'Output', x: width * 0.76, w: width * 0.06, h: height * 0.3 }
        ];
        
        const animate = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Draw layers
          layers.forEach((layer, index) => {
            // Layer rectangle
            ctx.fillStyle = `rgba(155, 135, 245, ${0.2 + index * 0.1})`;
            const y = (height - layer.h) / 2;
            ctx.fillRect(layer.x, y, layer.w, layer.h);
            
            // Layer border
            ctx.strokeStyle = '#8B5CF6';
            ctx.lineWidth = 1;
            ctx.strokeRect(layer.x, y, layer.w, layer.h);
            
            // Layer label below
            ctx.fillStyle = '#6E59A5';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(layer.name, layer.x + layer.w/2, height - 5);
            
            // Connect to next layer
            if (index < layers.length - 1) {
              const nextLayer = layers[index + 1];
              const nextY = (height - nextLayer.h) / 2;
              
              // Draw multiple connection lines
              const connCount = 5;
              for (let i = 0; i < connCount; i++) {
                const ratio = i / (connCount - 1);
                const startY = y + layer.h * ratio;
                const endY = nextY + nextLayer.h * ratio;
                
                ctx.beginPath();
                ctx.moveTo(layer.x + layer.w, startY);
                ctx.lineTo(nextLayer.x, endY);
                
                // Animate with time
                const time = Date.now() / 1000;
                const uniqueOffset = (index * 0.1 + i * 0.05) % 1;
                const opacity = 0.2 + 0.2 * Math.sin(time * 2 + uniqueOffset * 10);
                
                ctx.strokeStyle = `rgba(155, 135, 245, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                
                // Animation dots
                const pulsePhase = (time + uniqueOffset) % 1;
                if (pulsePhase < 0.5) {
                  const pulsePos = pulsePhase / 0.5;
                  const x = (layer.x + layer.w) + (nextLayer.x - (layer.x + layer.w)) * pulsePos;
                  const y = startY + (endY - startY) * pulsePos;
                  
                  ctx.beginPath();
                  ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                  ctx.fillStyle = '#33C3F0';
                  ctx.fill();
                }
              }
            }
          });
          
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
      },
      
      code: (canvas) => {
        const ctx = canvas.getContext('2d')!;
        const width = canvas.width;
        const height = canvas.height;
        
        const fontSize = 12;
        ctx.font = `${fontSize}px monospace`;
        
        const codeLines = [
          'function train(data) {',
          '  const model = new Model();',
          '  model.compile({',
          '    optimizer: "adam",',
          '    loss: "categorical"',
          '  });',
          '  return model.fit(data);',
          '}',
        ];
        
        let lineOffset = 0;
        const lineHeight = fontSize * 1.2;
        const startY = (height - codeLines.length * lineHeight) / 2;
        
        const animate = () => {
          ctx.clearRect(0, 0, width, height);
          
          // Draw code with typing effect
          const time = Date.now() / 1000;
          const fullCycle = 5; // seconds for full animation cycle
          const phase = (time % fullCycle) / fullCycle;
          const typingRate = 0.7; // percentage of cycle spent typing
          
          if (phase < typingRate) {
            // Typing phase
            const completionRatio = phase / typingRate;
            const visibleChars = Math.floor(completionRatio * 150); // Approximation of total chars
            
            let charCount = 0;
            for (let i = 0; i < codeLines.length; i++) {
              const line = codeLines[i];
              if (charCount + line.length < visibleChars) {
                // Full line is visible
                ctx.fillStyle = '#6E59A5';
                ctx.fillText(line, 10, startY + i * lineHeight);
                charCount += line.length;
              } else {
                // Partial line is visible
                const visiblePart = line.substring(0, visibleChars - charCount);
                ctx.fillStyle = '#6E59A5';
                ctx.fillText(visiblePart, 10, startY + i * lineHeight);
                
                // Cursor after visible part
                if (Math.floor(time * 2) % 2 === 0) {
                  const cursorX = 10 + ctx.measureText(visiblePart).width;
                  ctx.fillStyle = '#8B5CF6';
                  ctx.fillRect(cursorX, startY + i * lineHeight - fontSize, 2, fontSize);
                }
                
                break;
              }
            }
          } else {
            // Completed code display
            for (let i = 0; i < codeLines.length; i++) {
              // Syntax highlighting (simplified)
              const line = codeLines[i];
              let x = 10;
              
              // Basic syntax highlighting
              if (line.includes('function') || line.includes('return')) {
                const parts = line.split(/(function|return)/);
                for (let j = 0; j < parts.length; j++) {
                  if (parts[j] === 'function' || parts[j] === 'return') {
                    ctx.fillStyle = '#33C3F0';
                  } else {
                    ctx.fillStyle = '#6E59A5';
                  }
                  ctx.fillText(parts[j], x, startY + i * lineHeight);
                  x += ctx.measureText(parts[j]).width;
                }
              } else if (line.includes('new') || line.includes('compile') || line.includes('fit')) {
                const parts = line.split(/(new|compile|fit)/);
                for (let j = 0; j < parts.length; j++) {
                  if (parts[j] === 'new' || parts[j] === 'compile' || parts[j] === 'fit') {
                    ctx.fillStyle = '#C084FC';
                  } else {
                    ctx.fillStyle = '#6E59A5';
                  }
                  ctx.fillText(parts[j], x, startY + i * lineHeight);
                  x += ctx.measureText(parts[j]).width;
                }
              } else {
                ctx.fillStyle = '#6E59A5';
                ctx.fillText(line, x, startY + i * lineHeight);
              }
            }
          }
          
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animate();
      }
    };
    
    // Start animation with delay
    setTimeout(() => {
      animations[icon](canvas);
    }, animationDelay);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [icon, animationDelay]);
  
  return (
    <div 
      className="skill-card transform transition-all duration-500"
      style={{ 
        animationDelay: `${animationDelay}ms`, 
        opacity: 0, 
        animation: `fade-in 0.5s ${animationDelay}ms forwards` 
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        {getIcon()}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <canvas ref={canvasRef} className="w-full h-[120px] mt-auto rounded-lg bg-gray-50" />
    </div>
  );
};

export default SkillCard;
