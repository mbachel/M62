import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ModelRelease {
  _id: string;
  model_name: string;
  developer: string;
  release_date: string;
  key_innovation: string;
  date?: Date;
}

export default function TimeSeriesLollipopChart() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [popupData, setPopupData] = useState<ModelRelease | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('m62_token') || '';
    fetch('/api/model_releases', {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('m62_token');
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data: ModelRelease[]) => {
        data.forEach((d) => {
          d.date = new Date(d.release_date);
        });

        const developers = Array.from(new Set(data.map((d) => d.developer)));

        const margin = { top: 70, right: 50, bottom: 150, left: 180 };
        const width = 1200 - margin.left - margin.right;
        const rowHeight = 45;
        const height = developers.length * rowHeight;
        const svgW = width + margin.left + margin.right;
        const svgH = height + margin.top + margin.bottom;

        const svg = d3.select(ref.current).attr('width', svgW).attr('height', svgH);

        svg.selectAll('*').remove();

        // Dynamic legend layout (compact)
        const legendG = svg
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top - 55})`);
        let legendX = 0;
        developers.forEach((dev, i) => {
          legendG
            .append('rect')
            .attr('x', legendX)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', d3.schemeCategory10[i % 10]);
          legendG
            .append('text')
            .attr('x', legendX + 25)
            .attr('y', 15)
            .text(dev)
            .attr('font-size', '16px')
            .attr('fill', 'var(--text)');
          legendX += 25 + dev.length * 9 + 18;
        });

        const x = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => d.date as Date) as [Date, Date])
          .range([margin.left, margin.left + width]);

        const y = d3
          .scalePoint()
          .domain(developers)
          .range([margin.top, margin.top + height])
          .padding(0.7);

        // Stronger offset for overlapping points
        const offsetForOverlap = (
          curr: ModelRelease,
          all: ModelRelease[],
          developers: string[],
          x: d3.ScaleTime<number, number>,
          y: d3.ScalePoint<string>,
        ) => {
          const samePts = all.filter(
            (d) =>
              d.developer === curr.developer &&
              Math.abs(x(d.date as Date) - x(curr.date as Date)) < 22,
          );
          if (samePts.length > 1) {
            const idx = samePts.findIndex((d) => d._id === curr._id);
            return x(curr.date as Date) + (idx - (samePts.length - 1) / 2) * 20;
          }
          return x(curr.date as Date);
        };

        svg
          .append('g')
          .attr('transform', `translate(0,${svgH - margin.bottom + 35})`)
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b %d, %Y') as any))
          .selectAll('text')
          .attr('transform', 'rotate(-35)')
          .attr('text-anchor', 'end')
          .attr('font-size', '15px')
          .attr('dx', '-5px')
          .attr('fill', 'var(--text)');

        // Release Date axis label
        svg
          .append('text')
          .attr('x', svgW / 2)
          .attr('y', svgH - 15)
          .attr('text-anchor', 'middle')
          .attr('font-size', '19px')
          .attr('fill', 'var(--text)')
          .text('Release Date');

        svg
          .append('g')
          .attr('transform', `translate(${margin.left - 20},0)`)
          .call(d3.axisLeft(y))
          .selectAll('text')
          .attr('font-size', '17px')
          .attr('fill', 'var(--text)');

        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -svgH / 2)
          .attr('y', 55)
          .attr('text-anchor', 'middle')
          .attr('font-size', '19px')
          .attr('fill', 'var(--text)')
          .text('Developer');

        svg
          .selectAll('.stem')
          .data(data)
          .enter()
          .append('line')
          .attr('class', 'stem')
          .attr('x1', (d) => offsetForOverlap(d, data, developers, x, y))
          .attr('y1', svgH - margin.bottom + 35)
          .attr('x2', (d) => offsetForOverlap(d, data, developers, x, y))
          .attr('y2', (d) => y(d.developer)!)
          .attr('stroke', (d) => d3.schemeCategory10[developers.indexOf(d.developer) % 10])
          .attr('stroke-width', 2.5)
          .attr('opacity', 0.8);

        svg
          .selectAll('.dot')
          .data(data)
          .enter()
          .append('circle')
          .attr('class', 'dot')
          .attr('cx', (d) => offsetForOverlap(d, data, developers, x, y))
          .attr('cy', (d) => y(d.developer)!)
          .attr('r', 10)
          .attr('fill', (d) => d3.schemeCategory10[developers.indexOf(d.developer) % 10])
          .attr('stroke', '#222')
          .attr('stroke-width', 2)
          .style('cursor', 'pointer')
          .on('click', function (event, d) {
            if (selectedId === d._id) {
              setSelectedId(null);
              setPopupData(null);
              setPopupPos(null);
            } else {
              setSelectedId(d._id);
              setPopupData(d);
              setPopupPos({ x: event.clientX, y: event.clientY });
            }
            event.stopPropagation();
          });

        d3.select(window).on('click', () => {
          setSelectedId(null);
          setPopupData(null);
          setPopupPos(null);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      d3.select(window).on('click', null);
    };
  }, [selectedId]);

  return (
    <>
      <div className="w-full overflow-x-auto pb-4">
        <svg ref={ref}></svg>
      </div>
      {popupData && popupPos && (
        <div
          style={{
            position: 'fixed',
            left: popupPos.x + 18,
            top: popupPos.y - 12,
            background: 'var(--bg2)',
            color: 'var(--text)',
            padding: '14px 18px',
            borderRadius: '8px',
            boxShadow: '0 0 6px #2227',
            minWidth: 220,
            fontSize: '16px',
            zIndex: 10000,
          }}
          aria-live="polite"
          role="dialog"
        >
          <div style={{ marginBottom: 6 }}>
            <strong>Model Name: </strong>
            <br />
            {popupData.model_name}
          </div>
          <div style={{ marginBottom: 6 }}>
            <strong>Release Date:</strong>
            <br />
            {d3.timeFormat('%B %d, %Y')(popupData.date as Date)}
          </div>
          <div style={{ marginBottom: 2 }}>
            <strong>Key Innovation:</strong>
            <br />
            {popupData.key_innovation}
          </div>
        </div>
      )}
    </>
  );
}
