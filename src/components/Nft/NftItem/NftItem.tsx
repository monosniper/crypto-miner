import { ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import styles from "./NftItem.module.css";
import { useAppDispatch } from "@/redux/store";
import { setOpenModal } from "@/redux/slices/modalsOpensSlice";
import { NamesModals } from "@/types";

export const NftItem = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className="relative w-full">
        <img
          className="rounded-lg w-full h-full"
          src="/images/nft-img.png"
          alt="nft"
        />

        <Button
          className={styles.btn}
          title="Вывести"
          color="standart"
          icon={<ExportIcon width={20} height={20} />}
          onClick={() => {
            dispatch(
              setOpenModal({
                stateNameModal: NamesModals.isOpenNftWithdrawModal,
                isOpen: true,
              }),
            );
          }}
        />
      </div>
      <p className="text-center py-4 font-semibold text-xl">40 BTC</p>
    </div>
  );
};
