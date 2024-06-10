import { main } from "@/redux/slices/mainSlice";
import { useAppSelector } from "@/redux/store";
import { Link } from "react-router-dom";

export const Logo = () => {
  const { theme } = useAppSelector(main);

  return (
    <Link className="w-[160px] h-auto" to="/">
      {theme === "light" ? (
        <img src="/images/logos/hogyx_logo_black.png" alt="Hogyx" />
      ) : (
        <img src="/images/logos/Hogyx_logo_white.png" alt="Hogyx" />
      )}
    </Link>
  );
};
