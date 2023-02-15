import React, { Suspense } from "react"
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext"
import { PrivateRoutes, PublicRoutes } from "./routes"
import Error404 from "pages/Error404"
import AppLoader from "components/Loader/AppLoader"
import { useIsLoggedIn } from "hooks/state"
import PublicLayout from "layout/publicLayout"
import PrivateLayout from "layout/privateLayout"

const Router = () => {
  const isLoggedIn = useIsLoggedIn()
  return (
    <AuthContext.Provider value={isLoggedIn}>
      <Suspense fallback={AppLoader} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/u/dashboard" replace />} />
          {/* All the public routes */}
          {PublicRoutes.map(({ component: Component, ...route }) => (
            <Route key={`Route-${route.path}`} element={<PublicLayout />}>
              <Route
                path={route.path}
                element={
                  isLoggedIn === true ? (
                    <Navigate to="/u/dashboard" replace={true} />
                  ) : (
                    <Component />
                  )
                }
              />
            </Route>
          ))}

          {/* All the private routes */}
          {PrivateRoutes.map(({ component: Component, ...route }) => (
            <Route key={`Route-${route.path}`} element={<PrivateLayout />}>
              <Route
                path={route.path}
                element={
                  isLoggedIn !== true ? <Navigate to="/auth/login" replace={true} /> : <Component />
                }
              />
            </Route>
          ))}

          {/* 404 page route */}
          <Route exact path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default Router
