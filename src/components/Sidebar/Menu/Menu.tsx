import {
  ConverIcon,
  HistoryIcon,
  HomeIcon,
  NftWalletIcon,
  WalletIcon,
  MiningIcon,
  LightingIcon,
  ProfileIcon,
  PartnerIcon,
  ExitIcon,
} from "@/components/icons";
import { MenuItem } from "./MenuItem/MenuItem";

export const Menu = () => {
  const logout = () => {
    localStorage.removeItem("mainUserData");

    document.location.reload();
  };

  return (
    <div className="flex flex-col gap-2">
      <MenuItem icon={<HomeIcon />} title="Главная" href="/main" />

      <div className="mt-4">
        <h6 className="text-gray-1 text-xs uppercase">Кошелек</h6>

        <div className="flex flex-col gap-2 mt-2">
          <MenuItem icon={<ConverIcon />} title="Конвертация" href="/convert" />
          <MenuItem icon={<WalletIcon />} title="Кошелек" href="/wallet" />
          <MenuItem
            icon={<NftWalletIcon />}
            title="NFT-Кошелек"
            href="/nft-wallet"
          />
          <MenuItem icon={<MiningIcon />} title="Майнинг" href="/mining" />
          <MenuItem icon={<HistoryIcon />} title="История" href="/history" />
          <MenuItem
            icon={<LightingIcon />}
            title="Рабочие сервера"
            href="/working-servers"
          />
        </div>
      </div>

      <div className="mt-4">
        <h6 className="text-gray-1 text-xs uppercase">ПРОФИЛЬ</h6>

        <div className="flex flex-col gap-2 mt-2">
          <MenuItem icon={<ProfileIcon />} title="Профиль" href="/profile" />
          <MenuItem
            icon={<PartnerIcon />}
            title="Партнёрство"
            href="/partner"
          />
          <MenuItem
            type="button"
            icon={<ExitIcon />}
            title="Выйти"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};
