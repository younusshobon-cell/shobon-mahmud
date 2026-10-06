"use client";

import { useEffect, useRef, useState } from "react";
import { geoDistance, geoGraticule10, geoOrthographic, geoPath, type GeoPermissibleObjects } from "d3-geo";
import Link from "next/link";
import land from "@/content/globe-land.json";

type Place = { slug: string; city: string; coords: { lat: number; lng: number } };

export function LocationGlobe({ places }: { places: Place[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angle = useRef({ lng: 55.27, lat: 25.2 });
  const [selected, setSelected] = useState("dubai");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const active = places.find(p => p.slug === selected) ?? places[0];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { setReduced(preference.matches); if (preference.matches) setPaused(true); };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0, previous = 0, lastDraw = 0, visible = true, width = 0;
    const projection = geoOrthographic().clipAngle(90).precision(.4);
    const path = geoPath(projection, ctx);
    const grid = geoGraticule10();
    const draw = () => {
      if (!width) return;
      const center = width / 2, radius = width * .4;
      ctx.clearRect(0, 0, width, width);
      projection.translate([center, center]).scale(radius).rotate([-angle.current.lng, -angle.current.lat]);
      const halo = ctx.createRadialGradient(center, center, radius * .88, center, center, radius * 1.12);
      halo.addColorStop(0, "rgba(82,156,183,.22)");
      halo.addColorStop(1, "rgba(82,156,183,0)");
      ctx.fillStyle = halo; ctx.fillRect(0, 0, width, width);
      ctx.save(); ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2); ctx.clip();
      const ocean = ctx.createLinearGradient(center - radius, center - radius, center + radius, center + radius);
      ocean.addColorStop(0, "#294d72"); ocean.addColorStop(.6, "#162d49"); ocean.addColorStop(1, "#0c182b");
      ctx.fillStyle = ocean; ctx.fillRect(0, 0, width, width);
      ctx.beginPath(); path(land as unknown as GeoPermissibleObjects);
      ctx.fillStyle = "#8dbfb6"; ctx.fill(); ctx.strokeStyle = "#b3d3cc"; ctx.lineWidth = .5; ctx.stroke();
      ctx.beginPath(); path(grid); ctx.strokeStyle = "rgba(216,237,242,.12)"; ctx.lineWidth = .6; ctx.stroke();
      const shade = ctx.createRadialGradient(center - radius * .4, center - radius * .45, radius * .12, center + radius * .22, center + radius * .2, radius * 1.3);
      shade.addColorStop(0, "rgba(255,255,255,.16)"); shade.addColorStop(.5, "rgba(12,24,43,0)");
      shade.addColorStop(1, "rgba(3,12,25,.72)");
      ctx.fillStyle = shade; ctx.fillRect(0, 0, width, width);
      ctx.restore();
      ctx.beginPath(); ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(115,171,191,.55)"; ctx.lineWidth = 1.2; ctx.stroke();
      for (const place of places) {
        const coordinate: [number, number] = [place.coords.lng, place.coords.lat];
        if (geoDistance([angle.current.lng, angle.current.lat], coordinate) > Math.PI / 2 - .02) continue;
        const point = projection(coordinate);
        if (!point) continue;
        const [x, y] = point, isActive = place.slug === selected;
        ctx.beginPath(); ctx.arc(x, y, isActive ? 12 : 6.5, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "rgba(255,211,77,.22)" : "rgba(255,255,255,.13)"; ctx.fill();
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - (isActive ? 18 : 9));
        ctx.strokeStyle = isActive ? "#ffd34d" : "#ffffff"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y - (isActive ? 18 : 9), isActive ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? "#ffd34d" : "#ffffff"; ctx.fill();
        ctx.strokeStyle = "#162d49"; ctx.lineWidth = 1; ctx.stroke();
        if (isActive) {
          ctx.font = "600 13px system-ui, sans-serif";
          const text = place.city, labelWidth = ctx.measureText(text).width + 20;
          const left = Math.max(5, Math.min(width - labelWidth - 5, x + 14)), top = y - 34;
          ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.roundRect(left, top, labelWidth, 28, 8); ctx.fill();
          ctx.fillStyle = "#162d49"; ctx.fillText(text, left + 10, top + 18);
        }
      }
    };
    const resize = () => {
      width = canvas.getBoundingClientRect().width;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(width * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
    };
    const tick = (time: number) => {
      if (visible && !document.hidden && !paused && !reduced && time - lastDraw >= 33) {
        const delta = previous ? Math.min(time - previous, 80) : 0;
        angle.current.lng = (angle.current.lng + delta * .004) % 360;
        draw(); lastDraw = time;
      }
      previous = time;
      frame = requestAnimationFrame(tick);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(canvas); resize();
    if (!paused && !reduced) frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect(); };
  }, [paused, reduced, selected, places]);

  function focus(place: Place) {
    angle.current = { lng: place.coords.lng, lat: place.coords.lat };
    setSelected(place.slug); setPaused(true);
  }

  return (
    <div className="location-globe">
      <div className="location-globe__top">
        <span>Connected across markets</span>
        <button type="button" aria-pressed={paused} onClick={() => { setPaused(!paused); if (reduced) setReduced(false); }}>
          {paused ? "Rotate globe" : "Pause rotation"}
        </button>
      </div>
      <canvas ref={canvasRef} className="location-globe__canvas" role="img" aria-label="Rotating globe with pins for Dubai, Dhaka, San Francisco, New York, Austin, London, Saudi Arabia and Oman. Select a location below to focus its pin.">
        SEO locations: {places.map(p => p.city).join(", ")}.
      </canvas>
      <div className="location-globe__selection">
        <span>{active.city}{active.slug === "dubai" ? " · Based here" : ""}</span>
        <Link href={`/locations/seo-consultant-${active.slug}`}>Explore {active.city}</Link>
      </div>
      <div className="location-globe__places" role="group" aria-label="Focus a location on the globe">
        {places.map(place => <button key={place.slug} type="button" aria-pressed={selected === place.slug} onClick={() => focus(place)}>{place.city}</button>)}
      </div>
      <p className="location-globe__note">Select a market to focus its pin. Pins mark the areas served.</p>
    </div>
  );
}
