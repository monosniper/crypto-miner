import { CoinSkelet, ConvertationsItem, EmptyText, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetConvertationsQuery } from "@/redux/api/userApi";
import { Link } from "react-router-dom";

export const Convertations = () => {
  const { data, isLoading, isFetching } = useGetConvertationsQuery(null);

  const loading = useLoading(isLoading, isFetching);

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
            {data && data.length > 0 ? (
              data.map((el) => {
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
