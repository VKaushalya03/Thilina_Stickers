import { useEffect, useRef } from "react";

/**
 * HeroBackground — pure canvas grid, no images.
 * Vignettes use rgba(bg, alpha) so they blend naturally with the section bg.
 *
 * Usage inside <section id="home">:
 *   <HeroBackground t={t} />
 */
export default function HeroBackground({ t }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // ── Parse hex bg color → rgb tuple for rgba() vignettes ───────────────
    const hexToRgb = (hex) => {
      const h = hex.replace("#", "");
      return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
      ];
    };
    const [r, g, b] = hexToRgb(t.bg);
    const bg = (a) => `rgba(${r},${g},${b},${a})`;

    const isDark = t.isDark;

    // Grid lines — very subtle, theme-aware
    const gridAlpha = isDark ? 0.1 : 0.13;
    const accentAlpha = isDark ? 0.24 : 0.3;
    const diagAlpha = isDark ? 0.04 : 0.05;
    const dotAlpha = isDark ? 0.22 : 0.28;
    const dotBrAlpha = isDark ? 0.55 : 0.65;

    const gridLine = `rgba(15,134,198,${gridAlpha})`;
    const accentLine = `rgba(15,134,198,${accentAlpha})`;
    const diagLine = `rgba(15,134,198,${diagAlpha})`;
    const dot = `rgba(15,134,198,${dotAlpha})`;
    const dotBr = `rgba(15,134,198,${dotBrAlpha})`;

    const CELL = 80;

    const draw = (W, H) => {
      ctx.clearRect(0, 0, W, H);

      const centerX = W / 2;
      const centerY = H * 0.44;
      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;

      // ── Vertical lines with very slight perspective taper ────────────────
      for (let i = 0; i <= cols; i++) {
        const x = i * CELL;
        const taper = (x - centerX) * 0.012;
        const xBot = x - taper;
        const isAccent = Math.abs(x - Math.round(centerX / CELL) * CELL) < 2;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(xBot, H);
        ctx.strokeStyle = isAccent ? accentLine : gridLine;
        ctx.lineWidth = isAccent ? 1.0 : 0.65;
        ctx.stroke();
      }

      // ── Horizontal lines ─────────────────────────────────────────────────
      for (let j = 0; j <= rows; j++) {
        const y = j * CELL;
        const isAccent = Math.abs(y - Math.round(centerY / CELL) * CELL) < 2;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = isAccent ? accentLine : gridLine;
        ctx.lineWidth = isAccent ? 1.0 : 0.65;
        ctx.stroke();
      }

      // ── Diagonal speed lines ─────────────────────────────────────────────
      ctx.strokeStyle = diagLine;
      ctx.lineWidth = 0.55;
      for (let sx = -H; sx < W + H; sx += 200) {
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx - H * 0.5, H);
        ctx.stroke();
      }

      // ── Intersection dots ─────────────────────────────────────────────────
      const accentVx = Math.round(centerX / CELL) * CELL;
      const accentHy = Math.round(centerY / CELL) * CELL;

      for (let i = 1; i < cols; i++) {
        for (let j = 1; j < rows; j++) {
          const x = i * CELL;
          const y = j * CELL;
          if (Math.abs(x - centerX) > W * 0.46) continue;
          if (y < H * 0.06 || y > H * 0.88) continue;

          const bright =
            Math.abs(x - accentVx) < 2 || Math.abs(y - accentHy) < 2;

          ctx.beginPath();
          ctx.arc(x, y, bright ? 2.2 : 1.4, 0, Math.PI * 2);
          ctx.fillStyle = bright ? dotBr : dot;
          ctx.fill();
        }
      }

      // ── Vignettes — fade to exact bg color, no smoke ─────────────────────
      // Top
      let g1 = ctx.createLinearGradient(0, 0, 0, H * 0.3);
      g1.addColorStop(0, bg(1));
      g1.addColorStop(1, bg(0));
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H * 0.3);

      // Bottom
      let g2 = ctx.createLinearGradient(0, H * 0.75, 0, H);
      g2.addColorStop(0, bg(0));
      g2.addColorStop(1, bg(1));
      ctx.fillStyle = g2;
      ctx.fillRect(0, H * 0.75, W, H * 0.25);

      // Left
      let g3 = ctx.createLinearGradient(0, 0, W * 0.18, 0);
      g3.addColorStop(0, bg(1));
      g3.addColorStop(1, bg(0));
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, W * 0.18, H);

      // Right
      let g4 = ctx.createLinearGradient(W * 0.82, 0, W, 0);
      g4.addColorStop(0, bg(0));
      g4.addColorStop(1, bg(1));
      ctx.fillStyle = g4;
      ctx.fillRect(W * 0.82, 0, W * 0.18, H);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(W, H);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [t]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
