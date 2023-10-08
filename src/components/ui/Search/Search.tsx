import { SearchIcon } from "@/components/icons";
import { PropsWithClassName } from "@/types";
import { ChangeEventHandler, FC } from "react";
import cn from "clsx";
import styles from "./Search.module.css";

type Props = {
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const Search: FC<PropsWithClassName<Props>> = ({
  className,
  placeholder,
  onChange,
  value = "",
}) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <SearchIcon />

      <input placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  );
};
