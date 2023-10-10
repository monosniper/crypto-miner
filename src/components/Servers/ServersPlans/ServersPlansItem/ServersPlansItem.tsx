import { BookmarksIcon } from "@/components/icons";
import { PropsWithClassName } from "@/types";
import cn from "clsx";
import { FC } from "react";

export const ServersPlansItem: FC<PropsWithClassName> = ({ className }) => {
  return (
    <div className={cn(className, "box", "bg-base-gradient-100 p-6")}>
      <div>
        <BookmarksIcon />

        <h3>Базовый</h3>

        <h4>$1 000</h4>

        <div className="mt-6 pt-6 border-t border-base-border-100 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <BookmarksIcon />

            <p>Доступ к оборудованию</p>
          </div>
        </div>
      </div>
    </div>
  );
};
