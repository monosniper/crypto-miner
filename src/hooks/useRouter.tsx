import { Suspense } from "react";
import { lazily } from "react-lazily";
import { Routes, Route, Navigate } from "react-router-dom";

const {
  MainPage,
  WalletPage,
  MiningPage,
  SignInPage,
  WithdrawalPage,
  NftPage,
  ServerPage,
  WorkingServersPage,
  PartnershipPage,
} = lazily(() => import("@/pages"));

export const useRouter = (isAuth: boolean) => {
  return (
    <>
      {isAuth ? (
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
            path="/wallet/withdrawal"
            element={
              <Suspense>
                <WithdrawalPage />
              </Suspense>
            }
          />

          <Route
            path="/working-servers"
            element={
              <Suspense>
                <WorkingServersPage />
              </Suspense>
            }
          />

          <Route
            path="/mining"
            element={
              <Suspense>
                <MiningPage />
              </Suspense>
            }
          />

          <Route
            path="/server/:id"
            element={
              <Suspense>
                <ServerPage />
              </Suspense>
            }
          />

          {/* <Route
            path="/trading"
            element={
              <Suspense>
                <TradingPage />
              </Suspense>
            }
          /> */}

          <Route
            path="/nft-wallet"
            element={
              <Suspense>
                <NftPage />
              </Suspense>
            }
          />

          <Route
            path="/partnership"
            element={
              <Suspense>
                <PartnershipPage />
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
      ) : (
        <Routes>
          <Route path="/auth/signin" element={<SignInPage />} />

          <Route
            index
            element={
              <Suspense>
                <Navigate to="/auth/signin" />
              </Suspense>
            }
          />

          <Route
            path="/*"
            element={
              <Suspense>
                <Navigate to="/auth/signin" />
              </Suspense>
            }
          />
        </Routes>
      )}
    </>
  );
};
