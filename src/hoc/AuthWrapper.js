import React from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "hooks";
import PrivateLayout from "../layout/privateLayout";

const AuthWrapper = ({ component: Component }) => {
  const isLoggedIn = useIsLoggedIn();
  const Wrapper = (props) => {
    return (
      <>
        {isLoggedIn === true ? (
          <PrivateLayout {...props}>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Navigate
            to={{
              pathname: "/auth/login",
              state: { from: props.location }
            }}
            replace
          />
        )}
      </>
    );
  };

  return <Wrapper />;
};

export default AuthWrapper;
