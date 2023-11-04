import { FC } from "react";
import { CoinSkelet, ConvertationsItem, EmptyText, Title } from "@/components";
import { Convertation } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  list?: Convertation[];
  loading?: boolean;
  classNameItem?: string;
};

export const Convertations: FC<Props> = ({ list, loading = false }) => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-between items-center gap-4">
        <Title title="Конвертации" />

        <Link
          className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100"
          to="/wallet"
        >
          Все конвертации
        </Link>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {loading ? (
          <>
            <CoinSkelet />
            <CoinSkelet />
            <CoinSkelet />
          </>
        ) : (
          <>
            {list && list.length > 0 ? (
              list.map((el) => {
                return <ConvertationsItem key={el.id} data={el} />;
              })
            ) : (
              <EmptyText text="Нет конвертаций" />
            )}
          </>
        )}
      </div>
    </div>
  );
};
