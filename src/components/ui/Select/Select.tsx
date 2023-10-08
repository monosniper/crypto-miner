import { useOutside } from "@/hooks";
import styles from "./Select.module.css";

import { FC, useState, useRef, useEffect } from "react";
import { SelectItemWithIcon } from "@/types";

interface Item extends SelectItemWithIcon {
  title: string;
}

type Props = {
  value: string | SelectItemWithIcon;
  onChange: (value: string) => void;
  list: Item[];
};

export const Select: FC<Props> = ({ value, onChange, list }) => {
  const { title } = list.find((el) => el.value === value) || {
    value: "no",
    title: "",
  };
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

        <span>{title}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
        >
          <path
            d="M1 1.25L4.5 4.75L8 1.25"
            stroke="black"
            strokeWidth="1.16667"
            strokeMiterlimit="10"
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
                <span>{el.title}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
