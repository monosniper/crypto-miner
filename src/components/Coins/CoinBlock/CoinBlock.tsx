import { FC, useEffect, useRef, useState } from "react";
import { ArrTopIcon, MoreInfoIcon, MoveIcon } from "../../icons";
import styles from "./CoinBlock.module.css";
import * as d3 from "d3";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main } from "@/redux/slices/mainSlice";
import { Coin, PropsWithClassName } from "@/types";
import cn from "clsx";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { coins, setCoinsList } from "@/redux/slices/coinsSlice";
import { useOutside } from "@/hooks";

export type Props = {
  type?: "my" | "general";
  data: Coin;
  draggable?: boolean;
  active?: boolean;
};

export const CoinBlock: FC<PropsWithClassName<Props>> = ({
  className,
  type = "general",
  data,
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
  const menuRef = useRef<HTMLDivElement>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { theme } = useAppSelector(main);

  useEffect(() => {
    if (!("graph_today" in data) || type === "my" || data.graph_today === null)
      return;

    const draw = () => {
      const parentWidth = svgRef.current?.parentElement?.clientWidth || 400;

      const width = parentWidth;
      const height = 50;

      const maxValue = d3.max(data.graph_today) || 1;
      const minValue = d3.min(data.graph_today) || 0;

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
        .domain([
          0,
          data.graph_today.length > 0 ? data.graph_today.length - 1 : 1,
        ]) // Изменили диапазон
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
        .datum(data.graph_today)
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
        .datum(data.graph_today)
        .transition()
        .duration(200)
        .attr("fill", "none") // Нет заливки
        .attr("stroke", "#906BF5") // Цвет линии
        .attr("stroke-width", 4) // Толщина линии
        .attr("d", line);

      svg
        .selectAll(".data-point")
        .data(data.graph_today)
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
        .on("touchstart", (event, d) => {
          setHoveredData(d); // Сохраняем данные точки в состоянии при касании
          const touch = event.touches[0];
          setTooltipPosition({ x: touch.pageX, y: touch.pageY }); // Позиция tooltip при касании
        })
        .on("touchend", () => {
          setHoveredData(null); // Сбрасываем данные при окончании касания
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

  useOutside(menuRef, () => setOpenMenu(false));

  const hideCoinHandler = () => {
    setOpenMenu(false);

    const updateList = coinsList?.map((coin) => {
      if (coin.id === data.id) {
        return { ...coin, hide: !data.hide };
      }

      return coin;
    });

    dispatch(setCoinsList(updateList));
  };

  return (
    <div
      className={cn("h-full flex flex-col", {
        "relative z-50": active,
      })}
      ref={setNodeRef}
      style={style}
      {...(window.innerWidth > 1024 ? attributes : {})}
      {...(window.innerWidth > 1024 ? listeners : {})}
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

            {type === "general" && (
              <div className="flex items-center gap-4">
                <div className="relative" ref={menuRef}>
                  <div
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => setOpenMenu((prev) => !prev)}
                    onTouchStart={() => setOpenMenu((prev) => !prev)}
                  >
                    <MoreInfoIcon
                      className="[&>g>circle]:fill-base-content-100"
                      width={24}
                      height={24}
                    />
                  </div>

                  {isOpenMenu && (
                    <div className="absolute top-full right-0 w-[100px] bg-base-300 text-base-content-100 text-xs rounded-md overflow-hidden z-10">
                      <div
                        className="flex items-center gap-1 hover:bg-primary/20 cursor-pointer px-2 py-1"
                        onClick={hideCoinHandler}
                        onTouchStart={hideCoinHandler}
                      >
                        {data.hide ? "Показывать" : "Скрыть"}
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    "lg:hidden p-1 bg-base-300/50 rounded ease-linear duration-200 touch-none",
                    {
                      "!bg-base-300": active,
                    },
                  )}
                  {...(window.innerWidth < 1024 ? attributes : {})}
                  {...(window.innerWidth < 1024 ? listeners : {})}
                >
                  <MoveIcon
                    className="[&>g>path]:stroke-base-content-100"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            )}
          </div>

          {type === "general" &&
            "graph_today" in data &&
            data.graph_today !== null && (
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
            {"change" in data && type !== "my" && (
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

const Rate: FC<{ type: "my" | "general"; data: Coin }> = ({ type, data }) => {
  if (type === "my" && "balance" in data) {
    return <p>${data.balance}</p>;
  }

  if (type === "general" && "rate" in data) {
    return <p>${data.rate ? data.rate.toFixed(2) : 0}</p>;
  }

  return <p>$0</p>;
};
