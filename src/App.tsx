import { useEffect } from "react";
import { useAppSelector } from "./redux/store";
import { main } from "./redux/slices/mainSlice";
import { useRouter } from "@/hooks";
import { PageLayout } from "./components/layouts";
import { user } from "./redux/slices/userSlice";

const App = () => {
  const { theme } = useAppSelector(main);
  const { isAuth } = useAppSelector(user);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <PageLayout>{useRouter(isAuth)}</PageLayout>
    </div>
  );
};

export default App;
