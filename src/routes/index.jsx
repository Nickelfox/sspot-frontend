import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes/privateRoutes";
import { PublicRoutes } from "./publicRoutes/publicRoutes";
import { useIsLoggedIn } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import PublicWrapper from "../hoc/PublicWrapper";
import AuthWrapper from "../hoc/AuthWrapper";
import { AuthContext } from "../auth/AuthContext";
const Router = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isUser } = useIsLoggedIn();
  return (
    <AuthContext.Provider value={isLoggedIn}>
      {/* <Suspense fallback={AppLoader} /> */}
      <BrowserRouter>
        {/* {isLoggedIn && <IdleTimeout />} */}
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/bigScheduler/login" replace />}
          />

          {/* All the public routes */}
          {PublicRoutes.map((route) => (
            <Route
              path={route.path}
              key={`Route-${route.path}`}
              element={<PublicWrapper {...route} />}
            />
          ))}

          {/* All the private routes */}

          {PrivateRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                key={`Route-${route.path}`}
                element={<AuthWrapper {...route} userDetail={isUser} />}
              />
            );
          })}

          {/* 404 page route */}
          <Route
            exact
            path="*"
            element={<Navigate to="/bigscheduler/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};
export default Router;
