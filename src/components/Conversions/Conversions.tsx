import { ConversionsItem, Title } from "@/components";
import { Link } from "react-router-dom";

export const Conversions = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center gap-4">
        <Title title="Конвертации" />

        <Link
          className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100"
          to="/"
        >
          Все конвертации
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <ConversionsItem />
        <ConversionsItem />
        <ConversionsItem />
        <ConversionsItem />
      </div>
    </div>
  );
};
