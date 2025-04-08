
import React, { useRef, useEffect } from 'react';

interface NatureBackgroundProps {
  type: 'leaves' | 'water' | 'forest';
  className?: string;
}

const NatureBackground: React.FC<NatureBackgroundProps> = ({ 
  type,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Animation properties
    let animationFrameId: number;
    
    // Different animation types
    switch (type) {
      case 'leaves':
        drawLeaves(ctx, canvas);
        break;
      case 'water':
        drawWater(ctx, canvas);
        break;
      case 'forest':
        drawForest(ctx, canvas);
        break;
      default:
        break;
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
    
    // Leaves animation
    function drawLeaves(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      const leaves: {
        x: number;
        y: number;
        size: number;
        speed: number;
        rotation: number;
        rotationSpeed: number;
        color: string;
      }[] = [];
      
      const greenShades = [
        '#73A580', // mindful
        '#5C8467', // mindful-dark
        '#A6C1AD', // mindful-light
        '#E8F0EA', // mindful-lighter
        '#4A6B53', // mindful-darker
      ];
      
      // Create leaves
      for (let i = 0; i < 20; i++) {
        leaves.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 10,
          speed: Math.random() * 0.5 + 0.1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          color: greenShades[Math.floor(Math.random() * greenShades.length)]
        });
      }
      
      const drawLeaf = (
        ctx: CanvasRenderingContext2D, 
        x: number, 
        y: number, 
        size: number, 
        rotation: number,
        color: string
      ) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.bezierCurveTo(size / 2, -size / 2, size, -size / 3, 0, size);
        ctx.bezierCurveTo(-size, -size / 3, -size / 2, -size / 2, 0, -size);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        
        ctx.restore();
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        leaves.forEach(leaf => {
          // Update position
          leaf.y += leaf.speed;
          leaf.rotation += leaf.rotationSpeed;
          
          // Draw leaf
          drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.color);
          
          // Reset if out of canvas
          if (leaf.y > canvas.height + leaf.size) {
            leaf.y = -leaf.size;
            leaf.x = Math.random() * canvas.width;
          }
        });
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Water ripples animation
    function drawWater(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      let time = 0;
      const waves: {
        x: number;
        y: number;
        radius: number;
        maxRadius: number;
        speed: number;
        opacity: number;
      }[] = [];
      
      const maxWaves = 10;
      
      const createWave = () => {
        if (waves.length < maxWaves && Math.random() < 0.05) {
          waves.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0,
            maxRadius: Math.random() * 100 + 50,
            speed: Math.random() * 2 + 1,
            opacity: 0.7
          });
        }
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw base water
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(115, 165, 128, 0.6)');
        gradient.addColorStop(1, 'rgba(166, 193, 173, 0.4)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create new wave occasionally
        createWave();
        
        // Update and draw waves
        for (let i = 0; i < waves.length; i++) {
          const wave = waves[i];
          wave.radius += wave.speed;
          wave.opacity -= 0.003;
          
          if (wave.opacity <= 0 || wave.radius > wave.maxRadius) {
            waves.splice(i, 1);
            i--;
            continue;
          }
          
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        time += 0.01;
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
    }
    
    // Forest with moving trees
    function drawForest(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      let time = 0;
      const trees: {
        x: number;
        height: number;
        width: number;
        swayAmount: number;
        swaySpeed: number;
        trunkColor: string;
        leafColor: string;
      }[] = [];
      
      // Create trees
      for (let i = 0; i < 15; i++) {
        const height = Math.random() * 200 + 100;
        trees.push({
          x: Math.random() * canvas.width,
          height: height,
          width: height / 10,
          swayAmount: Math.random() * 5 + 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          trunkColor: `rgb(${Math.floor(Math.random() * 30 + 60)}, ${Math.floor(Math.random() * 20 + 40)}, ${Math.floor(Math.random() * 10 + 10)})`,
          leafColor: `rgb(${Math.floor(Math.random() * 50 + 20)}, ${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 50 + 20)})`,
        });
      }
      
      // Sort trees by height to create depth
      trees.sort((a, b) => a.height - b.height);
      
      const drawTree = (
        ctx: CanvasRenderingContext2D, 
        x: number, 
        height: number, 
        width: number,
        sway: number,
        trunkColor: string,
        leafColor: string
      ) => {
        const trunkHeight = height * 0.4;
        const leafHeight = height * 0.6;
        const leafWidth = width * 3;
        
        // Draw trunk with sway
        ctx.beginPath();
        ctx.moveTo(x - width / 2, canvas.height);
        ctx.quadraticCurveTo(
          x + sway,
          canvas.height - trunkHeight / 2,
          x, 
          canvas.height - trunkHeight
        );
        ctx.lineTo(x + width / 2, canvas.height);
        ctx.fillStyle = trunkColor;
        ctx.fill();
        
        // Draw leaves (triangle shape)
        ctx.beginPath();
        ctx.moveTo(x - leafWidth / 2, canvas.height - trunkHeight);
        ctx.lineTo(x, canvas.height - trunkHeight - leafHeight);
        ctx.lineTo(x + leafWidth / 2, canvas.height - trunkHeight);
        ctx.fillStyle = leafColor;
        ctx.fill();
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw sky gradient
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#E6FAF5');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw ground
        ctx.fillStyle = '#73A580';
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        
        // Draw trees with sway
        trees.forEach(tree => {
          const sway = Math.sin(time * tree.swaySpeed) * tree.swayAmount;
          drawTree(
            ctx, 
            tree.x, 
            tree.height, 
            tree.width, 
            sway,
            tree.trunkColor,
            tree.leafColor
          );
        });
        
        time += 0.1;
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
    }
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full absolute inset-0 z-0 ${className}`}
    />
  );
};

export default NatureBackground;
