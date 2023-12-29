import { Coins, News, Title } from "@/components";
import { useLoading } from "@/hooks";
import { useGetArticlesQuery } from "@/redux/api/articlesApi";
import { useGetCoinsQuery } from "@/redux/api/coinsApi";
import { main, setShowHideCoins } from "@/redux/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useTranslation } from "react-i18next";

export const MainPage = () => {
  const { data, isLoading, isFetching } = useGetCoinsQuery(null);
  const { showHideCoins } = useAppSelector(main);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // const {
  //   data: convertationsList,
  //   isLoading: convertationsIsLoading,
  //   isFetching: convertationsIsFetching,
  // } = useGetConvertationsQuery(null);
  const {
    data: articlesList,
    isLoading: articlesIsLoading,
    isFetching: articlesIsFetching,
  } = useGetArticlesQuery(null);

  const coinsLoading = useLoading(isLoading, isFetching);
  // const convertationsLoading = useLoading(
  //   convertationsIsLoading,
  //   convertationsIsFetching
  // );
  const articlesLoading = useLoading(articlesIsLoading, articlesIsFetching);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Title className="flex lg:hidden pb-6" title={t("main")} />

        <div className="flex items-center gap-5 flex-wrap justify-start mb-4">
          <button
            className="py-2.5 px-4 rounded-full border border-base-border-100 bg-base-200 text-sm leading-none text-base-content-100 border-solid"
            onClick={() => dispatch(setShowHideCoins(!showHideCoins))}
          >
            {showHideCoins ? t("dont-show-hidden") : t("show-hidden")}
          </button>

          <p className="hidden lg:block text-xs text-gray-1">
            {t("coins can be dragged with the mouse")}
          </p>
        </div>
      </div>

      <p className="text-xs text-center sm:text-right pb-4 text-gray-1 lg:hidden block">
        {t("coins can be dragged with the mouse")}
      </p>

      <Coins
        rows={data?.data}
        draggableItems={true}
        loading={data ? false : coinsLoading}
      />

      <div className="flex flex-wrap mt-16 -m-6">
        <div className="w-full md:w-1/2 p-6">
          <News
            list={articlesList ? articlesList.data.slice(0, 3) : undefined}
            loading={articlesLoading}
          />
        </div>

        {/* <div className="w-full md:w-1/2 p-6">
          <Convertations
            list={
              convertationsList
                ? convertationsList.data.slice(0, 3)
                : convertationsList
            }
            loading={convertationsLoading}
          />
        </div> */}
      </div>
    </div>
  );
};
