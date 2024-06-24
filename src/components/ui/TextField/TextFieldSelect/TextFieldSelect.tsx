import { useOutside } from "@/hooks";
import { FC, useEffect, useRef, useState } from "react";

type ListItem = {
  title: string;
  value: number;
  icon?: string;
};

type Props = {
  value?: number;
  onClickItem: (item: number) => void;
  list: ListItem[];
};

export const TextFieldSelect: FC<Props> = ({ value, onClickItem, list }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [currentItem, setCurrentItem] = useState<ListItem>();

  useOutside(ref, () => setOpen(false));

  useEffect(() => {
    if (!list) return;

    const foundItem =
      list.find((el) => el.value === value) || list[0] || undefined;

    setCurrentItem(foundItem);
  }, [list, value]);

  return (
    <div className="relative" ref={ref}>
      <p
        className="cursor-pointer hover:text-primary flex items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentItem?.icon && (
          <img
            className="w-5 h-5"
            src={currentItem.icon}
            alt={currentItem.title}
          />
        )}

        {currentItem?.title}
      </p>

      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] right-0 box max-h-[200px] overflow-y-auto scrollbar-none z-20 min-w-[100px]">
          {list.map((el, idx) => {
            return (
              <div
                key={idx}
                className="p-2 hover:text-primary cursor-pointer flex items-center gap-2"
                onClick={() => {
                  onClickItem(el.value);

                  setOpen(false);
                }}
              >
                {Boolean(el.icon) && (
                  <img className="w-5 h-5" src={el.icon} alt={el.title} />
                )}

                {el.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
