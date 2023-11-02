import { CoinBlock, CoinSkelet } from "@/components";
import { Coin, CoinWithHideAndOrder, PropsWithClassName } from "@/types";
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
  MouseSensor,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import {
  useGetCoinsPositionsQuery,
  useSetCoinsPositionsMutation,
} from "@/redux/api/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { coins, setCoinsList } from "@/redux/slices/coinsSlice";
import { main } from "@/redux/slices/mainSlice";

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
  const { coinsList } = useAppSelector(coins);
  const { showHideCoins } = useAppSelector(main);
  const skeletItems = Array(8).fill(0);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    }),
    useSensor(TouchSensor),
    useSensor(MouseSensor),
  );
  const [setCoinsPositions] = useSetCoinsPositionsMutation();
  const {
    data: coinsPositions,
    isSuccess: coinsPositionsIsSuccess,
    isLoading,
    isFetching,
  } = useGetCoinsPositionsQuery(null);
  const dispatch = useAppDispatch();
  const [activeCoinId, setActiveCoinId] = useState<number>();

  useEffect(() => {
    if (!rows || !coinsPositions) return;

    if (coinsPositions.length > 0) {
      const coinsWithHide = [];

      for (let i = 0; i < coinsPositions.length; i++) {
        const coinsStorageItem = coinsPositions[i];

        for (let j = 0; j < rows.length; j++) {
          const rowsItem = rows[j];

          if (coinsStorageItem.id === rowsItem.id) {
            const coinWithUpdateOrder = {
              ...rowsItem,
              hide: coinsStorageItem.hide,
            };

            coinsWithHide.push(coinWithUpdateOrder);
          }
        }
      }

      dispatch(setCoinsList(coinsWithHide));
    } else {
      const coinsWithOrder = rows.map((el) => {
        return { ...el, hide: false };
      });

      dispatch(setCoinsList(coinsWithOrder));
    }
  }, [coinsPositions, dispatch, rows]);

  useEffect(() => {
    if (!coinsList || !coinsPositions) return;
    const incomingList = coinsPositions.map((el) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newItem: CoinWithHideAndOrder = { ...el };
      delete newItem.order;
      delete newItem.hide;

      return newItem;
    });

    const listStringify = JSON.stringify(coinsList);

    const incomingListStringify = JSON.stringify(incomingList);

    if (listStringify === incomingListStringify) return;

    setCoinsPositions(coinsList);
  }, [coinsList, coinsPositions, setCoinsPositions]);

  function handleDragEnd(event: DragEndEvent) {
    if (!coinsList) return;
    setActiveCoinId(undefined);

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const list = coinsList;

      if (!list) return;

      const oldIndex = list.findIndex((el) => el.id === active.id);
      const newIndex = list.findIndex((el) => el.id === over.id);

      const resList = arrayMove(list, oldIndex, newIndex);

      return dispatch(setCoinsList(resList));
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCoinId(event.active.id as number);
  };

  return (
    <div className={cn(className, "flex flex-wrap items-stretch -m-2")}>
      {loading || isLoading || isFetching ? (
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
          {coinsList && coinsPositionsIsSuccess && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={coinsList.filter((el) => {
                  if (showHideCoins) return el;

                  return el.hide !== true;
                })}
              >
                {coinsList
                  .filter((el) => {
                    if (showHideCoins) return el;

                    return el.hide !== true;
                  })
                  .map((el) => {
                    return (
                      <div
                        key={el.id}
                        className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                      >
                        <CoinBlock
                          key={el.id}
                          data={el}
                          draggable={draggableItems}
                          active={activeCoinId === el.id ? true : false}
                        />
                      </div>
                    );
                  })}
              </SortableContext>
            </DndContext>
          )}
        </>
      )}
    </div>
  );
};
