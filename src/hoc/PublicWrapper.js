import React from "react";
import PublicLayout from "Layouts/PublicLayout";
import { useIsLoggedIn } from "hooks/useAuth";
import { Navigate } from "react-router-dom";

const PublicWrapper = ({ component: Component }) => {
  const { isLoggedIn } = useIsLoggedIn();
  const Wrapper = (props) => {
    if (isLoggedIn) {
      return <Navigate to="/bigScheduler/dashboard" />;
    }
    return (
      <>
        <PublicLayout {...props}>
          <Component {...props} />
        </PublicLayout>
      </>
    );
  };
  return <Wrapper />;
};

export default PublicWrapper;
