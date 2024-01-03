import { FC, useState } from "react";

type Props = {
  value?: number;
  onClickItem: (item: number) => void;
  list: {
    title: string;
    value: number;
  }[];
};

export const TextFieldSelect: FC<Props> = ({ value, onClickItem, list }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="relative">
      <p
        className="cursor-pointer hover:text-primary"
        onClick={() => setOpen((prev) => !prev)}
      >
        {list.length > 0
          ? list.find((el) => el.value === value)?.title || list[0].title
          : ""}
      </p>

      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] right-0 box max-h-[200px] overflow-y-auto scrollbar-none">
          {list.map((el, idx) => {
            return (
              <div
                key={idx}
                className="p-2 hover:text-primary cursor-pointer"
                onClick={() => {
                  onClickItem(el.value);

                  setOpen(false);
                }}
              >
                {el.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
