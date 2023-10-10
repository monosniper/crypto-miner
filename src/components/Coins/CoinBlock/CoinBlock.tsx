import { DragEvent, FC, useEffect, useRef, useState } from "react";
import { ArrTopIcon } from "../../icons";
import styles from "./CoinBlock.module.css";
import * as d3 from "d3";
import { useAppSelector } from "@/redux/store";
import { main } from "@/redux/slices/mainSlice";
import { Coin, CoinWithOrder, PropsWithClassName } from "@/types";
import cn from "clsx";

export type Props = {
  type?: "my" | "general";
  data: CoinWithOrder | Coin;
  draggable?: boolean;
  onDragStart?: (coin: CoinWithOrder, e?: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  onDragOver?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent, coin: CoinWithOrder) => void;

  changeLocation: (direction: "top" | "bottom", data: CoinWithOrder) => void;
};

export const CoinBlock: FC<PropsWithClassName<Props>> = ({
  className,
  type = "general",
  data,
  draggable = false,
  onDragStart,
  onDragLeave,
  onDragEnd,
  onDragOver,
  onDrop,

  changeLocation,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredData, setHoveredData] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { theme } = useAppSelector(main);

  useEffect(() => {
    if (!data.graph.length || type === "my") return;

    const draw = () => {
      const parentWidth = svgRef.current?.parentElement?.clientWidth || 400;

      const width = parentWidth;
      const height = 50;

      const maxValue = d3.max(data.graph) || 1;
      const minValue = d3.min(data.graph) || 0;

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
        .domain([0, data.graph.length > 0 ? data.graph.length - 1 : 1]) // Изменили диапазон
        .range([10, width - 10]);

      const yScale = d3
        .scaleLinear()
        .domain([minValue, maxValue])
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
        .datum(data.graph)
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
        .datum(data.graph)
        .transition()
        .duration(200)
        .attr("fill", "none") // Нет заливки
        .attr("stroke", "#906BF5") // Цвет линии
        .attr("stroke-width", 4) // Толщина линии
        .attr("d", line);

      svg
        .selectAll(".data-point")
        .data(data.graph)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", (_, i) => xScale(i))
        .attr("cy", (d) => yScale(d))
        .attr("r", 5) // Размер точки
        .attr("fill", "#906BF5")
        .style("fill-opacity", 1);

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
        .style("fill-opacity", 0.5);
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
      className={cn(className, styles.wrapper, "draggableEl", {
        [styles.my]: type === "my",
        "cursor-grab": draggable,
      })}
      draggable={draggable}
      onDragStart={(e) => {
        if (onDragStart) {
          onDragStart(data as CoinWithOrder, e);
        }
      }}
      onDragLeave={(e) => {
        if (onDragLeave) {
          onDragLeave(e);
        }
      }}
      onDragEnd={(e) => {
        if (onDragEnd) {
          onDragEnd(e);
        }
      }}
      onDragOver={(e) => {
        if (onDragOver) {
          onDragOver(e);
        }
      }}
      onDrop={(e) => {
        if (onDrop) {
          onDrop(e, data as CoinWithOrder);
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.coinTitle}>
          <div className={styles.coinIconWrapper}>
            <img src={data.icon_url} alt={data.slug} />
          </div>

          <p>
            {data.name}, {data.slug}
          </p>
        </div>

        <div className="flex items-center gap-1 lg:hidden [&>div>svg>path]:fill-base-content-100">
          <div
            className="w-6 h-6 rounded-full flex justify-center items-center bg-base-300 cursor-pointer"
            onClick={() => changeLocation("top", data as CoinWithOrder)}
          >
            <ArrTopIcon />
          </div>
          <div
            className="w-6 h-6 rounded-full flex justify-center items-center bg-base-300 cursor-pointer"
            onClick={() => changeLocation("bottom", data as CoinWithOrder)}
          >
            <ArrTopIcon className="rotate-180" />
          </div>
        </div>
      </div>

      {type === "general" && (
        <div className={styles.chart}>
          {hoveredData && (
            <Tooltip
              data={hoveredData.toFixed(6) + "$"}
              position={tooltipPosition}
            />
          )}

          <svg ref={svgRef}></svg>
        </div>
      )}

      <div className={styles.footer}>
        <p>${data.rate.toFixed(1)}</p>
        <div
          className={cn(styles.changeCourse, {
            [styles.decline]: data.change < 0 ? true : false,
          })}
        >
          <span>{data.change.toFixed(2)}%</span>
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
      className="text-base-content-100 bg-base-100 border-base-border-100 rounded-md p-1 absolute"
      style={{
        left: position.x - 20 + "px",
        top: position.y - 35 + "px",
      }}
    >
      {data}
    </div>
  );
};
