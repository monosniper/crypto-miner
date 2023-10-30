import { Coins, Convertations, News, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetArticlesQuery } from "@/redux/api/articlesApi";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { useGetConvertationsQuery } from "@/redux/api/userApi";

export const MainPage = () => {
  const { data, isLoading, isFetching } = useGetCoinsQuery(null);
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
