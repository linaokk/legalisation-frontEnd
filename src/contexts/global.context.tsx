import { createContext, FunctionComponent, useState } from "react";
import { GlobalContextState, LogginUser } from "./global.state";

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

  return (
    <GlobalContext.Provider
      value={{
        auth: {
          roles: roles,
          token: token,
          user: user,

          setRoles: (_: string[]) => setRoles(_),
          setUser: (_: LogginUser) => setUser(_),
          setToken: (_: string) => setToken(_),
          clearToken: () => {
            setToken(localStorage.null);
            delete localStorage.token;
          },
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
