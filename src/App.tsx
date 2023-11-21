import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { main } from "./redux/slices/mainSlice";
import { useRouter } from "@/hooks";
import { PageLayout } from "./components/layouts";
import { setUserData, user } from "./redux/slices/userSlice";
import { useGetMeQuery } from "./redux/api/userApi";
import CryptoJS from "crypto-js";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { theme } = useAppSelector(main);
  const { isAuth, userData } = useAppSelector(user);
  const mainUserData = JSON.parse(localStorage.getItem("mainUserData") || "{}");

  const bytesPassword =
    CryptoJS.AES.decrypt(
      mainUserData.password || "",
      import.meta.env.VITE_CRYPT_KEY,
    ) || undefined;
  const password = bytesPassword.toString(CryptoJS.enc.Utf8) || undefined;

  const { data, error } = useGetMeQuery(
    {
      email: mainUserData.email,
      password: password || mainUserData.password,
    },
    {
      skip: Boolean(userData) || !isAuth,
    },
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!data) return;

    dispatch(setUserData(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (!error) return;

    localStorage.removeItem("mainUserData");
  }, [dispatch, error]);

  return (
    <div>
      <PageLayout>{useRouter(isAuth)}</PageLayout>

      <ToastContainer />
    </div>
  );
};

export default App;
