import { CoinSkelet, EmptyText, NewsItem, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetArticlesQuery } from "@/redux/api/articlesApi";
import { Link } from "react-router-dom";

export const News = () => {
  const { data, isLoading, isFetching } = useGetArticlesQuery(null);

  const loading = useLoading(isLoading, isFetching);

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
            {data && data.length > 0 ? (
              <>
                {data.slice(0, 3).map((el) => {
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
