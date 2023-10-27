import { Link } from "react-router-dom";
import { FC } from "react";
import styles from "./SocialsLink.module.css";

type Props = {
  href: string;
  icon: JSX.Element;
};

export const SocialsLink: FC<Props> = ({ href, icon }) => {
  return (
    <Link className={styles.link} to={href}>
      {icon}
    </Link>
  );
};
