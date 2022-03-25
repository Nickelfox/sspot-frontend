import React, { Suspense } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { PrivateRoutes, PublicRoutes } from "./routes";
import Error404 from "pages/Error404";
import AppLoader from "components/Loader/AppLoader";
import PublicWrapper from "../hoc/PublicWrapper";
import AuthWrapper from "../hoc/AuthWrapper";
import { useIsLoggedIn } from "hooks";
import {} from "react-router-dom";

const Router = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <Suspense fallback={AppLoader} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/u/dashboard" replace />} />
          {/* All the public routes */}
          {PublicRoutes.map((route) => (
            <Route
              path={route.path}
              key={`Route-${route.path}`}
              element={<PublicWrapper {...route} />}
            />
          ))}

          {/* All the private routes */}
          {PrivateRoutes.map((route) => (
            <Route
              path={route.path}
              key={`Route-${route.path}`}
              element={<AuthWrapper {...route} />}
            />
          ))}

          {/* 404 page route */}
          <Route exact path="*" component={Error404} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default Router;
