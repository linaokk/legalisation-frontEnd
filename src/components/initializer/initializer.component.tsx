import { FunctionComponent, useEffect, useLayoutEffect } from "react";
import { useAuthentication } from "../../hooks/authentication.hook";
import { initAxios } from "../../services/axios.service";
import { IntlProvider } from "react-intl";
import { useLang } from "../../hooks/lang.hook";

interface InitializerComponentProps {
  children: JSX.Element;
}

export const InitializerComponent: FunctionComponent<
  InitializerComponentProps
> = ({ children }) => {
  initAxios();
  const { token, fetchUser, clearToken, user } = useAuthentication();
  const { lang, messages } = useLang();

  useLayoutEffect(() => {});

  useEffect(() => {
    if (token && !user)
      fetchUser().catch((err) => {
        clearToken();
      });

    // eslint-disable-next-line
  }, [token]);

  return (
    <IntlProvider locale={lang} messages={messages}>
      {children}
    </IntlProvider>
  );
};
