import cn from "clsx";
import { FC } from "react";

type Props = {
  isMy: boolean;
  text: string;
};

export const Message: FC<Props> = ({ isMy, text }) => {
  return (
    <div
      className={cn("px-3.5 py-2 rounded-[10px] w-max", {
        "rounded-br-none bg-purple-2 ml-auto": isMy,
        "rounded-bl-none bg-white": !isMy,
      })}
    >
      {text}
    </div>
  );
};
