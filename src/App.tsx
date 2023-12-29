import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { main } from "./redux/slices/mainSlice";
import { useRouter } from "@/hooks";
import { PageLayout } from "./components/layouts";
import { setUserData, user } from "./redux/slices/userSlice";
import { useGetMeQuery } from "./redux/api/userApi";
import CryptoJS from "crypto-js";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
import socket from "@/core/socket";
import Cookies from "js-cookie";
import { SuccessModal } from "./components";
import { setOpenModal } from "./redux/slices/modalsOpensSlice";
import { setText, setTitle } from "./redux/slices/successModal";
import { NamesModals } from "./types";
import { useTranslation } from "react-i18next";

const App = () => {
  const { theme } = useAppSelector(main);
  const { isAuth, userData } = useAppSelector(user);
  const mainUserData = JSON.parse(localStorage.getItem("mainUserData") || "{}");
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success");
  const type = urlParams.get("type");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (type === "server_exists") {
      dispatch(
        setOpenModal({
          stateNameModal: NamesModals.isOpenSuccessModal,
          isOpen: true,
        }),
      );

      dispatch(setTitle(t("attention") + "!"));
      dispatch(
        setText(
          t(
            "you already have this server, the maximum number of servers of this type is 1",
          ),
        ),
      );

      return;
    }

    if (success && type) {
      if (type === "balance") {
        dispatch(
          setOpenModal({
            stateNameModal: NamesModals.isOpenSuccessModal,
            isOpen: true,
          }),
        );

        dispatch(setTitle(t("success")));
        dispatch(setText(t("your balance will be updated within an hour")));
      }

      if (type === "server") {
        dispatch(
          setOpenModal({
            stateNameModal: NamesModals.isOpenSuccessModal,
            isOpen: true,
          }),
        );

        dispatch(setTitle(t("success")));
        dispatch(setText(t("your server list will be updated within an hour")));
      }
    }
  }, [dispatch, success, t, type]);

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

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!data) return;

    const { data: user } = data;

    dispatch(setUserData(user));
  }, [data, dispatch]);

  useEffect(() => {
    if (!error) return;

    localStorage.removeItem("mainUserData");
    Cookies.remove("token");
  }, [dispatch, error]);

  useEffect(() => {
    socket?.addEventListener("open", () => {
      console.log("socket connected");
    });
  }, []);

  return (
    <div className="relative">
      <PageLayout>{useRouter(isAuth)}</PageLayout>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "light" ? "light" : "dark"}
      />

      <Tooltip id="light" />

      <SuccessModal />
    </div>
  );
};

export default App;
