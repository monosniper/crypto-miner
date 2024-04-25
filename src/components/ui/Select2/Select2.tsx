import { useOutside } from "@/hooks";
import styles from "./Select2.module.css";

import { FC, useState, useRef } from "react";
import { SelectItemWithIcon } from "@/types";
import cn from "clsx";

interface Item extends SelectItemWithIcon {
  title: string | JSX.Element;
}

type Props = {
  onChange: (value: string) => void;
  list: Item[];
};

export const Select2: FC<Props> = ({ onChange, list }) => {
  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState(list[0].value);
  const ref = useRef(null);
  const btnRef = useRef(null);

  useOutside(ref, () => setOpen(false), btnRef);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.select}
        onClick={() => setOpen((prev) => !prev)}
        ref={btnRef}
      >
        <span className="truncate">{value}</span>

        <svg className="min-w-[15px]" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M11.875 5.625L8.20711 9.29289C7.81658 9.68342 7.18342 9.68342 6.79289 9.29289L3.125 5.625"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className={cn(styles.list, "scrollbar-menu")} ref={ref}>
          {list.map((el, idx) => {
            return (
              <div
                key={idx}
                className={styles.item}
                onClick={() => {
                  onChange(el.value);
                  setValue(el.value);
                  setOpen(false);
                }}
              >
                {el.icon ? (
                  <>
                    {typeof el.icon !== "string" ? (
                      el.icon
                    ) : (
                      <img className="w-3 h-3" src={el.icon} alt="icon" />
                    )}
                  </>
                ) : null}
                {el.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
