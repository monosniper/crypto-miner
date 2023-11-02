import { Coins, Convertations, News, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetArticlesQuery } from "@/redux/api/articlesApi";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useGetConvertationsQuery } from "@/redux/api/userApi";
import { main, setShowHideCoins } from "@/redux/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export const MainPage = () => {
  const { data, isLoading, isFetching } = useGetCoinsQuery(null);
  const { showHideCoins } = useAppSelector(main);
  const dispatch = useAppDispatch();

  const {
    data: convertationsList,
    isLoading: convertationsIsLoading,
    isFetching: convertationsIsFetching,
  } = useGetConvertationsQuery(null);
  const {
    data: articlesList,
    isLoading: articlesIsLoading,
    isFetching: articlesIsFetching,
  } = useGetArticlesQuery(null);

  const coinsLoading = useLoading(isLoading, isFetching);
  const convertationsLoading = useLoading(
    convertationsIsLoading,
    convertationsIsFetching,
  );
  const articlesLoading = useLoading(articlesIsLoading, articlesIsFetching);

  return (
    <div>
      <Title className="flex lg:hidden pb-6" title="Главная" />

      <div className="flex justify-start mb-4">
        <button
          className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100 border-solid"
          onClick={() => dispatch(setShowHideCoins(!showHideCoins))}
        >
          {showHideCoins ? "Не показывать скрытые" : "Показать скрытые"}
        </button>
      </div>

      <Coins rows={data} draggableItems={true} loading={coinsLoading} />

      <div className="flex flex-wrap mt-16 -m-6">
        <div className="w-full md:w-1/2 p-6">
          <News
            list={articlesList ? articlesList.slice(0, 3) : articlesList}
            loading={articlesLoading}
          />
        </div>

        <div className="w-full md:w-1/2 p-6">
          <Convertations
            list={
              convertationsList
                ? convertationsList.slice(0, 3)
                : convertationsList
            }
            loading={convertationsLoading}
          />
        </div>
      </div>
    </div>
  );
};
