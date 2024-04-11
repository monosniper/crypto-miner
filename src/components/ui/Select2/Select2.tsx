import { useOutside } from "@/hooks";
import styles from "./Select2.module.css";

import { FC, useState, useRef, useEffect } from "react";
import { SelectItemWithIcon } from "@/types";

interface Item extends SelectItemWithIcon {
  title: string | JSX.Element;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  list: Item[];
};

export const Select2: FC<Props> = ({ value, onChange, list }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);
  const [icon, setIcon] = useState<JSX.Element | string>();

  useOutside(ref, () => setOpen(false));

  useEffect(() => {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];

      if (item.value === value && item.icon) {
        setIcon(item.icon);
      }
    }
  }, [list, value]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.select} onClick={() => setOpen((prev) => !prev)}>
        {icon ? (
          <>
            {typeof icon !== "string" ? (
              icon
            ) : (
              <img className="w-3 h-3" src={icon} alt="icon" />
            )}
          </>
        ) : null}

        <span>{value}</span>

        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
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
        <div className={styles.list} ref={ref}>
          {list.map((el, idx) => {
            return (
              <div
                key={idx}
                className={styles.item}
                onClick={() => {
                  onChange(el.value as "rus" | "eng");
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
