import { Button } from "../Button/Button";

export const HogyxTapButton = () => {
  const clickHandler = () => {
    window.open("https://t.me/whales_mining_bot", "_blank");
  };

  return (
    <Button
      className="flex items-center gap-2"
      type="button"
      color="primary"
      icon={<img className="w-6 h-6" src="/images/hLogo.png" alt="Whales Tap" />}
      title="Whales Tap"
      onClick={clickHandler}
    />
  );
};
