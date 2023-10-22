import { ExportIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import styles from "./NftItem.module.css";

export const NftItem = () => {
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
        />
      </div>
      <p className="text-center py-4 font-semibold text-xl">40 BTC</p>
    </div>
  );
};
