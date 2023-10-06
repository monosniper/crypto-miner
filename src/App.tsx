import { useEffect } from "react";
import { useAppSelector } from "./redux/store";
import { main } from "./redux/slices/main";
import { useRouter } from "@/hooks";
import { PageLayout } from "./components/layouts";

const App = () => {
  const { theme } = useAppSelector(main);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <PageLayout>{useRouter()}</PageLayout>
    </div>
  );
};

export default App;
