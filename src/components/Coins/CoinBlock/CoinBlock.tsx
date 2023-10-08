import { FC, useEffect, useRef, useState } from "react";
import { ArrTopIcon } from "../../icons";
import styles from "./CoinBlock.module.css";
import * as d3 from "d3";
import { useAppSelector } from "@/redux/store";
import { main } from "@/redux/slices/mainSlice";
import { PropsWithClassName } from "@/types";
import cn from "clsx";

export type Props = {
  type?: "my" | "general";
};

export const CoinBlock: FC<PropsWithClassName<Props>> = ({
  className,
  type = "general",
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data] = useState([5, 27000, 10000, 1000, 10000]);
  const [hoveredData, setHoveredData] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { theme } = useAppSelector(main);

  useEffect(() => {
    if (!data.length || type === "my") return;

    const draw = () => {
      const parentWidth = svgRef.current?.parentElement?.clientWidth || 400;

      const width = parentWidth;
      const height = 50;

      const maxValue = d3.max(data) || 1;

      // Очищаем предыдущий график, если он был
      d3.select(svgRef.current).selectAll("*").remove();

      // Создаем SVG элемент
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

      // Создаем шкалу для x и y
      const xScale = d3
        .scaleLinear()
        .domain([0, data.length - 1]) // Изменили диапазон
        .range([10, width - 10]);

      const yScale = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([height - 10, 20]);

      // Создаем градиент для заливки
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
        .attr("stop-color", theme === "light" ? "#C1AAFF" : "#7C55E7"); // Начальный цвет градиента (яркий)

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", theme === "light" ? "#C1AAFF00" : "#7C55E700"); // Конечный цвет градиента (тусклый)

      // Создаем кривую Безье
      d3.curveCardinal.tension(0.3); // Здесь можно настроить уровень напряжения (tension)

      // Создаем заливку под линией с использованием градиента
      const area = d3
        .area<number>()
        .x((_, i) => xScale(i))
        .y0(height) // Начало заливки на дне графика
        .y1((d) => yScale(d));

      // Рисуем заливку с градиентом
      svg
        .append("path")
        .datum(data)
        .transition()
        .duration(500)
        .attr("fill", "url(#chartGradient)") // Используем градиент
        .attr("d", area);

      // Создаем линию с кривой Безье
      const line = d3
        .line<number>()
        .x((_, i) => xScale(i))
        .y((d) => yScale(d))
        .curve(d3.curveCardinal.tension(0.3));

      // Рисуем линию поверх заливки
      svg
        .append("path")
        .datum(data)
        .transition()
        .duration(200)
        .attr("fill", "none") // Нет заливки
        .attr("stroke", "#906BF5") // Цвет линии
        .attr("stroke-width", 4) // Толщина линии
        .attr("d", line);

      svg
        .selectAll(".data-point")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", (_, i) => xScale(i))
        .attr("cy", (d) => yScale(d))
        .attr("r", 5) // Размер точки
        .attr("fill", "#906BF5"); // Цвет точки

      // Обработчик наведения на точку
      svg
        .selectAll<SVGCircleElement, number>(".data-point")
        .on("mouseover", (event, d) => {
          setHoveredData(d); // Сохраняем данные точки в состоянии
          setTooltipPosition({ x: event.pageX, y: event.pageY }); // Позиция tooltip
        })
        .on("mouseout", () => {
          setHoveredData(null); // Сбрасываем данные при уходе с точки
        })
        .attr("fill", "#906BF5") // Цвет точки
        .style("fill-opacity", 0);
    };

    draw();
    window.addEventListener("resize", draw);

    // Убираем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", draw);
    };
  }, [data, theme, type]);

  return (
    <div
      className={cn(className, styles.wrapper, {
        [styles.my]: type === "my",
      })}
    >
      <div className={styles.header}>
        <div className={styles.coinIconWrapper}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3281 5.875C11.3281 8.81836 8.92188 11.2031 6 11.2031C3.05664 11.2031 0.671875 8.81836 0.671875 5.875C0.671875 2.95312 3.05664 0.546875 6 0.546875C8.92188 0.546875 11.3281 2.95312 11.3281 5.875ZM8.27734 5.12305C8.38477 4.41406 7.84766 4.02734 7.0957 3.79102L7.33203 2.82422L6.75195 2.67383L6.51562 3.61914C6.36523 3.57617 6.21484 3.5332 6.06445 3.51172L6.30078 2.56641L5.69922 2.41602L5.46289 3.38281C5.33398 3.33984 5.20508 3.31836 5.09766 3.29688V3.27539L4.28125 3.08203L4.13086 3.70508L4.56055 3.8125C4.79688 3.87695 4.83984 4.02734 4.81836 4.15625L4.56055 5.25195C4.58203 5.25195 4.60352 5.25195 4.625 5.27344C4.60352 5.25195 4.58203 5.25195 4.56055 5.25195L4.17383 6.77734C4.15234 6.86328 4.06641 6.9707 3.89453 6.92773C3.91602 6.92773 3.48633 6.82031 3.48633 6.82031L3.18555 7.48633L3.95898 7.67969C4.08789 7.70117 4.23828 7.74414 4.36719 7.78711L4.13086 8.75391L4.71094 8.9043L4.94727 7.9375C5.09766 7.98047 5.26953 8.02344 5.41992 8.06641L5.18359 9.01172L5.76367 9.16211L6 8.19531C7.00977 8.38867 7.74023 8.30273 8.0625 7.40039C8.32031 6.66992 8.0625 6.26172 7.52539 5.98242C7.91211 5.89648 8.19141 5.63867 8.27734 5.12305ZM6.94531 6.99219C6.75195 7.72266 5.52734 7.33594 5.14062 7.22852L5.46289 5.93945C5.84961 6.04688 7.11719 6.24023 6.94531 6.99219ZM7.11719 5.12305C6.94531 5.76758 5.93555 5.44531 5.61328 5.35938L5.89258 4.19922C6.23633 4.26367 7.28906 4.43555 7.11719 5.12305Z"
              fill="#58667E"
            />
          </svg>
        </div>

        <p>Bitcoin, BTC</p>
      </div>

      {type === "general" && (
        <div className={styles.chart}>
          {hoveredData && (
            <Tooltip
              data={`Value: ${hoveredData}`}
              position={tooltipPosition}
            />
          )}

          <svg ref={svgRef}></svg>
        </div>
      )}

      <div className={styles.footer}>
        <p>$27,127.6</p>
        <div className={styles.changeCourse}>
          <span>0.62%</span>
          <ArrTopIcon />
        </div>
      </div>
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
      style={{
        position: "absolute",
        left: position.x - 50 + "px",
        top: position.y - 30 + "px",
        background: "white",
        border: "1px solid #ccc",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {data}
    </div>
  );
};
