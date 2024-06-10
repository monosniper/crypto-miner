import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useAppSelector } from "@/redux/store";
import { main } from "@/redux/slices/mainSlice";

type Props = {
  graphData: number[];
  margins?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  y?: {
    ticks?: number;
    min?: number;
    max?: number;
    afterNumber?: string;
  };
};

export const Graph: FC<Props> = ({ graphData, y, margins }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredData, setHoveredData] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { theme } = useAppSelector(main);

  useEffect(() => {
    const draw = () => {
      const parentWidth = svgRef.current?.parentElement?.clientWidth || 400;

      const width = parentWidth;
      const height = 200; // Increase height to accommodate x-axis labels
      const margin = {
        top: margins?.top || 16,
        right: margins?.right || 16,
        bottom: margins?.bottom || 40, // Adjust margin for x-axis labels
        left: margins?.left || 40,
      };

      // Ensure we have at least two data points for proper x-axis scaling
      let extendedData = [...graphData];
      if (extendedData.length === 1) {
        extendedData.push(extendedData[0]); // Add a duplicate point if only one exists
      }

      // Normalize the data to the range [0, 100]
      const normalizedData = extendedData.map((d) => (d / 100) * 100);

      // Clear previous chart if it exists
      d3.select(svgRef.current).selectAll("*").remove();

      // Create SVG element
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // Create a group element for the chart content with margin
      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Generate time data for the x-axis
      const startTime = new Date(); // Current time as the start
      const timeData = Array.from(
        { length: 8 },
        (_, i) => d3.timeMinute.offset(startTime, i) // 1-minute intervals
      );

      // Create scales for x and y
      const xScale = d3
        .scaleTime()
        .domain([timeData[0], timeData[timeData.length - 1]])
        .range([0, chartWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([y?.min || 80, y?.max || 100])
        .range([chartHeight, 0]);

      // Add x-axis
      chart
        .append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(d3.timeMinute.every(1))
            .tickFormat(d3.timeFormat("%H:%M") as any)
        );

      // Add y-axis
      chart.append("g").call(
        d3
          .axisLeft(yScale)
          .ticks(y?.ticks || 5)
          .tickFormat((d) => d + (y?.afterNumber || ""))
      );

      // Create gradient for fill
      const gradient = svg
        .append("defs")
        .append("linearGradient")
        .attr("id", "chartGradient")
        .attr("x1", "100%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", theme === "light" ? "#C1AAFF" : "#7C55E7");

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", theme === "light" ? "#C1AAFF00" : "#7C55E700");

      d3.curveCardinal.tension(0.3);

      const area = d3
        .area<number>()
        .x((_, i) => xScale(timeData[i]))
        .y0(chartHeight)
        .y1((d) => yScale(d));

      chart
        .append("path")
        .datum(normalizedData)
        .transition()
        .duration(500)
        .attr("fill", "url(#chartGradient)")
        .attr("d", area);

      const line = d3
        .line<number>()
        .x((_, i) => xScale(timeData[i]))
        .y((d) => yScale(d))
        .curve(d3.curveCardinal.tension(0.3));

      chart
        .append("path")
        .datum(normalizedData)
        .transition()
        .duration(200)
        .attr("fill", "none")
        .attr("stroke", "#906BF5")
        .attr("stroke-width", 4)
        .attr("d", line);

      chart
        .selectAll(".data-point")
        .data(normalizedData)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", (_, i) => xScale(timeData[i]))
        .attr("cy", (d) => yScale(d))
        .attr("r", 5)
        .attr("fill", "#906BF5")
        .style("fill-opacity", 1);

      chart
        .selectAll<SVGCircleElement, number>(".data-point")
        .on("mouseover", (event, d) => {
          setHoveredData(d);
          setTooltipPosition({ x: event.pageX, y: event.pageY });
        })
        .on("mouseout", () => {
          setHoveredData(null);
        })
        .on("touchstart", (event, d) => {
          setHoveredData(d);
          const touch = event.touches[0];
          setTooltipPosition({ x: touch.pageX, y: touch.pageY });
        })
        .on("touchend", () => {
          setHoveredData(null);
        })
        .attr("fill", "#906BF5")
        .style("fill-opacity", 0);
    };

    draw();
    window.addEventListener("resize", draw);

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [graphData, theme]);

  return (
    <div className="coin-chart">
      {hoveredData && (
        <Tooltip
          data={hoveredData ? hoveredData.toString() : "0"}
          position={tooltipPosition}
        />
      )}

      <svg className="pointer-events-auto" ref={svgRef}></svg>
    </div>
  );
};

const Tooltip = ({
  data,
  position,
}: {
  data: string;
  position: { x: number; y: number };
}) => {
  return (
    <div
      className="text-base-content-100 bg-base-100 border-base-border-100 rounded-md p-1 fixed"
      style={{
        left: position.x - 20 + "px",
        top: position.y - 35 + "px",
      }}
    >
      {data}
    </div>
  );
};
