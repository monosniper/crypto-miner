import { CoinBlock, CoinSkelet } from "@/components";
import { Coin, CoinWithOrder, PropsWithClassName } from "@/types";
import { FC, useEffect, useState } from "react";
import cn from "clsx";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

type Props = {
  rows: Coin[] | undefined;
  draggableItems?: boolean;
  loading?: boolean;
};

export const Coins: FC<PropsWithClassName<Props>> = ({
  className,
  rows,
  loading = false,
  draggableItems = false,
}) => {
  const [list, setList] = useState<CoinWithOrder[]>();
  const skeletItems = Array(8).fill(0);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  useEffect(() => {
    if (!rows) return;
    const coinsStorage: CoinWithOrder[] =
      JSON.parse(localStorage.getItem("coins") || "[]") || [];

    if (coinsStorage.length > 0) {
      const coinsWithOrder = [];

      for (let i = 0; i < coinsStorage.length; i++) {
        const coinsStorageItem = coinsStorage[i];

        for (let j = 0; j < rows.length; j++) {
          const rowsItem = rows[j];

          if (coinsStorageItem.id === rowsItem.id) {
            const coinWithUpdateOrder = {
              ...rowsItem,
              order: coinsStorageItem.order,
            };

            coinsWithOrder.push(coinWithUpdateOrder);
          }
        }
      }

      setList(coinsWithOrder);
    } else {
      const coinsWithOrder = rows.map((el, idx) => {
        return { ...el, order: idx + 1 };
      });

      setList(coinsWithOrder);
    }
  }, [rows]);

  const changeLocation = (direction: "top" | "bottom", coin: CoinWithOrder) => {
    if (!list) return;
    const coinIdx = list.findIndex((el) => el.id === coin.id);

    const updatedList = [...list];

    const coinToMove = updatedList.splice(coinIdx, 1)[0];
    updatedList.splice(
      direction === "top" ? coinIdx - 1 : coinIdx + 1,
      0,
      coinToMove,
    );

    updatedList.forEach((el, idx) => {
      el.order = idx;
    });

    setList(updatedList);
  };

  useEffect(() => {
    if (!list) return;
    const listWithoutOrders = list.map((el) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newItem: any = { ...el };
      delete newItem.order;

      return newItem;
    });

    const rowsStringify = JSON.stringify(rows);

    const listStringify = JSON.stringify(listWithoutOrders);

    if (rowsStringify === listStringify) return;

    localStorage.setItem("coins", JSON.stringify(list));
  }, [list, rows]);

  function handleDragEnd(event: DragEndEvent) {
    if (!list) return;

    const { active, over } = event;

    if (over && active.id !== over.id) {
      setList((prev) => {
        if (!prev) return;

        const oldIndex = prev.findIndex((el) => el.id === active.id);
        const newIndex = prev.findIndex((el) => el.id === over.id);

        console.log(oldIndex, newIndex);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      {loading ? (
        <>
          {skeletItems.map((_, idx) => {
            return (
              <div key={idx} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                <CoinSkelet />
              </div>
            );
          })}
        </>
      ) : (
        <>
          {list && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={list}>
                {list.map((el) => (
                  <div
                    key={el.id}
                    className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                  >
                    <CoinBlock
                      key={el.id}
                      data={el}
                      changeLocation={changeLocation}
                      draggable={draggableItems}
                    />
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </>
      )}
    </div>
  );
};
