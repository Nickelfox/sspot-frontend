import React from "react";
import { Navigate } from "react-router-dom";
import PublicLayout from "../layout/publicLayout";
import { useIsLoggedIn } from "hooks";

const PublicWrapper = ({ component: Component }) => {
  const isLoggedIn = useIsLoggedIn();

  const Wrapper = (props) => {
    return (
      <>
        {isLoggedIn !== true ? (
          <PublicLayout {...props}>
            <Component {...props} />
          </PublicLayout>
        ) : (
          <Navigate
            to={{
              pathname: "/u/dashboard",
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

export default PublicWrapper;
