export interface LogginUser {
  login: string;
  authorities: { authority: string }[];
}

export interface GlobalContextState {
  auth: {
    user?: LogginUser;
    roles: string[];
    token: string;

    setUser: (_: LogginUser) => void;
    setRoles: (_: string[]) => void;
    setToken: (_: string) => void;
    clearToken: () => void;
  };
  intl: {
    setLang: (_: Lang) => void;
    lang: Lang;
  };
}

export enum Lang {
  FRENCH = "fr",
  ENGLISH = "en",
}
