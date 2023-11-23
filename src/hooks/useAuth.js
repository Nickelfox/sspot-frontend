import { useSelector } from "react-redux";

export const useIsLoggedIn = () => {
  const isLoggedIn = useSelector((state) => state.app.isLogged);
  const isUser = useSelector((state) => state.app.user);
  return { isLoggedIn, isUser };
};
