import { PropsWithClassName } from "@/types";
import { FC, RefObject } from "react";
import cn from "clsx";
import { Buy } from "../ui";
import { ServersItem } from "@/components";
import { useNavigate } from "react-router-dom";

type Props = {
  plansRef: RefObject<HTMLDivElement>;
};

export const Servers: FC<PropsWithClassName<Props>> = ({
  className,
  plansRef,
}) => {
  const navigate = useNavigate();

  const buyServerHandler = () => {
    if (!plansRef.current) return;

    plansRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className={cn(className, "flex flex-wrap -m-2")}>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <Buy title="Купить сервер" onClick={buyServerHandler} />
      </div>

      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <ServersItem type="button" onClick={() => navigate("/server/asd")} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <ServersItem type="button" onClick={() => navigate("/server/asd")} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <ServersItem type="button" onClick={() => navigate("/server/asd")} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <ServersItem type="button" onClick={() => navigate("/server/asd")} />
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <ServersItem type="button" onClick={() => navigate("/server/asd")} />
      </div>
    </div>
  );
};
