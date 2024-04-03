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
  ServerPackagesPage,
  PartnershipPage,
  ReplenishmentPage,
  ConverterPage,
  TransferPage,
  RefPage,
  PrivacyPolicyPage,
  UserServersPage,
  PasswordRecoveryPage,
  NewPasswordPage,
  PaymentPage,
  PaymentFinishPage,
  ProfilePage,
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
            path="/wallet/payment"
            element={
              <Suspense>
                <PaymentPage />
              </Suspense>
            }
          />

          <Route
            path="/wallet/payment/finish/:type"
            element={
              <Suspense>
                <PaymentFinishPage />
              </Suspense>
            }
          />

          <Route
            path="/profile"
            element={
              <Suspense>
                <ProfilePage />
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
            path="/wallet/replenishment"
            element={
              <Suspense>
                <ReplenishmentPage />
              </Suspense>
            }
          />

          <Route
            path="/server-packages"
            element={
              <Suspense>
                <ServerPackagesPage />
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
            path="/converter"
            element={
              <Suspense>
                <ConverterPage />
              </Suspense>
            }
          />

          <Route
            path="/ref"
            element={
              <Suspense>
                <RefPage />
              </Suspense>
            }
          />

          <Route
            path="/transfer"
            element={
              <Suspense>
                <TransferPage />
              </Suspense>
            }
          />

          <Route
            path="/privacy-policy"
            element={
              <Suspense>
                <PrivacyPolicyPage />
              </Suspense>
            }
          />

          <Route
            path="/user-servers"
            element={
              <Suspense>
                <UserServersPage />
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
          <Route
            path="/auth/signin"
            element={
              <Suspense>
                <SignInPage />
              </Suspense>
            }
          />

          <Route
            path="/auth/password-recovery"
            element={
              <Suspense>
                <PasswordRecoveryPage />
              </Suspense>
            }
          />

          <Route
            path="/auth/new-password"
            element={
              <Suspense>
                <NewPasswordPage />
              </Suspense>
            }
          />

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
