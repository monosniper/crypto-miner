import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { main } from "./redux/slices/mainSlice";
import { useRouter } from "@/hooks";
import { PageLayout } from "./components/layouts";
import { setUserData, user } from "./redux/slices/userSlice";
import { useGetMeQuery, useLazyGetMeQuery } from "./redux/api/userApi";
import CryptoJS from "crypto-js";
import { ToastContainer, toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import socket from "@/core/socket";
import Cookies from "js-cookie";
import { SuccessModal } from "./components";
import { setOpenModal } from "./redux/slices/modalsOpensSlice";
import { setText, setTitle } from "./redux/slices/successModal";
import { NamesModals } from "./types";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const App = () => {
  const { theme } = useAppSelector(main);
  const { isAuth, userData } = useAppSelector(user);
  const mainUserData = JSON.parse(localStorage.getItem("mainUserData") || "{}");
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get("success");
  const type = urlParams.get("type");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

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

      if (type === "verificated") {
        dispatch(
          setOpenModal({
            stateNameModal: NamesModals.isOpenSuccessModal,
            isOpen: true,
          }),
        );

        dispatch(setTitle(t("success")));
        dispatch(setText(t("the mail was verified successfully")));
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

  const [getMe, { data: getMeData }] = useLazyGetMeQuery();

  useEffect(() => {
    if (location.pathname === "/mining") {
      getMe({
        email: mainUserData.email,
        password: password || mainUserData.password,
      });
    }
  }, [getMe, location, mainUserData.email, mainUserData.password, password]);

  useEffect(() => {
    if (!getMeData) return;

    const { data: user } = getMeData;

    dispatch(setUserData(user));
  }, [getMeData, dispatch]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!data) return;

    const { data: user } = data;

    dispatch(setUserData(user));

    if (!user.isVerificated) {
      toast.warning(t("verify your email") + ": " + user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Tooltip id="mining-server" />

      <SuccessModal />
    </div>
  );
};

export default App;
