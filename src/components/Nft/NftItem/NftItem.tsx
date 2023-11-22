import { FC } from "react";
import { ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import styles from "./NftItem.module.css";
import { useAppDispatch } from "@/redux/store";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { NamesModals, Nft } from "@/types";
import { useTranslation } from "react-i18next";
import { setWithdrawNftData } from "@/redux/slices/withdrawNftModalSlice";

type Props = {
  data: Nft;
};

export const NftItem: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className="relative w-full">
        <img
          className="rounded-lg w-full h-full"
          src={data.image_url}
          alt="nft"
        />

        <Button
          className={styles.btn}
          title={t("withdraw")}
          color="standart"
          icon={<ExportIcon width={20} height={20} />}
          onClick={() => {
            dispatch(
              setOpenModal({
                stateNameModal: NamesModals.isOpenNftWithdrawModal,
                isOpen: true,
              }),
            );

            dispatch(setWithdrawNftData(data));
          }}
        />
      </div>
      <h3 className="text-center pt-4 font-semibold text-2xl">{data.name}</h3>
      <p className="text-center py-4 font-semibold text-xl">{data.price} BTC</p>
    </div>
  );
};
