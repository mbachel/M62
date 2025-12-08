import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface ModelPerformance {
  _id: string;
  model_name: string;
  developer: string;
  benchmarks: { [key: string]: number | null };
}

const DEVELOPER_COLORS: Record<string, string> = {
  "Google": "#1f77b4",          // blue
  "Google DeepMind": "#1f77b4",
  "Anthropic": "#ff7f0e",       // orange
  "Alibaba (Qwen)": "#2ca02c",  // green
  "Alibaba": "#2ca02c",
  "OpenAI": "#d62728",          // red
  "xAI": "#9467bd",             // purple
  "Meta AI": "#8c564b",         // brown
  "Moonshot AI": "#17becf"      // teal
};

const BENCHMARK_LABELS: Record<string, string> = {
  gpqa_diamond_reasoning: "GPQA Diamond Reasoning",
  aime_2025_math: "AIME 2025 Math",
  livecodebench_coding: "LiveCodeBench Coding",
  humanitys_last_exam: "Humanity's Last Exam"
};

export default function MPChart() {
  const [data, setData] = useState<ModelPerformance[]>([]);
  const [benchmarks, setBenchmarks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const chartRefs = useRef<(SVGSVGElement | null)[]>(Array(9).fill(null));

  useEffect(() => {
    const token = localStorage.getItem("m62_token") || "";
    fetch("/api/model_performance", {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem("m62_token");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((rawDocs: any[]) => {
        const docs: ModelPerformance[] = rawDocs.map((d, idx) => ({
          _id: String(idx),
          model_name: d.model,
          developer: d.developer ?? "Unknown",
          benchmarks: {
            gpqa_diamond_reasoning: d.gpqa_diamond_reasoning ?? null,
            aime_2025_math: d.aime_2025_math ?? null,
            livecodebench_coding: d.livecodebench_coding ?? null,
            humanitys_last_exam: d.humanitys_last_exam ?? null
          }
        }));

        const trimmed = docs.slice(0, 9);
        setData(trimmed);

        if (trimmed.length > 0) {
          setBenchmarks(Object.keys(trimmed[0].benchmarks));
        } else {
          setBenchmarks([]);
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0 || benchmarks.length === 0) return;

    data.forEach((doc, idx) => {
      const svg = d3.select(chartRefs.current[idx]);
      if (!svg.node()) return;

      svg.selectAll("*").remove();

      const w = 390;
      const h = 390;
      const r = 135;
      const center = { x: w / 2, y: h / 2 };

      const values = benchmarks.map(b => doc.benchmarks[b] ?? null);
      const angleStep = (2 * Math.PI) / benchmarks.length;

      const color =
        DEVELOPER_COLORS[doc.developer] ?? "#888";

      // Background panel
      svg
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h)
        .attr("rx", 18)
        .attr("ry", 18)
        .attr("fill", "var(--bg2)");

      // Concentric circles
      [0.25, 0.5, 0.75, 1].forEach(f => {
        svg
          .append("circle")
          .attr("cx", center.x)
          .attr("cy", center.y)
          .attr("r", r * f)
          .attr("fill", "none")
          .attr("stroke", "#555")
          .attr("stroke-opacity", 0.6)
          .attr("stroke-width", 1);
      });

       // Spokes + labels with rotation
      benchmarks.forEach((b, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x2 = center.x + r * Math.cos(angle);
        const y2 = center.y + r * Math.sin(angle);

        svg
          .append("line")
          .attr("x1", center.x)
          .attr("y1", center.y)
          .attr("x2", x2)
          .attr("y2", y2)
          .attr("stroke", "#888")
          .attr("stroke-width", 1.5);

        const labelText = BENCHMARK_LABELS[b] ?? b;

        const labelX = center.x + (r + 24) * Math.cos(angle);
        const labelY = center.y + (r + 24) * Math.sin(angle);

        let degrees = (angle * 180) / Math.PI;
        const isRightSide = Math.cos(angle) >= 0;

        // Base orientation: left side bottom→top, right side top→bottom
        let rotateDeg = isRightSide ? degrees + 90 : degrees + 90;

        // Force LiveCodeBench to be upright (no upside‑down text)
        if (b === "livecodebench_coding") {
          // Normalize to [-180, 180)
          while (rotateDeg >= 180) rotateDeg -= 360;
          while (rotateDeg < -180) rotateDeg += 360;
          if (Math.abs(rotateDeg) > 90) {
            rotateDeg += 180; // flip if upside down
          }
        }

        svg
          .append("text")
          .attr("x", labelX)
          .attr("y", labelY)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("font-size", "13px")
          .attr("fill", "var(--text)")
          .attr("transform", `rotate(${rotateDeg}, ${labelX}, ${labelY})`)
          .text(labelText);
      });

      // Radar polygon points
      const points: [number, number][] = values.map((v, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const radius = v === null ? 0 : r * (v / 100);
        return [
          center.x + radius * Math.cos(angle),
          center.y + radius * Math.sin(angle)
        ];
      });

      // Polygon
      svg
        .append("polygon")
        .attr("points", points.map(p => p.join(",")).join(" "))
        .attr("fill", color)
        .attr("fill-opacity", 0.25)
        .attr("stroke", color)
        .attr("stroke-width", 2.5);

      // Data points
      points.forEach(([x, y], i) => {
        if (values[i] !== null) {
          svg
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 5.5)
            .attr("fill", color)
            .attr("stroke", "#111")
            .attr("stroke-width", 1.5);
        }
      });

        // Title (more space from top)
      svg
        .append("text")
        .attr("x", center.x)
        .attr("y", 24)                 // was 30
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("font-weight", "bold")
        .attr("fill", color)
        .text(doc.model_name);

      // Developer label (more space from bottom)
      svg
        .append("text")
        .attr("x", center.x)
        .attr("y", h - 14)             // was h - 22 (moves up)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", color)
        .text(doc.developer);
    });
  }, [data, benchmarks]);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (data.length === 0) return <div>Loading charts...</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        columnGap: "12px",
        rowGap: "32px",
        justifyItems: "center",
        alignItems: "center"
      }}
    >
      {data.map((doc, idx) => (
        <svg
          key={doc._id}
          ref={el => {
            chartRefs.current[idx] = el;
          }}
          width={390}
          height={390}
          style={{
            borderRadius: "18px",
            boxShadow: "0 0 12px #2222",
            margin: "0 auto"
          }}
          aria-label={`Radar chart for ${doc.model_name}`}
        />
      ))}
    </div>
  );
}
