import { FC, MouseEventHandler } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MenuItem.module.css";
import cn from "clsx";

type PropsTogether = {
  type?: "button" | "link";
  icon: JSX.Element;
  title: string;
};

interface BtnProps extends PropsTogether {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface LinkProps extends PropsTogether {
  href: string;
}

type Props = BtnProps | LinkProps;

export const MenuItem: FC<Props> = ({
  type = "link",
  icon = <></>,
  title = "",

  ...props
}) => {
  const { href } = props as LinkProps;
  const { onClick } = props as BtnProps;
  const location = useLocation();

  return (
    <>
      {type === "link" ? (
        <Link
          className={cn(styles.item, {
            [styles.active]: location.pathname.includes(href),
          })}
          to={href}
        >
          {icon}
          <span>{title}</span>
        </Link>
      ) : (
        <button className={styles.item} onClick={onClick}>
          {icon}
          <span>{title}</span>
        </button>
      )}
    </>
  );
};
