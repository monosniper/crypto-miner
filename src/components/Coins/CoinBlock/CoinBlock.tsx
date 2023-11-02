import { FC, useEffect, useRef, useState } from "react";
import { ArrTopIcon, MoreInfoIcon } from "../../icons";
import styles from "./CoinBlock.module.css";
import * as d3 from "d3";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main } from "@/redux/slices/mainSlice";
import {
  Coin,
  CoinWithHideAndOrder,
  MyCoin,
  PropsWithClassName,
} from "@/types";
import cn from "clsx";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { coins, setCoinsList } from "@/redux/slices/coinsSlice";

export type Props = {
  type?: "my" | "general";
  data: CoinWithHideAndOrder;
  // idx?: number;
  // totalItems?: number;
  draggable?: boolean;
  active?: boolean;

  // changeLocation?: (direction: "top" | "bottom", data: CoinWithOrder) => void;
};

export const CoinBlock: FC<PropsWithClassName<Props>> = ({
  className,
  type = "general",
  data,
  // idx,
  // totalItems,

  // changeLocation,
  draggable = false,
  active = false,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredData, setHoveredData] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });
  const [isOpenMenu, setOpenMenu] = useState(false);
  const dispatch = useAppDispatch();
  const { coinsList } = useAppSelector(coins);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { theme } = useAppSelector(main);

  useEffect(() => {
    if (!("graph" in data) || type === "my" || data.graph === null) return;

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
      className="h-full flex flex-col"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div
        className={cn(className, styles.wrapper, {
          [styles.my]: type === "my",
          "cursor-grab": draggable,
          "border-primary": active,
        })}
      >
        <div className="coin-inner h-full flex flex-col">
          <div className={styles.header}>
            <div className={styles.coinTitle}>
              <div className={styles.coinIconWrapper}>
                <img src={data.icon_url} alt={data.slug} />
              </div>

              <p>
                {data.name}, {data.slug}
              </p>
            </div>

            {/* {changeLocation && (
              <div className="flex items-center gap-1 lg:hidden [&>div>svg>path]:fill-base-content-100">
                {idx && idx > 1 ? (
                  <div
                    className="w-6 h-6 rounded-full flex justify-center items-center bg-base-300 cursor-pointer"
                    onClick={() => changeLocation("top", data as CoinWithOrder)}
                  >
                    <ArrTopIcon />
                  </div>
                ) : null}

                {idx && totalItems && idx !== totalItems ? (
                  <div
                    className="w-6 h-6 rounded-full flex justify-center items-center bg-base-300 cursor-pointer"
                    onClick={() =>
                      changeLocation("bottom", data as CoinWithOrder)
                    }
                  >
                    <ArrTopIcon className="rotate-180" />
                  </div>
                ) : null}
              </div>
            )} */}

            {type === "general" && (
              <div className="relative">
                <div
                  className="cursor-pointer pointer-events-auto"
                  onClick={() => setOpenMenu((prev) => !prev)}
                >
                  <MoreInfoIcon
                    className="[&>g>circle]:fill-white"
                    width={24}
                    height={24}
                  />
                </div>

                {isOpenMenu && (
                  <div className="absolute top-full right-0 w-[100px] bg-base-300 text-base-content-100 text-xs rounded-md overflow-hidden z-10">
                    <div
                      className="flex items-center gap-1 hover:bg-primary/20 cursor-pointer px-2 py-1"
                      onClick={() => {
                        setOpenMenu(false);

                        const updateList = coinsList?.map((coin) => {
                          if (coin.id === data.id) {
                            return { ...coin, hide: !data.hide };
                          }

                          return coin;
                        });

                        dispatch(setCoinsList(updateList));
                      }}
                    >
                      {data.hide ? "Показывать" : "Скрыть"}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {type === "general" && "graph" in data && data.graph !== null && (
            <div className={cn(styles.chart, "coin-chart")}>
              {hoveredData && (
                <Tooltip
                  data={(hoveredData ? hoveredData.toFixed(6) : 0) + "$"}
                  position={tooltipPosition}
                />
              )}

              <svg className="pointer-events-auto" ref={svgRef}></svg>
            </div>
          )}

          <div className={styles.footer}>
            <Rate type={type} data={data} />
            {"change" in data && (
              <div
                className={cn(styles.changeCourse, {
                  [styles.decline]:
                    "change" in data && data.change < 0 ? true : false,
                })}
              >
                <span>{data.change ? data.change.toFixed(2) : 0}%</span>
                <ArrTopIcon />
              </div>
            )}
          </div>
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

const Rate: FC<{ type: "my" | "general"; data: Coin | MyCoin }> = ({
  type,
  data,
}) => {
  if (type === "my" && "balance" in data) {
    return <p>${data.balance}</p>;
  }

  if (type === "general" && "rate" in data) {
    return <p>${data.rate ? data.rate.toFixed(2) : 0}</p>;
  }

  return <p>$0</p>;
};
