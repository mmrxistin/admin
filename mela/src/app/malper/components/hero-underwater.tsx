// BismillahirRahmanirRahim
// El Hamdu Lillahi Rabbul Alemin
// Esselatu vesselamu ala rasulina Muhammedin .
"use client";

import { useEffect, useRef } from "react";

/**
 * Akvaryum içinde teknoloji sahnesi — sade ve fare etkileşimli.
 * - Akvaryum: cam dikdörtgen çerçeve, içinde balıklar yüzer.
 * - Teknoloji: merkezde yavaş dönen çip + akan devre sinyalleri.
 * - Fare: balıklar fareye yönelir; imleç çipe yaklaşınca çip parlar.
 */
export default function HeroUnderwaterScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cv: HTMLCanvasElement = canvas;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const cx: CanvasRenderingContext2D = ctx;
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    // Fare konumu — canvas koordinatlarında
    const mouse = { x: -9999, y: -9999, inside: false };

    function resize() {
      const parent = cv.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      cv.width = w;
      cv.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height;
    }
    window.addEventListener("mousemove", onMove);

    // ---- Balıklar ----
    type Fish = {
      x: number; y: number;          // akvaryum içindeki oransal konum (0..1)
      vx: number; vy: number;        // hız
      size: number; hue: number; phase: number;
    };
    const fishes: Fish[] = Array.from({ length: 9 }, (_, i) => ({
      x: Math.random(),
      y: 0.2 + Math.random() * 0.6,
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.5),
      vy: (Math.random() - 0.5) * 0.1,
      size: 12 + Math.random() * 16,
      hue: 15 + i * 8,
      phase: Math.random() * Math.PI * 2,
    }));

    // ---- Kabarcıklar ----
    type Bubble = { x: number; y: number; r: number; speed: number; wob: number };
    const bubbles: Bubble[] = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 2 + Math.random() * 4,
      speed: 0.0008 + Math.random() * 0.002,
      wob: Math.random() * Math.PI * 2,
    }));

    // ---- Çip devre hatları ----
    type Trace = { x1: number; y1: number; x2: number; y2: number; prog: number; speed: number };
    let traces: Trace[] = [];

    function buildTraces(cx2: number, cy2: number, chipHalf: number, radius: number) {
      traces = [];
      const N = 10;
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2 + 0.2;
        const sx = cx2 + Math.cos(a) * chipHalf;
        const sy = cy2 + Math.sin(a) * chipHalf;
        const ex = cx2 + Math.cos(a) * radius;
        const ey = cy2 + Math.sin(a) * radius;
        traces.push({ x1: sx, y1: sy, x2: ex, y2: ey, prog: Math.random(), speed: 0.004 + Math.random() * 0.006 });
      }
    }

    function frame() {
      t += 1;
      cx.clearRect(0, 0, w, h);

      // ---- arka plan: koyu su gradyanı ----
      const g = cx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#04222e");
      g.addColorStop(1, "#02121c");
      cx.fillStyle = g;
      cx.fillRect(0, 0, w, h);

      // ---- akvaryum çerçevesi ----
      const m = Math.min(w, h) * 0.08;
      const ax = m, ay = m, aw = w - m * 2, ah = h - m * 2;
      const acx = ax + aw / 2, acy = ay + ah / 2;

      // cam iç parlaması
      const cg = cx.createLinearGradient(ax, ay, ax + aw, ay + ah);
      cg.addColorStop(0, "rgba(120,200,255,0.05)");
      cg.addColorStop(0.5, "rgba(0,0,0,0)");
      cg.addColorStop(1, "rgba(120,200,255,0.03)");
      cx.fillStyle = cg;
      cx.fillRect(ax, ay, aw, ah);

      // çerçeve çizgisi
      cx.strokeStyle = "rgba(140,220,255,0.35)";
      cx.lineWidth = 2;
      cx.strokeRect(ax, ay, aw, ah);
      // köşe vurguları
      cx.strokeStyle = "rgba(255,77,0,0.9)";
      cx.lineWidth = 3;
      const cl = 26;
      const corners: [number, number, number, number][] = [
        [ax, ay, 1, 1], [ax + aw, ay, -1, 1], [ax, ay + ah, 1, -1], [ax + aw, ay + ah, -1, -1],
      ];
      for (const [px, py, dx, dy] of corners) {
        cx.beginPath();
        cx.moveTo(px + dx * cl, py);
        cx.lineTo(px, py);
        cx.lineTo(px, py + dy * cl);
        cx.stroke();
      }

      // ---- merkez çip ----
      const chipHalf = Math.min(aw, ah) * 0.09;
      const radius = Math.min(aw, ah) * 0.3;
      const chipGlow = mouse.inside && Math.hypot(mouse.x - acx, mouse.y - acy) < radius ? 1 : 0;
      const pulse = 0.5 + 0.5 * Math.sin(t * 0.03);

      buildTraces(acx, acy, chipHalf, radius);

      // devre hatları + akan sinyaller
      for (const tr of traces) {
        tr.prog += tr.speed;
        if (tr.prog > 1) tr.prog = 0;
        cx.strokeStyle = "rgba(90,180,220,0.25)";
        cx.lineWidth = 1;
        cx.beginPath();
        cx.moveTo(tr.x1, tr.y1);
        cx.lineTo(tr.x2, tr.y2);
        cx.stroke();
        const px = tr.x1 + (tr.x2 - tr.x1) * tr.prog;
        const py = tr.y1 + (tr.y2 - tr.y1) * tr.prog;
        cx.fillStyle = `rgba(255,120,40,${0.5 + pulse * 0.4})`;
        cx.beginPath();
        cx.arc(px, py, 2.2, 0, Math.PI * 2);
        cx.fill();
        cx.strokeStyle = "rgba(140,220,255,0.4)";
        cx.beginPath();
        cx.arc(tr.x2, tr.y2, 3.5, 0, Math.PI * 2);
        cx.stroke();
      }

      // çip gövdesi — yavaş dönüş (sahte 3B için dikey ölçek salınımı)
      cx.save();
      cx.translate(acx, acy);
      const rot = t * 0.004;
      const squash = 0.85 + 0.15 * Math.abs(Math.sin(rot));
      cx.rotate(rot);
      cx.scale(1, squash);

      const dg = cx.createRadialGradient(0, 0, 0, 0, 0, chipHalf * 2.2);
      const glowA = 0.15 + pulse * 0.08 + chipGlow * 0.25;
      dg.addColorStop(0, `rgba(255,77,0,${glowA})`);
      dg.addColorStop(1, "rgba(255,77,0,0)");
      cx.fillStyle = dg;
      cx.beginPath();
      cx.arc(0, 0, chipHalf * 2.2, 0, Math.PI * 2);
      cx.fill();

      cx.fillStyle = "rgba(10,30,42,0.95)";
      cx.strokeStyle = `rgba(255,140,60,${0.7 + chipGlow * 0.3})`;
      cx.lineWidth = 2;
      cx.beginPath();
      cx.rect(-chipHalf, -chipHalf, chipHalf * 2, chipHalf * 2);
      cx.fill();
      cx.stroke();

      // iç detay — küçük kare + pinler
      cx.strokeStyle = "rgba(140,220,255,0.5)";
      cx.lineWidth = 1;
      cx.strokeRect(-chipHalf * 0.5, -chipHalf * 0.5, chipHalf, chipHalf);
      const pins = 6;
      for (let i = 0; i < pins; i++) {
        const p = -chipHalf + ((i + 0.5) / pins) * chipHalf * 2;
        cx.fillStyle = "rgba(200,240,255,0.5)";
        cx.fillRect(p - 1.5, -chipHalf - 5, 3, 4);
        cx.fillRect(p - 1.5, chipHalf + 1, 3, 4);
        cx.fillRect(-chipHalf - 5, p - 1.5, 4, 3);
        cx.fillRect(chipHalf + 1, p - 1.5, 4, 3);
      }
      cx.fillStyle = `rgba(255,110,30,${0.6 + pulse * 0.4 + chipGlow * 0.3})`;
      cx.beginPath();
      cx.arc(0, 0, chipHalf * 0.16, 0, Math.PI * 2);
      cx.fill();

      cx.restore();

      // ---- kabarcıklar ----
      for (const b of bubbles) {
        b.y -= b.speed;
        b.wob += 0.02;
        if (b.y < 0) { b.y = 1; b.x = Math.random(); }
        const bx = ax + b.x * aw + Math.sin(b.wob) * 4;
        const by = ay + b.y * ah;
        cx.strokeStyle = "rgba(190,230,255,0.45)";
        cx.lineWidth = 1;
        cx.beginPath();
        cx.arc(bx, by, b.r, 0, Math.PI * 2);
        cx.stroke();
      }

      // ---- balıklar — fareye doğru yönelir ----
      for (const f of fishes) {
        const wob = Math.sin(t * 0.02 + f.phase) * 0.15;

        // fareye ilgi: yakınsa yönel
        if (mouse.inside) {
          const dx = mouse.x - (ax + f.x * aw);
          const dy = mouse.y - (ay + f.y * ah);
          const d = Math.hypot(dx, dy);
          if (d < Math.min(aw, ah) * 0.45 && d > 30) {
            f.vx += (dx / d) * 0.25;
            f.vy += (dy / d) * 0.25;
          }
        }

        // hız sınırı
        const sp = Math.hypot(f.vx, f.vy) || 1;
        if (sp > 1.2) { f.vx *= 1.2 / sp; f.vy *= 1.2 / sp; }
        // serbest yüzme hızına yumuşak dönüş
        f.vx += (Math.sign(f.vx || 1) * 0.35 - f.vx) * 0.005;
        f.vy *= 0.995;

        f.x += f.vx * 0.0016;
        f.y += f.vy * 0.0016 + wob * 0.0004;

        // akvaryum sınırları
        const pad = 0.05;
        if (f.x < pad) { f.x = pad; f.vx = Math.abs(f.vx); }
        if (f.x > 1 - pad) { f.x = 1 - pad; f.vx = -Math.abs(f.vx); }
        if (f.y < 0.08) { f.y = 0.08; f.vy = Math.abs(f.vy); }
        if (f.y > 0.92) { f.y = 0.92; f.vy = -Math.abs(f.vy); }

        const sx = ax + f.x * aw;
        const sy = ay + f.y * ah;
        const s = f.size;
        const flip = f.vx >= 0 ? 1 : -1;

        cx.save();
        cx.translate(sx, sy);
        cx.scale(flip, 1);
        cx.fillStyle = `hsla(${f.hue}, 80%, 55%, 0.92)`;
        cx.beginPath();
        cx.ellipse(0, 0, s, s * 0.4, 0, 0, Math.PI * 2);
        cx.fill();
        // sallanan kuyruk
        const tail = Math.sin(t * 0.15 + f.phase) * s * 0.2;
        cx.beginPath();
        cx.moveTo(-s * 0.85, 0);
        cx.lineTo(-s * 1.45, -s * 0.32 + tail);
        cx.lineTo(-s * 1.45, s * 0.32 + tail);
        cx.closePath();
        cx.fill();
        cx.fillStyle = "rgba(8,18,28,0.9)";
        cx.beginPath();
        cx.arc(s * 0.5, -s * 0.08, Math.max(1.5, s * 0.07), 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      }

      // ---- fare imleci halkası ----
      if (mouse.inside) {
        cx.strokeStyle = "rgba(255,140,60,0.5)";
        cx.lineWidth = 1.5;
        cx.beginPath();
        cx.arc(mouse.x, mouse.y, 14 + Math.sin(t * 0.1) * 3, 0, Math.PI * 2);
        cx.stroke();
      }

      // ---- vinyet ----
      const v = cx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, h);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,8,0.5)");
      cx.fillStyle = v;
      cx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
