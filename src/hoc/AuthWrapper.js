import React from "react";
import { useIsLoggedIn } from "hooks/useAuth";
import { Navigate } from "react-router-dom";
import PrivateLayout from "Layouts/PrivateLayout";


/**
 * 
 * @param {*} param0 
 * @returns 
 */


const AuthWrapper = ({ component: Component, userDetail, ...rest }) => {
  const { isLoggedIn } = useIsLoggedIn();
  const Wrapper = (props) => {
    if (rest.path === "/" && !isLoggedIn) {
      return <Navigate to="/login" />;
    }
    if (isLoggedIn) {
      return (
        <PrivateLayout {...props}>
          <Component {...props} />
        </PrivateLayout>
      );
    } else {
      return <Navigate to={{ pathname: "/login" }} />;
    }
  };
  return <Wrapper />;
};

export default AuthWrapper;
