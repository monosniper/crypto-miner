export const TradingChart = () => {
  // const svgRef = useRef<SVGSVGElement | null>(null);
  // const containerRef = useRef<HTMLDivElement | null>(null);
  // const [data] = useState([
  //   100, 200, 300, 250, 400, 350, 700, 300, 450, 100, 200, 300, 250, 400, 350,
  //   700, 300, 450, 100, 200, 300, 250, 400, 350, 700, 300, 450, 100, 200, 300,
  //   250, 400, 350, 700, 300, 450, 100, 200, 300, 250, 400, 350, 700, 300, 450,
  //   100, 200, 300, 250, 400, 350, 700, 300, 450, 100, 200, 300, 250, 400, 350,
  //   700, 300, 450, 100, 200, 300, 250, 400, 350, 700, 300, 450,
  // ]);
  // const { theme } = useAppSelector(main);
  // const [hoveredData, setHoveredData] = useState<number | null>(null);
  // const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // const [isDragging, setDragging] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  // useEffect(() => {
  //   const draw = () => {
  //     const height = 246;

  //     const numRows = 4; // Количество строк квадратов
  //     const numSquares = data.length;
  //     const squareHeight = height / numRows; // Высота каждой строки
  //     const squareWidth = 93;

  //     const maxValue = d3.max(data) || 1;
  //     const minValue = d3.min(data) || 0;

  //     // Очищаем предыдущий график, если он был
  //     d3.select(svgRef.current).selectAll("*").remove();

  //     // Создаем SVG элемент
  //     const svg = d3
  //       .select(svgRef.current)
  //       .attr("width", numSquares * squareWidth)
  //       .attr("height", height);

  //     const squaresGroup = svg.append("g");

  //     for (let i = 0; i < numRows; i++) {
  //       for (let j = 0; j < numSquares; j++) {
  //         const squareX = j * squareWidth;
  //         const squareY = i * squareHeight;

  //         squaresGroup
  //           .append("rect")
  //           .attr("x", squareX)
  //           .attr("y", squareY)
  //           .attr("width", squareWidth) // Фиксированная ширина
  //           .attr("height", squareHeight)
  //           .attr("fill", "none") // Нет заполнения
  //           .attr(
  //             "stroke",
  //             theme === "light" ? "#F6F8F9" : "rgba(255, 255, 255, 0.05)",
  //           ) // Цвет границы
  //           .attr("stroke-width", 0.5); // Толщина границы
  //       }
  //     }

  //     // Создаем шкалу для x и y
  //     const xScale = d3
  //       .scaleLinear()
  //       .domain([0, data.length - 1]) // Изменили диапазон
  //       .range([10, squareWidth * data.length]);

  //     const yScale = d3
  //       .scaleLinear()
  //       .domain([minValue, maxValue])
  //       .range([height - 10, 20]);

  //     // Создаем градиент для заливки
  //     const gradient = svg
  //       .append("defs")
  //       .append("linearGradient")
  //       .attr("id", "chartGradient")
  //       .attr("x1", "100%")
  //       .attr("x2", "100%")
  //       .attr("y1", "0%")
  //       .attr("y2", "100%");

  //     gradient
  //       .append("stop")
  //       .attr("offset", "0%")
  //       .attr("stop-color", theme === "light" ? "#C1AAFF" : "#7C55E7"); // Начальный цвет градиента (яркий)

  //     gradient
  //       .append("stop")
  //       .attr("offset", "100%")
  //       .attr("stop-color", theme === "light" ? "#C1AAFF00" : "#7C55E700"); // Конечный цвет градиента (тусклый)

  //     // Создаем кривую Безье
  //     d3.curveCardinal.tension(0.3); // Здесь можно настроить уровень напряжения (tension)

  //     // Создаем заливку под линией с использованием градиента
  //     const area = d3
  //       .area<number>()
  //       .x((_, i) => xScale(i))
  //       .y0(height) // Начало заливки на дне графика
  //       .y1((d) => yScale(d));

  //     // Рисуем заливку с градиентом
  //     svg
  //       .append("path")
  //       .datum(data)
  //       .transition()
  //       .duration(500)
  //       .attr("fill", "url(#chartGradient)") // Используем градиент
  //       .attr("d", area);

  //     // Создаем линию с кривой Безье
  //     const line = d3
  //       .line<number>()
  //       .x((_, i) => xScale(i))
  //       .y((d) => yScale(d))
  //       .curve(d3.curveCardinal.tension(0.3));

  //     // Рисуем линию поверх заливки
  //     svg
  //       .append("path")
  //       .datum(data)
  //       .transition()
  //       .duration(200)
  //       .attr("fill", "none") // Нет заливки
  //       .attr("stroke", "#906BF5") // Цвет линии
  //       .attr("stroke-width", 2) // Толщина линии
  //       .attr("d", line);

  //     svg
  //       .selectAll(".data-point")
  //       .data(data)
  //       .enter()
  //       .append("circle")
  //       .attr("class", "data-point")
  //       .attr("cx", (_, i) => xScale(i))
  //       .attr("cy", (d) => yScale(d))
  //       .attr("r", 5) // Размер точки
  //       .attr("fill", "#906BF5")
  //       .style("fill-opacity", 1);

  //     // Обработчик наведения на точку
  //     svg
  //       .selectAll<SVGCircleElement, number>(".data-point")
  //       .on("mouseover", (event, d) => {
  //         setHoveredData(d); // Сохраняем данные точки в состоянии
  //         setTooltipPosition({ x: event.pageX, y: event.pageY }); // Позиция tooltip
  //       })
  //       .on("mouseout", () => {
  //         setHoveredData(null); // Сбрасываем данные при уходе с точки
  //       })
  //       .attr("fill", "#906BF5") // Цвет точки
  //       .style("fill-opacity", 0);
  //   };

  //   draw();
  //   window.addEventListener("resize", draw);

  //   return () => {
  //     window.removeEventListener("resize", draw);
  //   };
  // }, [data, theme]);

  // const handleMouseDown = (e: MouseEvent) => {
  //   if (containerRef.current) {
  //     setDragging(true);
  //     setStartX(e.pageX - containerRef.current.offsetLeft);
  //     setScrollLeft(containerRef.current.scrollLeft);
  //   }
  // };

  // const handleMouseUp = () => {
  //   setDragging(false);
  // };

  // const handleMouseMove = (e: MouseEvent) => {
  //   if (!isDragging || !containerRef.current) return;
  //   e.preventDefault();
  //   const x = e.pageX - containerRef.current.offsetLeft;
  //   const walk = (x - startX) * 1;
  //   containerRef.current.scrollLeft = scrollLeft - walk;
  // };

  // const handleMouseLeave = () => {
  //   setDragging(false);
  // };

  // return (
  //   <div
  //     className="w-full overflow-x-scroll max-w-full pb-8 mb-8 trading-chart-scrollbar cursor-move"
  //     ref={containerRef}
  //     onMouseDown={handleMouseDown}
  //     onMouseUp={handleMouseUp}
  //     onMouseMove={handleMouseMove}
  //     onMouseLeave={handleMouseLeave}
  //   >
  //     <svg ref={svgRef}></svg>
  //   </div>
  // );

  return <div></div>;
};
