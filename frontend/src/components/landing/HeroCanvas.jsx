import { useRef, useEffect } from 'react';

const CYAN = { r: 0, g: 229, b: 255 };
const GREEN = { r: 204, g: 255, b: 0 };

export const HeroCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * (window.devicePixelRatio > 1 ? 1.5 : 1);
      h = canvas.height = canvas.offsetHeight * (window.devicePixelRatio > 1 ? 1.5 : 1);
    };
    resize();
    window.addEventListener('resize', resize);

    // --- Nodes ---
    const NODE_COUNT = 80;
    const CONNECT_DIST = 180;
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const isAccent = Math.random() < 0.35;
      const color = isAccent ? (Math.random() < 0.5 ? CYAN : GREEN) : { r: 255, g: 255, b: 255 };
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: isAccent ? 2 + Math.random() * 1.5 : 1 + Math.random(),
        color,
        alpha: isAccent ? 0.5 + Math.random() * 0.3 : 0.15 + Math.random() * 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // --- Data Pulses (traveling along edges) ---
    const pulses = [];
    const spawnPulse = () => {
      if (pulses.length > 15) return;
      const a = Math.floor(Math.random() * NODE_COUNT);
      let b = -1;
      let bestDist = Infinity;
      for (let j = 0; j < NODE_COUNT; j++) {
        if (j === a) continue;
        const dx = nodes[a].x - nodes[j].x;
        const dy = nodes[a].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT_DIST && d < bestDist) { bestDist = d; b = j; }
      }
      if (b === -1) return;
      const color = Math.random() < 0.5 ? CYAN : GREEN;
      pulses.push({ from: a, to: b, progress: 0, speed: 0.008 + Math.random() * 0.012, color });
    };

    // --- Scan Line ---
    let scanY = 0;
    const scanSpeed = 0.4;

    let frameCount = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      frameCount++;

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulsePhase += n.pulseSpeed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = 1 + Math.sin(n.pulsePhase) * 0.3;
        const r = n.radius * pulse;
        const { color } = n;

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 6);
        grad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},${n.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(n.x - r * 6, n.y - r * 6, r * 12, r * 12);

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${n.alpha})`;
        ctx.fill();
      }

      // Data Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.progress;
        const y = a.y + (b.y - a.y) * p.progress;
        const { color } = p;

        // Trail
        const trailLen = 0.15;
        const startP = Math.max(0, p.progress - trailLen);
        const sx = a.x + (b.x - a.x) * startP;
        const sy = a.y + (b.y - a.y) * startP;
        const trailGrad = ctx.createLinearGradient(sx, sy, x, y);
        trailGrad.addColorStop(0, `rgba(${color.r},${color.g},${color.b},0)`);
        trailGrad.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0.6)`);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Head glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, `rgba(${color.r},${color.g},${color.b},0.8)`);
        glow.addColorStop(1, `rgba(${color.r},${color.g},${color.b},0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(x - 12, y - 12, 24, 24);

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},1)`;
        ctx.fill();
      }

      // Horizontal scan line
      scanY += scanSpeed;
      if (scanY > h) scanY = 0;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, 'rgba(0,229,255,0)');
      scanGrad.addColorStop(0.5, 'rgba(0,229,255,0.03)');
      scanGrad.addColorStop(1, 'rgba(0,229,255,0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, w, 60);

      // Spawn pulses periodically
      if (frameCount % 30 === 0) spawnPulse();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[1]"
      style={{ pointerEvents: 'none' }}
    />
  );
};
