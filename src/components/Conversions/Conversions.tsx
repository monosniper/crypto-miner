import { CoinSkelet, ConversionsItem, EmptyText, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetConversionsQuery } from "@/redux/api/conversionsApi";
import { Link } from "react-router-dom";

export const Conversions = () => {
  const { data, isLoading, isFetching } = useGetConversionsQuery(null);

  const loading = useLoading(isLoading, isFetching);

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-between items-center gap-4">
        <Title title="Конвертации" />

        <Link
          className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100"
          to="/"
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
            {data && data.length > 0 ? (
              data.map((el) => {
                return <ConversionsItem key={el.id} data={el} />;
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
