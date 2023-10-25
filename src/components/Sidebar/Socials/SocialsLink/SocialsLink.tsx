import { Link } from "react-router-dom";
import { FC } from "react";

type Props = {
  href: string;
  icon: JSX.Element;
};

export const SocialsLink: FC<Props> = ({ href, icon }) => {
  return (
    <Link className="w-4 h-4 cursor-pointer" to={href}>
      {icon}
    </Link>
  );
};
