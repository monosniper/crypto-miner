import { FC, useEffect, useState } from "react";
import { CoinSkelet, ConvertationsItem, EmptyText, Title } from "@/components";
import { Convertation } from "@/types";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { main, setGoToBlock } from "@/redux/slices/mainSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  list?: Convertation[];
  loading?: boolean;
  classNameItem?: string;
};

export const Convertations: FC<Props> = ({ list, loading = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { goToBlock } = useAppSelector(main);
  const [isNavigate, setIsNavigate] = useState(false);

  useEffect(() => {
    if (goToBlock !== "history" || !isNavigate) return;

    navigate("/wallet");
  }, [goToBlock, isNavigate, navigate]);

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-between items-center gap-4">
        <Title title={t("conversions")} />

        <button
          className="py-2.5 px-4 rounded-full border border-base-border-100 border-solid bg-base-200 text-sm leading-none text-base-content-100"
          onClick={() => {
            dispatch(setGoToBlock("history"));

            setIsNavigate(true);
          }}
        >
          {t("all-conversions")}
        </button>
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
              <EmptyText text={t("no-conversions")} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
