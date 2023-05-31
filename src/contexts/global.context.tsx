import { createContext, FunctionComponent, useState } from "react";
import { GlobalContextState, Lang, LogginUser } from "./global.state";

interface GlobalContextProviderProps {
  children: JSX.Element;
}

export const GlobalContext = createContext<GlobalContextState | undefined>(
  undefined
);

export const GlobalContextProvider: FunctionComponent<
  GlobalContextProviderProps
> = ({ children }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUser] = useState<LogginUser>();
  const [token, setToken] = useState<string>(localStorage.token);
  const [lang, setLang] = useState<Lang>(localStorage.lang || Lang.ENGLISH);

  return (
    <GlobalContext.Provider
      value={{
        auth: {
          roles: roles,
          token: token,
          user: user,

          setRoles: (_: string[]) => setRoles(_),
          setUser: (_: LogginUser) => setUser(_),
          setToken: (_: string) => {
            localStorage.setItem("token", _);
            setToken(_);
          },
          clearToken: () => {
            setToken(localStorage.null);
            delete localStorage.token;
          },
        },
        intl: {
          lang: lang,
          setLang: (_: Lang) => {
            setLang(_);
            localStorage.setItem("lang", _);
          },
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
