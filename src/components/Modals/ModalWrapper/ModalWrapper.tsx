import { FC, ReactNode, useEffect } from "react";
import cn from "clsx";
import { PropsWithClassName } from "@/types";

type Props = {
  children: ReactNode;
  isOpen: boolean;
};

export const ModalWrapper: FC<PropsWithClassName<Props>> = ({
  className,
  children,
  isOpen,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        className,
        "fixed left-0 top-0 right-0 bottom-0 w-full h-screen flex justify-center items-center ease-linear duration-200 bg-black/80 z-50",
        {
          "opacity-0 pointer-events-none": !isOpen,
          "opacity-100": isOpen,
        }
      )}
    >
      <div className="overflow-y-auto">
        <div
          className={cn("opacity-100 ease-linear duration-150 px-4", {
            "opacity-0 scale-[0.2]": !isOpen,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
