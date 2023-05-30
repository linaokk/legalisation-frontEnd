import { FunctionComponent, useEffect, useLayoutEffect } from "react";
import { useAuthentication } from "../../hooks/authentication.hook";
import { initAxios } from "../../services/axios.service";

interface InitializerComponentProps {
  children: JSX.Element;
}

export const InitializerComponent: FunctionComponent<
  InitializerComponentProps
> = ({ children }) => {
  initAxios();

  const { token, fetchUser, clearToken } = useAuthentication();

  useLayoutEffect(() => {});

  useEffect(() => {
    if (token)
      fetchUser().catch((err) => {
        console.info("je dois supprimer le token ");
        clearToken();
      });

    // eslint-disable-next-line
  }, [token]);

  return <>{children}</>;
};
