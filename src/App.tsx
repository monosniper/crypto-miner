import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { main } from "./redux/slices/mainSlice";
import { useRouter } from "@/hooks";
import { PageLayout } from "./components/layouts";
import { setUserData, user } from "./redux/slices/userSlice";
import { useGetMeDataQuery } from "./redux/api/userApi";
import { ToastContainer, toast } from "react-toastify";
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
        })
      );

      dispatch(setTitle(t("attention") + "!"));
      dispatch(
        setText(
          t(
            "you already have this server, the maximum number of servers of this type is 1"
          )
        )
      );

      return;
    }

    if (success && type) {
      if (type === "balance") {
        dispatch(
          setOpenModal({
            stateNameModal: NamesModals.isOpenSuccessModal,
            isOpen: true,
          })
        );

        dispatch(setTitle(t("success")));
        dispatch(setText(t("your balance will be updated within an hour")));
      }

      if (type === "server") {
        dispatch(
          setOpenModal({
            stateNameModal: NamesModals.isOpenSuccessModal,
            isOpen: true,
          })
        );

        dispatch(setTitle(t("success")));
        dispatch(setText(t("your server list will be updated within an hour")));
      }

      if (type === "verificated") {
        dispatch(
          setOpenModal({
            stateNameModal: NamesModals.isOpenSuccessModal,
            isOpen: true,
          })
        );

        dispatch(setTitle(t("success")));
        dispatch(setText(t("the mail was verified successfully")));
      }
    }
  }, [dispatch, success, t, type]);

  const { data, isError } = useGetMeDataQuery(null, {
    skip: Boolean(userData) || !isAuth,
  });

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

    if (!user.session && !localStorage.getItem("isOverSession")) {
      dispatch(
        setOpenModal({
          stateNameModal: NamesModals.isOpenSuccessModal,
          isOpen: true,
        })
      );

      dispatch(setTitle(t("the session is over")));
      dispatch(setText(t("you can view the report on the server page")));
      localStorage.setItem("isOverSession", "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch]);

  useEffect(() => {
    if (!isError) return;

    localStorage.removeItem("mainUserData");
    Cookies.remove("token");
  }, [dispatch, isError]);

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
