import { Suspense } from "react";
import { lazily } from "react-lazily";
import { Routes, Route, Navigate } from "react-router-dom";

const { MainPage, WalletPage } = lazily(() => import("@/pages"));

export const useRouter = () => {
  return (
    <Routes>
      <Route
        path="/main"
        element={
          <Suspense>
            <MainPage />
          </Suspense>
        }
      />

      <Route
        path="/wallet"
        element={
          <Suspense>
            <WalletPage />
          </Suspense>
        }
      />

      <Route
        index
        element={
          <Suspense>
            <Navigate to="/main" />
          </Suspense>
        }
      />

      <Route
        path="/*"
        element={
          <Suspense>
            <Navigate to="/main" />
          </Suspense>
        }
      />
    </Routes>
  );
};
