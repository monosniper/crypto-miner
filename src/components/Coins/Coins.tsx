import { CoinBlock, CoinSkelet } from "@/components";
import { Coin, CoinWithOrder, PropsWithClassName } from "@/types";
import { FC, useEffect, useState, DragEvent, TouchEvent } from "react";
import cn from "clsx";
import { changeClassParentEl } from "@/utils";

type Props = {
  rows: Coin[] | undefined;
  draggableItems?: boolean;
  loading?: boolean;
};

export const Coins: FC<PropsWithClassName<Props>> = ({
  className,
  rows,
  draggableItems = false,
  loading = false,
}) => {
  const [list, setList] = useState<CoinWithOrder[]>();
  const [currentCoin, setCurrentCoin] = useState<null | CoinWithOrder>(null);
  const skeletItems = Array(8).fill(0);

  useEffect(() => {
    if (!rows) return;

    const coinsWithOrder = rows.map((el, idx) => {
      return { ...el, order: idx + 1 };
    });

    setList(coinsWithOrder);
  }, [rows]);

  const dragStartHandler = (coin: CoinWithOrder) => {
    setCurrentCoin(coin);
  };

  const dragEndHandler = (e: DragEvent | TouchEvent) => {
    changeClassParentEl(e, "remove", "overCoin", "draggableEl");
  };

  const dragOverHandler = (e: DragEvent | TouchEvent) => {
    e.preventDefault();

    changeClassParentEl(e, "add", "overCoin", "draggableEl");
  };

  const dropHandler = (e: DragEvent | TouchEvent, coin: CoinWithOrder) => {
    e.preventDefault();

    if (!list) return;

    if (currentCoin) {
      setList(
        list.map((el) => {
          if (el.id === coin.id) {
            return { ...el, order: currentCoin.order };
          }

          if (el.id === currentCoin.id) {
            return { ...el, order: coin.order };
          }

          return el;
        }),
      );
    }

    changeClassParentEl(e, "remove", "overCoin", "draggableEl");
  };

  const changeLocation = (direction: "top" | "bottom", coin: CoinWithOrder) => {
    if (!list) return;
    const coinIdx = list.findIndex((el) => el.id === coin.id);

    if (coinIdx > 0) {
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
    }
  };

  const sortCoins = (coinOne: CoinWithOrder, coinTwo: CoinWithOrder) => {
    if (coinOne.order > coinTwo.order) {
      return 1;
    } else {
      return -1;
    }
  };

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
          {list &&
            list.sort(sortCoins).map((el, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                >
                  <CoinBlock
                    data={el}
                    draggable={draggableItems}
                    onDragStart={dragStartHandler}
                    onDragLeave={dragEndHandler}
                    onDragEnd={dragEndHandler}
                    onDragOver={dragOverHandler}
                    onDrop={dropHandler}
                    changeLocation={changeLocation}
                  />
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
