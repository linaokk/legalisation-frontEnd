import { FunctionComponent, useEffect } from "react";
import { useAuthentication } from "../../hooks/authentication.hook";
import { initAxios } from "../../services/axios.service";

interface InitializerComponentProps {
  children: JSX.Element;
}

export const InitializerComponent: FunctionComponent<
  InitializerComponentProps
> = ({ children }) => {
  initAxios();

  const { token, fetchUser } = useAuthentication();

  useEffect(() => {
    if (token) fetchUser();

    // eslint-disable-next-line
  }, [token]);

  return <>{children}</>;
};
