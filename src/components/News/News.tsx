import { FC } from "react";
import { CoinSkelet, EmptyText, NewsItem, Title } from "@/components";
import { News as NewsTypes } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  list?: NewsTypes[];
  loading?: boolean;
};

export const News: FC<Props> = ({ list, loading = false }) => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-between items-center gap-4">
        <Title title="Новости" />

        <Link
          className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100"
          to="/"
        >
          Больше новостей
        </Link>
      </div>

      <div className="flex flex-col gap-4 flex-grow">
        {/* <NewsItem />
        <NewsItem />
        <NewsItem /> */}

        {loading ? (
          <>
            <CoinSkelet />
            <CoinSkelet />
            <CoinSkelet />
          </>
        ) : (
          <>
            {list && list.length > 0 ? (
              <>
                {list.slice(0, 3).map((el) => {
                  return <NewsItem key={el.id} data={el} />;
                })}
              </>
            ) : (
              <EmptyText text="Нет новостей" />
            )}
          </>
        )}
      </div>
    </div>
  );
};
