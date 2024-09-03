import { user } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { userData, isAuth } = useAppSelector(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.isVerificated) return;

    if (userData && userData.isVerificated) {
      navigate("/email-confirmation");
    }
  }, [isAuth, navigate, userData]);
};
