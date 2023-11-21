import React, { Suspense, lazy } from "react";
import { useAuth } from "hooks/useAuth";

const AppLayout = lazy(
  () => import("../../components/layouts/app-layout/AppLayout")
);

const WelcomePage = lazy(() => import("../../pages/welcome-page/WelcomePage"));

const Homepage = lazy(() => import("../../pages/home-page/Homepage"));

const AppRoute: React.FC = () => {
  const { token } = useAuth();

  return (
    <>
      {token ? (
        <Suspense fallback={null}>
          <AppLayout>
            <Homepage />
          </AppLayout>
        </Suspense>
      ) : (
        <Suspense fallback={null}>
          <WelcomePage />
        </Suspense>
      )}
    </>
  );
};

export default AppRoute;
