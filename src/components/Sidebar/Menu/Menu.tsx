import {
  HomeIcon,
  NftWalletIcon,
  WalletIcon,
  MiningIcon,
  LightingIcon,
  PartnerIcon,
  ExitIcon,
  ConverIcon,
} from "@/components/icons";
import { MenuItem } from "./MenuItem/MenuItem";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

export const Menu = () => {
  const { t } = useTranslation();

  const logout = () => {
    localStorage.removeItem("mainUserData");
    Cookies.remove("token");

    document.location.reload();
  };

  return (
    <div className="flex flex-col gap-2">
      <MenuItem icon={<HomeIcon />} title={t("main")} href="/main" />

      <div className="mt-4">
        <h6 className="text-gray-1 text-xs uppercase">{t("wallet")}</h6>

        <div className="flex flex-col gap-2 mt-2">
          <MenuItem icon={<WalletIcon />} title={t("wallet")} href="/wallet" />
          <MenuItem
            icon={<NftWalletIcon />}
            title={t("nft-wallet")}
            href="/nft-wallet"
          />
          <MenuItem icon={<MiningIcon />} title={t("mining")} href="/mining" />
          <MenuItem
            icon={<LightingIcon />}
            title={t("working-servers")}
            href="/working-servers"
          />
          <MenuItem
            icon={<ConverIcon />}
            title={t("conversions")}
            href="/converter"
          />
        </div>
      </div>

      <div className="mt-4">
        <h6 className="text-gray-1 text-xs uppercase">{t("profile")}</h6>

        <div className="flex flex-col gap-2 mt-2">
          {/* <MenuItem
            icon={<ProfileIcon />}
            title={t("profile")}
            href="/profile"
          /> */}
          <MenuItem
            icon={<PartnerIcon />}
            title={t("partnership")}
            href="/partnership"
          />
          <MenuItem
            type="button"
            icon={<ExitIcon />}
            title={t("exit")}
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};
